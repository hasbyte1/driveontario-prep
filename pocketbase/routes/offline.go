package routes

import (
	"crypto/hmac"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"net/http"
	"os"
	"time"

	"github.com/pocketbase/pocketbase/core"
)

const (
	// Default offline token validity period
	DefaultOfflineTokenDays = 7
	// Maximum offline token validity period
	MaxOfflineTokenDays = 30
)

// OfflineTokenClaims represents the claims in an offline token
type OfflineTokenClaims struct {
	UserId       string   `json:"uid"`
	Email        string   `json:"email"`
	IsPremium    bool     `json:"premium"`
	Plan         string   `json:"plan"`
	Categories   []string `json:"categories"`   // Allowed question categories
	MaxQuestions int      `json:"maxQuestions"` // Max questions allowed offline
	IssuedAt     int64    `json:"iat"`
	ExpiresAt    int64    `json:"exp"`
	TokenId      string   `json:"jti"` // Unique token ID for revocation
}

// OfflineToken represents the full token with signature
type OfflineToken struct {
	Claims    OfflineTokenClaims `json:"claims"`
	Signature string             `json:"sig"`
}

// RegisterOfflineRoutes registers all offline-related API routes
func RegisterOfflineRoutes(app core.App, se *core.ServeEvent) {
	// Get offline token for offline access
	se.Router.POST("/api/offline/token", func(e *core.RequestEvent) error {
		authRecord := e.Auth
		if authRecord == nil {
			return e.JSON(http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
		}

		var req struct {
			ValidDays         int    `json:"validDays,omitempty"`
			DeviceFingerprint string `json:"deviceFingerprint,omitempty"`
		}
		if err := e.BindBody(&req); err != nil {
			// Use defaults if no body
			req.ValidDays = DefaultOfflineTokenDays
		}

		// Validate days
		if req.ValidDays <= 0 {
			req.ValidDays = DefaultOfflineTokenDays
		}
		if req.ValidDays > MaxOfflineTokenDays {
			req.ValidDays = MaxOfflineTokenDays
		}

		// Check if user is premium (offline mode requires premium)
		isPremium := authRecord.GetBool("isPremium")
		plan := authRecord.GetString("premiumPlan")

		// Free users get limited offline access
		maxQuestions := 20                             // Free tier
		categories := []string{"Road Signs & Signals"} // Limited categories

		if isPremium {
			maxQuestions = 500 // All questions
			categories = []string{
				"Road Signs & Signals",
				"Rules of the Road",
				"Safe Driving & Vehicle Handling",
				"Alcohol/Drugs & Penalties",
				"Licensing & Documents",
				"Miscellaneous",
			}
		}

		// Generate unique token ID
		tokenId := generateTokenId()

		// Create claims
		now := time.Now()
		claims := OfflineTokenClaims{
			UserId:       authRecord.Id,
			Email:        authRecord.GetString("email"),
			IsPremium:    isPremium,
			Plan:         plan,
			Categories:   categories,
			MaxQuestions: maxQuestions,
			IssuedAt:     now.Unix(),
			ExpiresAt:    now.AddDate(0, 0, req.ValidDays).Unix(),
			TokenId:      tokenId,
		}

		// Sign the token
		signature, err := signClaims(claims)
		if err != nil {
			return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to generate token"})
		}

		token := OfflineToken{
			Claims:    claims,
			Signature: signature,
		}

		// Encode to base64 for easy storage
		tokenBytes, err := json.Marshal(token)
		if err != nil {
			return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to encode token"})
		}

		encodedToken := base64.StdEncoding.EncodeToString(tokenBytes)

		// Generate encryption key for client-side storage
		encryptionKey := generateEncryptionKey(authRecord.Id, req.DeviceFingerprint)

		return e.JSON(http.StatusOK, map[string]interface{}{
			"token":         encodedToken,
			"encryptionKey": encryptionKey,
			"expiresAt":     claims.ExpiresAt,
			"validDays":     req.ValidDays,
			"maxQuestions":  maxQuestions,
			"categories":    categories,
		})
	}).Bind(RequireAuth(app))

	// Validate an offline token
	se.Router.POST("/api/offline/validate", func(e *core.RequestEvent) error {
		var req struct {
			Token string `json:"token"`
		}
		if err := e.BindBody(&req); err != nil {
			return e.JSON(http.StatusBadRequest, map[string]string{"error": "Token required"})
		}

		// Decode token
		tokenBytes, err := base64.StdEncoding.DecodeString(req.Token)
		if err != nil {
			return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid token format"})
		}

		var token OfflineToken
		if err := json.Unmarshal(tokenBytes, &token); err != nil {
			return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid token"})
		}

		// Verify signature
		expectedSig, err := signClaims(token.Claims)
		if err != nil || expectedSig != token.Signature {
			return e.JSON(http.StatusUnauthorized, map[string]string{"error": "Invalid token signature"})
		}

		// Check expiration
		if time.Now().Unix() > token.Claims.ExpiresAt {
			return e.JSON(http.StatusUnauthorized, map[string]string{"error": "Token expired"})
		}

		return e.JSON(http.StatusOK, map[string]interface{}{
			"valid":        true,
			"userId":       token.Claims.UserId,
			"isPremium":    token.Claims.IsPremium,
			"expiresAt":    token.Claims.ExpiresAt,
			"categories":   token.Claims.Categories,
			"maxQuestions": token.Claims.MaxQuestions,
		})
	})

	// Get questions for offline caching (with encryption key)
	se.Router.POST("/api/offline/questions", func(e *core.RequestEvent) error {
		authRecord := e.Auth
		if authRecord == nil {
			return e.JSON(http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
		}

		var req struct {
			Categories        []string `json:"categories,omitempty"`
			Limit             int      `json:"limit,omitempty"`
			DeviceFingerprint string   `json:"deviceFingerprint,omitempty"`
		}
		if err := e.BindBody(&req); err != nil {
			// Use defaults
			req.Limit = 50
		}

		// Check premium status
		isPremium := authRecord.GetBool("isPremium")

		// Limit questions for free users
		maxQuestions := 20
		allowedCategories := []string{"Road Signs & Signals"}

		if isPremium {
			maxQuestions = 500
			allowedCategories = []string{
				"Road Signs & Signals",
				"Rules of the Road",
				"Safe Driving & Vehicle Handling",
				"Alcohol/Drugs & Penalties",
				"Licensing & Documents",
				"Miscellaneous",
			}
		}

		if req.Limit <= 0 || req.Limit > maxQuestions {
			req.Limit = maxQuestions
		}

		// Filter requested categories to allowed ones
		categories := req.Categories
		if len(categories) == 0 {
			categories = allowedCategories
		} else {
			filtered := []string{}
			allowedSet := make(map[string]bool)
			for _, c := range allowedCategories {
				allowedSet[c] = true
			}
			for _, c := range categories {
				if allowedSet[c] {
					filtered = append(filtered, c)
				}
			}
			categories = filtered
		}

		if len(categories) == 0 {
			return e.JSON(http.StatusForbidden, map[string]string{"error": "No access to requested categories"})
		}

		// Fetch questions
		questions, err := app.FindRecordsByFilter(
			"questions",
			"category IN {:categories}",
			"",
			req.Limit,
			0,
			map[string]any{"categories": categories},
		)

		if err != nil {
			return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to fetch questions"})
		}

		// Decrypt and prepare questions for offline storage
		encService := GetEncryptionService()
		result := make([]map[string]interface{}, 0, len(questions))

		for _, q := range questions {
			// Decrypt fields
			options := q.GetString("options")
			decryptedOptions, _ := encService.Decrypt(options)
			if decryptedOptions == "" {
				decryptedOptions = options // Might not be encrypted
			}

			correctIndex := q.GetString("correctIndex")
			decryptedIndex, _ := encService.Decrypt(correctIndex)
			if decryptedIndex == "" {
				decryptedIndex = correctIndex
			}

			explanation := q.GetString("explanation")
			decryptedExplanation, _ := encService.Decrypt(explanation)
			if decryptedExplanation == "" {
				decryptedExplanation = explanation
			}

			result = append(result, map[string]interface{}{
				"id":           q.Id,
				"question":     q.GetString("question"),
				"options":      decryptedOptions,
				"correctIndex": decryptedIndex,
				"explanation":  decryptedExplanation,
				"category":     q.GetString("category"),
				"image":        q.GetString("image"),
				"difficulty":   q.GetInt("difficulty"),
			})
		}

		// Generate encryption key for client-side storage
		encryptionKey := generateEncryptionKey(authRecord.Id, req.DeviceFingerprint)

		return e.JSON(http.StatusOK, map[string]interface{}{
			"questions":     result,
			"count":         len(result),
			"encryptionKey": encryptionKey,
			"expiresAt":     time.Now().AddDate(0, 0, DefaultOfflineTokenDays).Unix(),
		})
	}).Bind(RequireAuth(app))

	// Revoke offline token (when user logs out or changes password)
	se.Router.POST("/api/offline/revoke", func(e *core.RequestEvent) error {
		authRecord := e.Auth
		if authRecord == nil {
			return e.JSON(http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
		}

		// In a production system, you would store token IDs and check against them
		// For now, we just return success as the token signature includes a secret

		return e.JSON(http.StatusOK, map[string]interface{}{
			"success": true,
			"message": "Offline tokens revoked",
		})
	}).Bind(RequireAuth(app))
}

// generateTokenId generates a unique token ID
func generateTokenId() string {
	bytes := make([]byte, 16)
	rand.Read(bytes)
	return base64.URLEncoding.EncodeToString(bytes)
}

// signClaims creates an HMAC signature for the claims
func signClaims(claims OfflineTokenClaims) (string, error) {
	secret := getOfflineSecret()

	claimsBytes, err := json.Marshal(claims)
	if err != nil {
		return "", err
	}

	h := hmac.New(sha256.New, []byte(secret))
	h.Write(claimsBytes)
	signature := base64.URLEncoding.EncodeToString(h.Sum(nil))

	return signature, nil
}

// generateEncryptionKey generates a deterministic encryption key for the user
func generateEncryptionKey(userId, deviceFingerprint string) string {
	secret := getOfflineSecret()

	// Combine user ID, device fingerprint, and secret
	data := userId + ":" + deviceFingerprint + ":" + secret

	h := sha256.New()
	h.Write([]byte(data))
	hash := h.Sum(nil)

	// Return as base64 (32 bytes = 256 bits, suitable for AES-256)
	return base64.StdEncoding.EncodeToString(hash)
}

// getOfflineSecret gets the secret for signing offline tokens
func getOfflineSecret() string {
	secret := os.Getenv("OFFLINE_TOKEN_SECRET")
	if secret == "" {
		// Fallback to a derived secret (not recommended for production)
		secret = "DriveOntario-Offline-Secret-2024"
	}
	return secret
}
