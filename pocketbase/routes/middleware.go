package routes

import (
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/hook"
)

// RequireAuth returns a middleware that requires authentication
func RequireAuth(app core.App) *hook.Handler[*core.RequestEvent] {
	return apis.RequireAuth()
}
