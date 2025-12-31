package main

import (
	"log"
	"os"
	"strings"

	"driveprep/routes"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"

	_ "driveprep/migrations"
)

func main() {
	app := pocketbase.New()

	isGoRun := strings.HasPrefix(os.Args[0], os.TempDir())

	migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
		// enable auto creation of migration files when making collection changes in the Dashboard
		// (the isGoRun check is to enable it only during development)
		Automigrate: isGoRun,
	})

	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		// Register custom API routes
		routes.RegisterStripeRoutes(app, se)
		routes.RegisterLeaderboardRoutes(app, se)
		routes.RegisterProgressRoutes(app, se)
		routes.RegisterQuestionRoutes(app, se)
		routes.RegisterSeedRoutes(app, se)
		routes.RegisterTestRoutes(app, se)
		routes.RegisterLicenseRoutes(app, se)

		// Serves static files from the provided public dir (if exists)
		se.Router.GET("/{path...}", apis.Static(os.DirFS("./pb_public"), false))

		return se.Next()
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
