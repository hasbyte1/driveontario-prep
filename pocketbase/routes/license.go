package routes

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/pocketbase/pocketbase/core"
)

const (
	// License key format: DPREP-XXXXX-XXXXX-XXXXX-CHECK
	LicensePrefix    = "DPREP"
	SegmentLength    = 5
	SegmentCount     = 3
	ChecksumLength   = 5
	LicenseKeyLength = len(LicensePrefix) + 1 + (SegmentLength+1)*SegmentCount + ChecksumLength
)

// Characters used in license keys (excluding confusing chars like 0/O, 1/I/L)
const licenseChars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"

// LicenseType constants
const (
	LicenseTypeLifetime   = "lifetime"
	LicenseTypeEnterprise = "enterprise"
	LicenseTypePromo      = "promo"
	LicenseTypeGift       = "gift"
)

// Plan constants
const (
	PlanMonthly  = "monthly"
	PlanYearly   = "yearly"
	PlanLifetime = "lifetime"
)

// RegisterLicenseRoutes registers all license-related API routes
func RegisterLicenseRoutes(app core.App, se *core.ServeEvent) {
	// Redeem a license key
	se.Router.POST("/api/license/redeem", func(e *core.RequestEvent) error {
		authRecord := e.Auth
		if authRecord == nil {
			return e.JSON(http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
		}

		var req struct {
			Key               string `json:"key"`
			DeviceFingerprint string `json:"deviceFingerprint,omitempty"`
		}
		if err := e.BindBody(&req); err != nil {
			return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
		}

		// Normalize the key (uppercase, remove spaces)
		key := strings.ToUpper(strings.TrimSpace(req.Key))
		key = strings.ReplaceAll(key, " ", "")

		// Validate key format
		if !ValidateLicenseKeyFormat(key) {
			return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid license key format"})
		}

		// Verify checksum
		if !VerifyLicenseChecksum(key) {
			return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid license key"})
		}

		// Find the license
		licenses, err := app.FindRecordsByFilter(
			"licenses",
			"key = {:key}",
			"",
			1,
			0,
			map[string]any{"key": key},
		)

		if err != nil || len(licenses) == 0 {
			return e.JSON(http.StatusNotFound, map[string]string{"error": "License key not found"})
		}

		license := licenses[0]

		// Check if license is revoked
		if license.GetBool("isRevoked") {
			return e.JSON(http.StatusForbidden, map[string]string{"error": "This license has been revoked"})
		}

		// Check if already redeemed by another user
		existingUser := license.GetString("user")
		if existingUser != "" && existingUser != authRecord.Id {
			return e.JSON(http.StatusConflict, map[string]string{"error": "License already redeemed by another user"})
		}

		// Check if already redeemed by this user
		if existingUser == authRecord.Id {
			return e.JSON(http.StatusOK, map[string]interface{}{
				"success": true,
				"message": "License already activated",
				"plan":    license.GetString("plan"),
			})
		}

		// Check max activations
		activations := license.GetInt("activations")
		maxActivations := license.GetInt("maxActivations")
		if maxActivations > 0 && activations >= maxActivations {
			return e.JSON(http.StatusForbidden, map[string]string{"error": "License activation limit reached"})
		}

		// Check expiration
		expiresAt := license.GetDateTime("expiresAt")
		if !expiresAt.IsZero() && expiresAt.Time().Before(time.Now()) {
			return e.JSON(http.StatusForbidden, map[string]string{"error": "License has expired"})
		}

		// Activate the license
		license.Set("user", authRecord.Id)
		license.Set("activations", activations+1)
		license.Set("isActive", true)
		license.Set("redeemedAt", time.Now().UTC())

		if err := app.Save(license); err != nil {
			return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to activate license"})
		}

		// Log the activation
		if err := logLicenseActivation(app, license.Id, authRecord.Id, req.DeviceFingerprint, e.Request.UserAgent(), hashIP(e.RealIP())); err != nil {
			app.Logger().Error("Failed to log license activation", "error", err)
		}

		// Update user premium status
		plan := license.GetString("plan")
		licenseType := license.GetString("type")

		authRecord.Set("isPremium", true)
		authRecord.Set("premiumPlan", plan)

		// Set expiration based on license type and plan
		if licenseType == LicenseTypeLifetime || plan == PlanLifetime {
			// Lifetime licenses don't expire
			authRecord.Set("premiumExpiresAt", nil)
		} else if !expiresAt.IsZero() {
			authRecord.Set("premiumExpiresAt", expiresAt.Time())
		} else {
			// Default expiration based on plan
			var expiration time.Time
			switch plan {
			case PlanMonthly:
				expiration = time.Now().AddDate(0, 1, 0)
			case PlanYearly:
				expiration = time.Now().AddDate(1, 0, 0)
			default:
				expiration = time.Now().AddDate(0, 1, 0)
			}
			authRecord.Set("premiumExpiresAt", expiration)
		}

		if err := app.Save(authRecord); err != nil {
			return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to update user status"})
		}

		return e.JSON(http.StatusOK, map[string]interface{}{
			"success":   true,
			"message":   "License activated successfully",
			"plan":      plan,
			"type":      licenseType,
			"expiresAt": authRecord.Get("premiumExpiresAt"),
		})
	}).Bind(RequireAuth(app))

	// Validate current license status
	se.Router.GET("/api/license/validate", func(e *core.RequestEvent) error {
		authRecord := e.Auth
		if authRecord == nil {
			return e.JSON(http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
		}

		// Find user's licenses
		licenses, err := app.FindRecordsByFilter(
			"licenses",
			"user = {:userId} && isActive = true && isRevoked = false",
			"-created",
			10,
			0,
			map[string]any{"userId": authRecord.Id},
		)

		if err != nil || len(licenses) == 0 {
			return e.JSON(http.StatusOK, map[string]interface{}{
				"hasLicense": false,
				"isPremium":  authRecord.GetBool("isPremium"),
			})
		}

		// Find the best active license
		var bestLicense *core.Record
		for _, lic := range licenses {
			expiresAt := lic.GetDateTime("expiresAt")
			if expiresAt.IsZero() || expiresAt.Time().After(time.Now()) {
				if bestLicense == nil {
					bestLicense = lic
				} else {
					// Prefer lifetime over others
					if lic.GetString("type") == LicenseTypeLifetime {
						bestLicense = lic
						break
					}
				}
			}
		}

		if bestLicense == nil {
			return e.JSON(http.StatusOK, map[string]interface{}{
				"hasLicense": false,
				"isPremium":  authRecord.GetBool("isPremium"),
			})
		}

		return e.JSON(http.StatusOK, map[string]interface{}{
			"hasLicense": true,
			"isPremium":  true,
			"license": map[string]interface{}{
				"type":      bestLicense.GetString("type"),
				"plan":      bestLicense.GetString("plan"),
				"expiresAt": bestLicense.Get("expiresAt"),
				"isActive":  bestLicense.GetBool("isActive"),
			},
		})
	}).Bind(RequireAuth(app))

	// Admin: Generate new licenses
	se.Router.POST("/api/license/generate", func(e *core.RequestEvent) error {
		authRecord := e.Auth
		if authRecord == nil {
			return e.JSON(http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
		}

		// Check if user is admin (you may want to add an isAdmin field to users)
		// For now, we'll check if they have a specific email domain or role
		// In production, use proper admin authentication
		if !isAdmin(authRecord) {
			return e.JSON(http.StatusForbidden, map[string]string{"error": "Admin access required"})
		}

		var req struct {
			Type           string                 `json:"type"`
			Plan           string                 `json:"plan"`
			Count          int                    `json:"count"`
			MaxActivations int                    `json:"maxActivations"`
			ExpiresAt      string                 `json:"expiresAt,omitempty"`
			Notes          string                 `json:"notes,omitempty"`
			Metadata       map[string]interface{} `json:"metadata,omitempty"`
		}
		if err := e.BindBody(&req); err != nil {
			return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
		}

		// Validate type
		validTypes := map[string]bool{LicenseTypeLifetime: true, LicenseTypeEnterprise: true, LicenseTypePromo: true, LicenseTypeGift: true}
		if !validTypes[req.Type] {
			return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid license type"})
		}

		// Validate plan
		validPlans := map[string]bool{PlanMonthly: true, PlanYearly: true, PlanLifetime: true}
		if !validPlans[req.Plan] {
			return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid plan"})
		}

		// Validate count
		if req.Count < 1 || req.Count > 100 {
			return e.JSON(http.StatusBadRequest, map[string]string{"error": "Count must be between 1 and 100"})
		}

		// Default max activations
		if req.MaxActivations < 1 {
			req.MaxActivations = 1
		}

		// Parse expiration date
		var expiresAt *time.Time
		if req.ExpiresAt != "" {
			parsed, err := time.Parse(time.RFC3339, req.ExpiresAt)
			if err != nil {
				return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid expiration date format"})
			}
			expiresAt = &parsed
		}

		// Get licenses collection
		collection, err := app.FindCollectionByNameOrId("licenses")
		if err != nil {
			return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Licenses collection not found"})
		}

		// Generate licenses
		generatedKeys := make([]string, 0, req.Count)
		for i := 0; i < req.Count; i++ {
			key := GenerateLicenseKey()

			record := core.NewRecord(collection)
			record.Set("key", key)
			record.Set("type", req.Type)
			record.Set("plan", req.Plan)
			record.Set("maxActivations", req.MaxActivations)
			record.Set("activations", 0)
			record.Set("isActive", false)
			record.Set("isRevoked", false)
			record.Set("createdBy", authRecord.Id)
			record.Set("notes", req.Notes)

			if expiresAt != nil {
				record.Set("expiresAt", *expiresAt)
			}

			if req.Metadata != nil {
				record.Set("metadata", req.Metadata)
			}

			if err := app.Save(record); err != nil {
				app.Logger().Error("Failed to create license", "error", err)
				continue
			}

			generatedKeys = append(generatedKeys, key)
		}

		return e.JSON(http.StatusOK, map[string]interface{}{
			"success":  true,
			"count":    len(generatedKeys),
			"licenses": generatedKeys,
		})
	}).Bind(RequireAuth(app))

	// Admin: List licenses
	se.Router.GET("/api/license/list", func(e *core.RequestEvent) error {
		authRecord := e.Auth
		if authRecord == nil {
			return e.JSON(http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
		}

		if !isAdmin(authRecord) {
			return e.JSON(http.StatusForbidden, map[string]string{"error": "Admin access required"})
		}

		// Get query params
		filter := e.Request.URL.Query().Get("filter") // "all", "active", "unused", "revoked"
		licenseType := e.Request.URL.Query().Get("type")
		limitStr := e.Request.URL.Query().Get("limit")

		limit := 50
		if l := parseInt(limitStr); l > 0 && l <= 200 {
			limit = l
		}

		// Build filter
		filterQuery := "1=1"
		params := map[string]any{}

		switch filter {
		case "active":
			filterQuery += " && isActive = true && isRevoked = false"
		case "unused":
			filterQuery += " && user = '' && isRevoked = false"
		case "revoked":
			filterQuery += " && isRevoked = true"
		}

		if licenseType != "" {
			filterQuery += " && type = {:type}"
			params["type"] = licenseType
		}

		licenses, err := app.FindRecordsByFilter(
			"licenses",
			filterQuery,
			"-created",
			limit,
			0,
			params,
		)

		if err != nil {
			return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to fetch licenses"})
		}

		result := make([]map[string]interface{}, len(licenses))
		for i, lic := range licenses {
			result[i] = map[string]interface{}{
				"id":             lic.Id,
				"key":            lic.GetString("key"),
				"type":           lic.GetString("type"),
				"plan":           lic.GetString("plan"),
				"user":           lic.GetString("user"),
				"isActive":       lic.GetBool("isActive"),
				"isRevoked":      lic.GetBool("isRevoked"),
				"activations":    lic.GetInt("activations"),
				"maxActivations": lic.GetInt("maxActivations"),
				"expiresAt":      lic.Get("expiresAt"),
				"redeemedAt":     lic.Get("redeemedAt"),
				"created":        lic.GetDateTime("created").String(),
			}
		}

		return e.JSON(http.StatusOK, map[string]interface{}{
			"licenses": result,
			"count":    len(result),
		})
	}).Bind(RequireAuth(app))

	// Admin: Revoke a license
	se.Router.POST("/api/license/revoke", func(e *core.RequestEvent) error {
		authRecord := e.Auth
		if authRecord == nil {
			return e.JSON(http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
		}

		if !isAdmin(authRecord) {
			return e.JSON(http.StatusForbidden, map[string]string{"error": "Admin access required"})
		}

		var req struct {
			LicenseId string `json:"licenseId"`
			Reason    string `json:"reason,omitempty"`
		}
		if err := e.BindBody(&req); err != nil {
			return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
		}

		license, err := app.FindRecordById("licenses", req.LicenseId)
		if err != nil {
			return e.JSON(http.StatusNotFound, map[string]string{"error": "License not found"})
		}

		license.Set("isRevoked", true)
		license.Set("isActive", false)

		// Add revocation note
		notes := license.GetString("notes")
		if notes != "" {
			notes += "\n"
		}
		notes += fmt.Sprintf("[%s] Revoked by admin: %s", time.Now().Format(time.RFC3339), req.Reason)
		license.Set("notes", notes)

		if err := app.Save(license); err != nil {
			return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to revoke license"})
		}

		// If license was redeemed, update user's premium status
		userId := license.GetString("user")
		if userId != "" {
			user, err := app.FindRecordById("users", userId)
			if err == nil {
				// Check if user has other active licenses
				otherLicenses, _ := app.FindRecordsByFilter(
					"licenses",
					"user = {:userId} && isActive = true && isRevoked = false && id != {:licenseId}",
					"",
					1,
					0,
					map[string]any{"userId": userId, "licenseId": req.LicenseId},
				)

				if len(otherLicenses) == 0 {
					// No other licenses, check if they have Stripe subscription
					if user.GetString("stripeSubscriptionId") == "" {
						user.Set("isPremium", false)
						user.Set("premiumPlan", "free")
						user.Set("premiumExpiresAt", nil)
						app.Save(user)
					}
				}
			}
		}

		return e.JSON(http.StatusOK, map[string]interface{}{
			"success": true,
			"message": "License revoked successfully",
		})
	}).Bind(RequireAuth(app))
}

// GenerateLicenseKey generates a new license key with checksum
func GenerateLicenseKey() string {
	segments := make([]string, SegmentCount)
	for i := 0; i < SegmentCount; i++ {
		segments[i] = generateRandomSegment(SegmentLength)
	}

	// Build key without checksum
	keyWithoutChecksum := LicensePrefix + "-" + strings.Join(segments, "-") + "-"

	// Calculate checksum
	checksum := calculateChecksum(keyWithoutChecksum)

	return keyWithoutChecksum + checksum
}

// generateRandomSegment generates a random alphanumeric segment
func generateRandomSegment(length int) string {
	bytes := make([]byte, length)
	if _, err := rand.Read(bytes); err != nil {
		// Fallback to less secure method
		for i := range bytes {
			bytes[i] = byte(i * 7 % len(licenseChars))
		}
	}

	result := make([]byte, length)
	for i, b := range bytes {
		result[i] = licenseChars[int(b)%len(licenseChars)]
	}

	return string(result)
}

// calculateChecksum calculates a checksum for the license key
func calculateChecksum(keyWithoutChecksum string) string {
	hash := sha256.Sum256([]byte(keyWithoutChecksum + "DriveOntario2024"))
	hexHash := hex.EncodeToString(hash[:])

	// Convert to license chars
	result := make([]byte, ChecksumLength)
	for i := 0; i < ChecksumLength; i++ {
		idx := int(hexHash[i]) % len(licenseChars)
		result[i] = licenseChars[idx]
	}

	return string(result)
}

// ValidateLicenseKeyFormat checks if a key has the correct format
func ValidateLicenseKeyFormat(key string) bool {
	// Expected format: DPREP-XXXXX-XXXXX-XXXXX-XXXXX
	if len(key) != LicenseKeyLength {
		return false
	}

	if !strings.HasPrefix(key, LicensePrefix+"-") {
		return false
	}

	parts := strings.Split(key, "-")
	if len(parts) != SegmentCount+2 { // prefix + segments + checksum
		return false
	}

	// Validate each segment contains only valid chars
	for i, part := range parts {
		if i == 0 {
			if part != LicensePrefix {
				return false
			}
			continue
		}
		if len(part) != SegmentLength {
			return false
		}
		for _, c := range part {
			if !strings.ContainsRune(licenseChars, c) {
				return false
			}
		}
	}

	return true
}

// VerifyLicenseChecksum verifies the checksum of a license key
func VerifyLicenseChecksum(key string) bool {
	if len(key) < ChecksumLength+1 {
		return false
	}

	keyWithoutChecksum := key[:len(key)-ChecksumLength]
	providedChecksum := key[len(key)-ChecksumLength:]
	expectedChecksum := calculateChecksum(keyWithoutChecksum)

	return providedChecksum == expectedChecksum
}

// logLicenseActivation logs a license activation
func logLicenseActivation(app core.App, licenseId, userId, deviceFingerprint, userAgent, ipHash string) error {
	collection, err := app.FindCollectionByNameOrId("license_activations")
	if err != nil {
		return err
	}

	record := core.NewRecord(collection)
	record.Set("license", licenseId)
	record.Set("user", userId)
	record.Set("deviceFingerprint", deviceFingerprint)
	record.Set("userAgent", userAgent)
	record.Set("ipHash", ipHash)
	record.Set("isValid", true)

	return app.Save(record)
}

// hashIP creates a privacy-preserving hash of an IP address
func hashIP(ip string) string {
	hash := sha256.Sum256([]byte(ip + "DriveOntarioIPSalt"))
	return hex.EncodeToString(hash[:8]) // Only use first 8 bytes
}

// isAdmin checks if a user has admin privileges
func isAdmin(user *core.Record) bool {
	// Check for admin email domain
	email := user.GetString("email")
	if strings.HasSuffix(email, "@driveontario.com") {
		return true
	}

	// Check for isAdmin field if it exists
	if user.GetBool("isAdmin") {
		return true
	}

	return false
}
