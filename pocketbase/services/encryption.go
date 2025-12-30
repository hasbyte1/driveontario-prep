package services

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/base64"
	"encoding/hex"
	"errors"
	"io"
	"os"
)

var (
	ErrInvalidKey       = errors.New("invalid encryption key: must be 32 bytes (64 hex chars)")
	ErrInvalidCiphertext = errors.New("invalid ciphertext")
	ErrEncryptionDisabled = errors.New("encryption is disabled (no key configured)")
)

// QuestionEncryption handles encryption/decryption of question data
type QuestionEncryption struct {
	key     []byte
	enabled bool
}

// NewQuestionEncryption creates a new encryption service
// Uses QUESTION_ENCRYPTION_KEY environment variable (32 bytes as hex string)
func NewQuestionEncryption() (*QuestionEncryption, error) {
	keyHex := os.Getenv("QUESTION_ENCRYPTION_KEY")
	if keyHex == "" {
		// Encryption disabled - return service in passthrough mode
		return &QuestionEncryption{enabled: false}, nil
	}

	key, err := hex.DecodeString(keyHex)
	if err != nil {
		return nil, ErrInvalidKey
	}

	if len(key) != 32 {
		return nil, ErrInvalidKey
	}

	return &QuestionEncryption{
		key:     key,
		enabled: true,
	}, nil
}

// IsEnabled returns whether encryption is enabled
func (e *QuestionEncryption) IsEnabled() bool {
	return e.enabled
}

// Encrypt encrypts plaintext using AES-256-GCM
// Returns base64-encoded ciphertext (nonce prepended)
func (e *QuestionEncryption) Encrypt(plaintext string) (string, error) {
	if !e.enabled {
		// Passthrough mode - just base64 encode (for development)
		return base64.StdEncoding.EncodeToString([]byte(plaintext)), nil
	}

	block, err := aes.NewCipher(e.key)
	if err != nil {
		return "", err
	}

	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return "", err
	}

	nonce := make([]byte, gcm.NonceSize())
	if _, err := io.ReadFull(rand.Reader, nonce); err != nil {
		return "", err
	}

	ciphertext := gcm.Seal(nonce, nonce, []byte(plaintext), nil)
	return base64.StdEncoding.EncodeToString(ciphertext), nil
}

// Decrypt decrypts base64-encoded ciphertext using AES-256-GCM
func (e *QuestionEncryption) Decrypt(encodedCiphertext string) (string, error) {
	if !e.enabled {
		// Passthrough mode - just base64 decode
		plaintext, err := base64.StdEncoding.DecodeString(encodedCiphertext)
		if err != nil {
			return "", err
		}
		return string(plaintext), nil
	}

	ciphertext, err := base64.StdEncoding.DecodeString(encodedCiphertext)
	if err != nil {
		return "", err
	}

	block, err := aes.NewCipher(e.key)
	if err != nil {
		return "", err
	}

	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return "", err
	}

	nonceSize := gcm.NonceSize()
	if len(ciphertext) < nonceSize {
		return "", ErrInvalidCiphertext
	}

	nonce, ciphertext := ciphertext[:nonceSize], ciphertext[nonceSize:]
	plaintext, err := gcm.Open(nil, nonce, ciphertext, nil)
	if err != nil {
		return "", err
	}

	return string(plaintext), nil
}

// GenerateKey generates a new random 32-byte key as hex string
// This is a utility function for generating new keys
func GenerateKey() (string, error) {
	key := make([]byte, 32)
	if _, err := io.ReadFull(rand.Reader, key); err != nil {
		return "", err
	}
	return hex.EncodeToString(key), nil
}
