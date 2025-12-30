package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		users, err := app.FindCollectionByNameOrId("users")
		if err != nil {
			return nil
		}

		users.Fields.Add(
			&core.NumberField{Name: "xp", OnlyInt: true},
			&core.NumberField{Name: "level", OnlyInt: true},
			&core.NumberField{Name: "streak", OnlyInt: true},
			&core.NumberField{Name: "longestStreak", OnlyInt: true},
			&core.NumberField{Name: "questionsCompleted", OnlyInt: true},
			&core.NumberField{Name: "questionsCorrect", OnlyInt: true},
			&core.JSONField{Name: "badges"},
			&core.BoolField{Name: "isPremium"},
			&core.SelectField{Name: "premiumPlan", Values: []string{"'free", "monthly", "yearly", "lifetime"}},
			&core.DateField{Name: "premiumExpiresAt"},
			&core.TextField{Name: "stripeCustomerId"},
			&core.TextField{Name: "stripeSubscriptionId"},
			&core.AutodateField{Name: "created", OnCreate: true},
			&core.AutodateField{Name: "updated", OnCreate: true, OnUpdate: true},
		)

		if err = app.Save(users); err != nil {
			return err
		}

		userProgress := core.NewBaseCollection("user_progress")
		userProgress.Fields.Add(
			&core.RelationField{Name: "user", MaxSelect: 1, Required: true, CollectionId: users.Id},
			&core.JSONField{Name: "categoryProgress"},
			&core.JSONField{Name: "testHistory"},
			&core.JSONField{Name: "dailyChallenges"},
			&core.TextField{Name: "dailyChallengeDate"},
			&core.NumberField{Name: "fastestTestTime", OnlyInt: true},
			&core.NumberField{Name: "bestCorrectStreak", OnlyInt: true},
			&core.AutodateField{Name: "created", OnCreate: true},
			&core.AutodateField{Name: "updated", OnCreate: true, OnUpdate: true},
		)
		if err = app.Save(userProgress); err != nil {
			return err
		}

		subscriptions := core.NewBaseCollection("subscriptions")
		subscriptions.Fields.Add(
			&core.RelationField{Name: "user", MaxSelect: 1, Required: true, CollectionId: users.Id},
			&core.TextField{Name: "stripeSubscriptionId"},
			&core.TextField{Name: "stripeCustomerId"},
			&core.SelectField{Name: "plan", MaxSelect: 1, Values: []string{"monthly", "yearly", "lifetime"}},
			&core.SelectField{Name: "status", MaxSelect: 1, Values: []string{"active", "cancelled", "past_due", "expired"}},
			&core.DateField{Name: "currentPeriodStart"},
			&core.DateField{Name: "currentPeriodEnd"},
			&core.AutodateField{Name: "created", OnCreate: true},
			&core.AutodateField{Name: "updated", OnCreate: true, OnUpdate: true},
		)
		if err = app.Save(subscriptions); err != nil {
			return err
		}

		return nil
	}, func(app core.App) error {
		users, err := app.FindCollectionByNameOrId("users")
		if err != nil {
			return nil
		}

		usersFields := []string{
			"xp",
			"level",
			"streak",
			"longestStreak",
			"questionsCompleted",
			"questionsCorrect",
			"badges",
			"isPremium",
			"premiumPlan",
			"premiumExpiresAt",
			"stripeCustomerId",
			"stripeSubscriptionId",
		}

		for _, f := range usersFields {
			users.Fields.RemoveByName(f)
		}

		if err = app.Save(users); err != nil {
			return err
		}

		collection, err := app.FindCollectionByNameOrId("user_progress")
		if err != nil {
			return nil
		}
		if err = app.Delete(collection); err != nil {
			return err
		}

		collection, err = app.FindCollectionByNameOrId("subscriptions")
		if err != nil {
			return nil
		}
		if err = app.Delete(collection); err != nil {
			return err
		}

		return nil
	})
}
