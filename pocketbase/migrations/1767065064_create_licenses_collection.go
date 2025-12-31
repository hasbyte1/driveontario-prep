package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		users, err := app.FindCollectionByNameOrId("users")
		if err != nil {
			return nil // Users collection doesn't exist yet
		}

		// Create licenses collection
		licenses := core.NewBaseCollection("licenses")
		licenses.Fields.Add(
			// License key (unique, indexed)
			&core.TextField{Name: "key", Required: true},
			// License type: lifetime, enterprise, promo, gift
			&core.SelectField{
				Name:      "type",
				MaxSelect: 1,
				Values:    []string{"lifetime", "enterprise", "promo", "gift"},
				Required:  true,
			},
			// User who redeemed the license (null until redeemed)
			&core.RelationField{Name: "user", MaxSelect: 1, CollectionId: users.Id},
			// Plan granted by this license
			&core.SelectField{
				Name:      "plan",
				MaxSelect: 1,
				Values:    []string{"monthly", "yearly", "lifetime"},
				Required:  true,
			},
			// Expiration date (null for lifetime)
			&core.DateField{Name: "expiresAt"},
			// Maximum number of activations allowed
			&core.NumberField{Name: "maxActivations", OnlyInt: true, Required: true},
			// Current activation count
			&core.NumberField{Name: "activations", OnlyInt: true},
			// Whether the license is currently active
			&core.BoolField{Name: "isActive"},
			// Whether the license has been revoked
			&core.BoolField{Name: "isRevoked"},
			// Notes (admin use)
			&core.TextField{Name: "notes"},
			// Who created the license (admin)
			&core.RelationField{Name: "createdBy", MaxSelect: 1, CollectionId: users.Id},
			// When the license was redeemed
			&core.DateField{Name: "redeemedAt"},
			// Metadata (JSON for additional info)
			&core.JSONField{Name: "metadata"},
			// Timestamps
			&core.AutodateField{Name: "created", OnCreate: true},
			&core.AutodateField{Name: "updated", OnCreate: true, OnUpdate: true},
		)

		// Add indexes
		licenses.Indexes = append(licenses.Indexes,
			"CREATE UNIQUE INDEX idx_licenses_key ON licenses (key)",
			"CREATE INDEX idx_licenses_user ON licenses (user)",
			"CREATE INDEX idx_licenses_type ON licenses (type)",
			"CREATE INDEX idx_licenses_active ON licenses (isActive)",
		)

		if err := app.Save(licenses); err != nil {
			return err
		}

		// Create license_activations collection for tracking activations
		activations := core.NewBaseCollection("license_activations")
		activations.Fields.Add(
			// Reference to license
			&core.RelationField{Name: "license", MaxSelect: 1, Required: true, CollectionId: licenses.Id},
			// User who activated
			&core.RelationField{Name: "user", MaxSelect: 1, Required: true, CollectionId: users.Id},
			// Device/browser fingerprint (for limiting activations)
			&core.TextField{Name: "deviceFingerprint"},
			// User agent
			&core.TextField{Name: "userAgent"},
			// IP address (hashed for privacy)
			&core.TextField{Name: "ipHash"},
			// Whether this activation is currently valid
			&core.BoolField{Name: "isValid"},
			// Deactivation date (if deactivated)
			&core.DateField{Name: "deactivatedAt"},
			// Timestamps
			&core.AutodateField{Name: "created", OnCreate: true},
		)

		activations.Indexes = append(activations.Indexes,
			"CREATE INDEX idx_license_activations_license ON license_activations (license)",
			"CREATE INDEX idx_license_activations_user ON license_activations (user)",
		)

		if err := app.Save(activations); err != nil {
			return err
		}

		return nil
	}, func(app core.App) error {
		// Down migration - drop collections
		collection, err := app.FindCollectionByNameOrId("license_activations")
		if err == nil {
			if err = app.Delete(collection); err != nil {
				return err
			}
		}

		collection, err = app.FindCollectionByNameOrId("licenses")
		if err == nil {
			if err = app.Delete(collection); err != nil {
				return err
			}
		}

		return nil
	})
}
