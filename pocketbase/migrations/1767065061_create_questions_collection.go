package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		// Create questions collection
		questions := core.NewBaseCollection("questions")
		questions.Fields.Add(
			// Question text (stored encrypted)
			&core.TextField{Name: "question", Required: true},
			// Options as encrypted JSON array
			&core.JSONField{Name: "options", Required: true},
			// Correct answer index (encrypted - stored as string for encryption)
			&core.TextField{Name: "correctAnswer", Required: true},
			// Explanation text (encrypted)
			&core.TextField{Name: "explanation", Required: true},
			// Category (not encrypted - used for filtering)
			&core.TextField{Name: "category", Required: true},
			// Optional image URL/path
			&core.TextField{Name: "imageUrl"},
			// Is this a premium-only question?
			&core.BoolField{Name: "isPremium"},
			// Difficulty level: 1=easy, 2=medium, 3=hard
			&core.NumberField{Name: "difficulty", OnlyInt: true, Min: PtrFloat(1), Max: PtrFloat(3)},
			// Original question ID for reference
			&core.TextField{Name: "originalId"},
			// Timestamps
			&core.AutodateField{Name: "created", OnCreate: true},
			&core.AutodateField{Name: "updated", OnCreate: true, OnUpdate: true},
		)

		// Create index for category lookups
		questions.Indexes = append(questions.Indexes,
			"CREATE INDEX idx_questions_category ON questions (category)",
			"CREATE INDEX idx_questions_premium ON questions (isPremium)",
		)

		if err := app.Save(questions); err != nil {
			return err
		}

		// Create question_sessions collection for tracking which questions a user has access to
		questionSessions := core.NewBaseCollection("question_sessions")
		users, _ := app.FindCollectionByNameOrId("users")
		userCollectionId := ""
		if users != nil {
			userCollectionId = users.Id
		}

		questionSessions.Fields.Add(
			// Link to user
			&core.RelationField{Name: "user", MaxSelect: 1, Required: true, CollectionId: userCollectionId},
			// Session type: "practice" or "test"
			&core.SelectField{Name: "sessionType", MaxSelect: 1, Values: []string{"practice", "test"}, Required: true},
			// Questions included in this session (IDs)
			&core.JSONField{Name: "questionIds", Required: true},
			// Current question index
			&core.NumberField{Name: "currentIndex", OnlyInt: true},
			// Answers submitted (questionId -> selectedAnswer)
			&core.JSONField{Name: "answers"},
			// Session status
			&core.SelectField{Name: "status", MaxSelect: 1, Values: []string{"active", "completed", "abandoned"}},
			// Started at
			&core.DateField{Name: "startedAt"},
			// Completed at
			&core.DateField{Name: "completedAt"},
			// Category filter (if any)
			&core.TextField{Name: "category"},
			// Timestamps
			&core.AutodateField{Name: "created", OnCreate: true},
			&core.AutodateField{Name: "updated", OnCreate: true, OnUpdate: true},
		)

		if err := app.Save(questionSessions); err != nil {
			return err
		}

		return nil
	}, func(app core.App) error {
		// Down migration - drop collections
		collection, err := app.FindCollectionByNameOrId("question_sessions")
		if err == nil {
			if err = app.Delete(collection); err != nil {
				return err
			}
		}

		collection, err = app.FindCollectionByNameOrId("questions")
		if err == nil {
			if err = app.Delete(collection); err != nil {
				return err
			}
		}

		return nil
	})
}

// PtrFloat returns a pointer to a float64
func PtrFloat(v float64) *float64 {
	return &v
}
