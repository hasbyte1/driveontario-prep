package routes

import (
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

// RequireAuth returns a middleware that requires authentication
func RequireAuth(app core.App) func(e *core.RequestEvent) error {
	return apis.RequireAuth()
}
