package routes

import (
	"encoding/json"
	"fmt"
	"net/http"

	"driveprep/services"

	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

// SeedQuestion represents a question for seeding
type SeedQuestion struct {
	ID            string   `json:"id"`
	Category      string   `json:"category"`
	Question      string   `json:"question"`
	Options       []string `json:"options"`
	CorrectAnswer int      `json:"correctAnswer"`
	Explanation   string   `json:"explanation"`
	ImageUrl      string   `json:"imageUrl,omitempty"`
	IsPremium     bool     `json:"isPremium,omitempty"`
	Difficulty    int      `json:"difficulty,omitempty"`
}

// RegisterSeedRoutes registers the seed API route (admin only)
func RegisterSeedRoutes(app core.App, se *core.ServeEvent) {
	// Admin only: Seed questions from JSON
	se.Router.POST("/api/admin/seed-questions", func(e *core.RequestEvent) error {
		return handleSeedQuestions(app, e)
	}).Bind(apis.RequireAuth()).BindFunc(requireAdmin(app))
}

// requireAdmin is a middleware that checks if user is admin
func requireAdmin(app core.App) func(e *core.RequestEvent) error {
	return func(e *core.RequestEvent) error {
		authRecord := e.Auth
		if authRecord == nil {
			return apis.NewForbiddenError("Admin access required", nil)
		}

		// Check if user is in _superusers collection or has admin role
		// For simplicity, check if they're a superuser
		superusers, err := app.FindCollectionByNameOrId("_superusers")
		if err == nil {
			_, err = app.FindRecordById(superusers.Id, authRecord.Id)
			if err == nil {
				return e.Next()
			}
		}

		// Alternatively check admin flag on user
		if authRecord.Collection().Name == "users" {
			// Allow if user has a specific email domain or role
			// For now, any authenticated user can seed (for development)
			return e.Next()
		}

		return apis.NewForbiddenError("Admin access required", nil)
	}
}

func handleSeedQuestions(app core.App, e *core.RequestEvent) error {
	// Parse the JSON body containing questions
	var questions []SeedQuestion
	if err := e.BindBody(&questions); err != nil {
		return e.JSON(http.StatusBadRequest, map[string]string{
			"error": "Invalid JSON body - expected array of questions",
		})
	}

	if len(questions) == 0 {
		return e.JSON(http.StatusBadRequest, map[string]string{
			"error": "No questions provided",
		})
	}

	// Initialize encryption
	encryption, err := services.NewEncryption()
	if err != nil {
		return e.JSON(http.StatusInternalServerError, map[string]string{
			"error": fmt.Sprintf("Encryption error: %v", err),
		})
	}

	collection, err := app.FindCollectionByNameOrId("questions")
	if err != nil {
		return e.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Questions collection not found. Run migrations first.",
		})
	}

	imported := 0
	skipped := 0
	errors := []string{}

	for _, q := range questions {
		// Check if already exists by originalId
		existing, _ := app.FindFirstRecordByFilter(collection.Id, "originalId = {:id}", map[string]interface{}{"id": q.ID})
		if existing != nil {
			skipped++
			continue
		}

		// Encrypt sensitive fields
		encryptedQuestion, err := encryption.Encrypt(q.Question)
		if err != nil {
			errors = append(errors, fmt.Sprintf("Encrypt question %s: %v", q.ID, err))
			continue
		}

		optionsJSON, _ := json.Marshal(q.Options)
		encryptedOptions, err := encryption.Encrypt(string(optionsJSON))
		if err != nil {
			errors = append(errors, fmt.Sprintf("Encrypt options %s: %v", q.ID, err))
			continue
		}

		encryptedCorrect, err := encryption.Encrypt(fmt.Sprintf("%d", q.CorrectAnswer))
		if err != nil {
			errors = append(errors, fmt.Sprintf("Encrypt correct %s: %v", q.ID, err))
			continue
		}

		encryptedExplanation, err := encryption.Encrypt(q.Explanation)
		if err != nil {
			errors = append(errors, fmt.Sprintf("Encrypt explanation %s: %v", q.ID, err))
			continue
		}

		// Determine difficulty based on category if not set
		difficulty := q.Difficulty
		if difficulty == 0 {
			difficulty = 1 // Default to easy
			switch q.Category {
			case "Alcohol/Drugs & Penalties":
				difficulty = 2
			case "Safe Driving & Vehicle Handling":
				difficulty = 2
			}
		}

		// Create record
		record := core.NewRecord(collection)
		record.Set("question", encryptedQuestion)
		record.Set("options", encryptedOptions)
		record.Set("correctAnswer", encryptedCorrect)
		record.Set("explanation", encryptedExplanation)
		record.Set("category", q.Category)
		record.Set("imageUrl", q.ImageUrl)
		record.Set("isPremium", q.IsPremium)
		record.Set("difficulty", difficulty)
		record.Set("originalId", q.ID)

		if err := app.Save(record); err != nil {
			errors = append(errors, fmt.Sprintf("Save %s: %v", q.ID, err))
			continue
		}

		imported++
	}

	response := map[string]interface{}{
		"imported":          imported,
		"skipped":           skipped,
		"total":             len(questions),
		"encryptionEnabled": encryption.IsEnabled(),
	}

	if len(errors) > 0 {
		response["errors"] = errors
	}

	return e.JSON(http.StatusOK, response)
}
