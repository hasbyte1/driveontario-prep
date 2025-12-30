package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		// Create XP transactions collection for audit log
		xpTransactions := core.NewBaseCollection("xp_transactions")

		users, err := app.FindCollectionByNameOrId("users")
		if err != nil {
			return nil // Users collection doesn't exist yet
		}

		xpTransactions.Fields.Add(
			// Link to user
			&core.RelationField{Name: "user", MaxSelect: 1, Required: true, CollectionId: users.Id},
			// XP amount (can be positive or negative for corrections)
			&core.NumberField{Name: "amount", OnlyInt: true, Required: true},
			// Reason for XP: "correct_answer", "test_complete", "test_pass", "perfect_score",
			// "daily_login", "streak_bonus", "badge_earned", "daily_challenge"
			&core.TextField{Name: "reason", Required: true},
			// Reference ID (questionId, testSessionId, badgeId, etc.)
			&core.TextField{Name: "referenceId"},
			// Reference type for easier querying
			&core.SelectField{
				Name:      "referenceType",
				MaxSelect: 1,
				Values:    []string{"question", "test", "badge", "streak", "daily_challenge", "correction"},
			},
			// Session ID for test-related transactions
			&core.TextField{Name: "sessionId"},
			// Metadata (JSON for additional context)
			&core.JSONField{Name: "metadata"},
			// Timestamps
			&core.AutodateField{Name: "created", OnCreate: true},
		)

		// Create indexes for efficient querying
		xpTransactions.Indexes = append(xpTransactions.Indexes,
			"CREATE INDEX idx_xp_transactions_user ON xp_transactions (user)",
			"CREATE INDEX idx_xp_transactions_reason ON xp_transactions (reason)",
			"CREATE INDEX idx_xp_transactions_created ON xp_transactions (created)",
			"CREATE INDEX idx_xp_transactions_session ON xp_transactions (sessionId)",
		)

		if err := app.Save(xpTransactions); err != nil {
			return err
		}

		// Create badge_awards collection for tracking verified badge awards
		badgeAwards := core.NewBaseCollection("badge_awards")
		badgeAwards.Fields.Add(
			// Link to user
			&core.RelationField{Name: "user", MaxSelect: 1, Required: true, CollectionId: users.Id},
			// Badge ID
			&core.TextField{Name: "badgeId", Required: true},
			// Badge tier for filtering
			&core.SelectField{
				Name:      "tier",
				MaxSelect: 1,
				Values:    []string{"bronze", "silver", "gold", "platinum", "legendary"},
				Required:  true,
			},
			// XP awarded with the badge
			&core.NumberField{Name: "xpAwarded", OnlyInt: true},
			// Verification data (the stats that earned the badge)
			&core.JSONField{Name: "verificationData"},
			// Timestamps
			&core.AutodateField{Name: "created", OnCreate: true},
		)

		// Unique constraint on user + badgeId to prevent duplicates
		badgeAwards.Indexes = append(badgeAwards.Indexes,
			"CREATE UNIQUE INDEX idx_badge_awards_unique ON badge_awards (user, badgeId)",
			"CREATE INDEX idx_badge_awards_user ON badge_awards (user)",
			"CREATE INDEX idx_badge_awards_tier ON badge_awards (tier)",
		)

		if err := app.Save(badgeAwards); err != nil {
			return err
		}

		return nil
	}, func(app core.App) error {
		// Down migration - drop collections
		collection, err := app.FindCollectionByNameOrId("badge_awards")
		if err == nil {
			if err = app.Delete(collection); err != nil {
				return err
			}
		}

		collection, err = app.FindCollectionByNameOrId("xp_transactions")
		if err == nil {
			if err = app.Delete(collection); err != nil {
				return err
			}
		}

		return nil
	})
}
