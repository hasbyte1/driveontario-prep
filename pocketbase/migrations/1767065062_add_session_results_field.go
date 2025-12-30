package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		// Update question_sessions collection to add results field
		questionSessions, err := app.FindCollectionByNameOrId("question_sessions")
		if err != nil {
			return nil // Collection doesn't exist yet, skip
		}

		// Add results field for caching test results
		questionSessions.Fields.Add(
			&core.JSONField{Name: "results"},
		)

		// Update status field to include "timeout"
		for i, field := range questionSessions.Fields {
			if selectField, ok := field.(*core.SelectField); ok && selectField.Name == "status" {
				selectField.Values = []string{"active", "completed", "abandoned", "timeout"}
				questionSessions.Fields[i] = selectField
				break
			}
		}

		if err = app.Save(questionSessions); err != nil {
			return err
		}

		return nil
	}, func(app core.App) error {
		// Down migration - remove results field
		questionSessions, err := app.FindCollectionByNameOrId("question_sessions")
		if err != nil {
			return nil
		}

		questionSessions.Fields.RemoveByName("results")

		// Revert status field
		for i, field := range questionSessions.Fields {
			if selectField, ok := field.(*core.SelectField); ok && selectField.Name == "status" {
				selectField.Values = []string{"active", "completed", "abandoned"}
				questionSessions.Fields[i] = selectField
				break
			}
		}

		if err = app.Save(questionSessions); err != nil {
			return err
		}

		return nil
	})
}
