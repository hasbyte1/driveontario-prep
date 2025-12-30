package routes

import (
	"net/http"

	"github.com/pocketbase/pocketbase/core"
)

// UserProgressData represents the user's progress data
type UserProgressData struct {
	XP                 int         `json:"xp"`
	Level              int         `json:"level"`
	Streak             int         `json:"streak"`
	LongestStreak      int         `json:"longestStreak"`
	QuestionsCompleted int         `json:"questionsCompleted"`
	QuestionsCorrect   int         `json:"questionsCorrect"`
	Badges             []string    `json:"badges"`
	CategoryProgress   interface{} `json:"categoryProgress"`
	TestHistory        interface{} `json:"testHistory"`
	DailyChallenges    interface{} `json:"dailyChallenges"`
	DailyChallengeDate string      `json:"dailyChallengeDate"`
	FastestTestTime    int         `json:"fastestTestTime"`
	BestCorrectStreak  int         `json:"bestCorrectStreak"`
}

// SyncProgressRequest represents the request to sync progress
type SyncProgressRequest struct {
	LocalProgress  UserProgressData `json:"localProgress"`
	LastSyncedAt   string           `json:"lastSyncedAt,omitempty"`
	ForceOverwrite bool             `json:"forceOverwrite,omitempty"`
}

// SyncProgressResponse represents the response from sync
type SyncProgressResponse struct {
	MergedProgress UserProgressData `json:"mergedProgress"`
	SyncedAt       string           `json:"syncedAt"`
	Conflicts      []string         `json:"conflicts,omitempty"`
}

// RegisterProgressRoutes registers all progress-related API routes
func RegisterProgressRoutes(app core.App, se *core.ServeEvent) {
	// Get user progress
	se.Router.GET("/api/progress", func(e *core.RequestEvent) error {
		authRecord := e.Auth
		if authRecord == nil {
			return e.JSON(http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
		}

		// Get user progress record
		progressRecords, err := app.FindRecordsByFilter(
			"user_progress",
			"user = {:userId}",
			"-updated",
			1,
			0,
			map[string]any{"userId": authRecord.Id},
		)

		var progress UserProgressData

		// Get user-level data
		progress.XP = authRecord.GetInt("xp")
		progress.Level = authRecord.GetInt("level")
		progress.Streak = authRecord.GetInt("streak")
		progress.LongestStreak = authRecord.GetInt("longestStreak")
		progress.QuestionsCompleted = authRecord.GetInt("questionsCompleted")
		progress.QuestionsCorrect = authRecord.GetInt("questionsCorrect")

		badges := authRecord.Get("badges")
		if badges != nil {
			if badgeSlice, ok := badges.([]interface{}); ok {
				progress.Badges = make([]string, len(badgeSlice))
				for i, b := range badgeSlice {
					progress.Badges[i] = b.(string)
				}
			}
		} else {
			progress.Badges = []string{}
		}

		// Get detailed progress from user_progress collection
		if err == nil && len(progressRecords) > 0 {
			record := progressRecords[0]
			progress.CategoryProgress = record.Get("categoryProgress")
			progress.TestHistory = record.Get("testHistory")
			progress.DailyChallenges = record.Get("dailyChallenges")
			progress.DailyChallengeDate = record.GetString("dailyChallengeDate")
			progress.FastestTestTime = record.GetInt("fastestTestTime")
			progress.BestCorrectStreak = record.GetInt("bestCorrectStreak")
		}

		return e.JSON(http.StatusOK, progress)
	}).Bind(RequireAuth(app))

	// Sync progress (merge local and server data)
	se.Router.POST("/api/progress/sync", func(e *core.RequestEvent) error {
		authRecord := e.Auth
		if authRecord == nil {
			return e.JSON(http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
		}

		var req SyncProgressRequest
		if err := e.BindBody(&req); err != nil {
			return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
		}

		local := req.LocalProgress

		// Get server progress
		serverXP := authRecord.GetInt("xp")
		serverStreak := authRecord.GetInt("streak")
		serverLongestStreak := authRecord.GetInt("longestStreak")
		serverQuestionsCompleted := authRecord.GetInt("questionsCompleted")
		serverQuestionsCorrect := authRecord.GetInt("questionsCorrect")

		// Merge strategy: take the higher values
		merged := UserProgressData{
			XP:                 max(local.XP, serverXP),
			Streak:             max(local.Streak, serverStreak),
			LongestStreak:      max(local.LongestStreak, serverLongestStreak),
			QuestionsCompleted: max(local.QuestionsCompleted, serverQuestionsCompleted),
			QuestionsCorrect:   max(local.QuestionsCorrect, serverQuestionsCorrect),
			FastestTestTime:    local.FastestTestTime,
			BestCorrectStreak:  local.BestCorrectStreak,
		}

		// Calculate level from XP
		merged.Level = calculateLevel(merged.XP)

		// Merge badges (union of both sets)
		serverBadges := authRecord.Get("badges")
		badgeSet := make(map[string]bool)
		if serverBadges != nil {
			if badgeSlice, ok := serverBadges.([]interface{}); ok {
				for _, b := range badgeSlice {
					badgeSet[b.(string)] = true
				}
			}
		}
		for _, b := range local.Badges {
			badgeSet[b] = true
		}
		merged.Badges = make([]string, 0, len(badgeSet))
		for badge := range badgeSet {
			merged.Badges = append(merged.Badges, badge)
		}

		// Use local data for complex fields if force overwrite or server is empty
		progressRecords, _ := app.FindRecordsByFilter(
			"user_progress",
			"user = {:userId}",
			"-updated",
			1,
			0,
			map[string]any{"userId": authRecord.Id},
		)

		if req.ForceOverwrite || len(progressRecords) == 0 {
			merged.CategoryProgress = local.CategoryProgress
			merged.TestHistory = local.TestHistory
			merged.DailyChallenges = local.DailyChallenges
			merged.DailyChallengeDate = local.DailyChallengeDate
		} else if len(progressRecords) > 0 {
			serverProgress := progressRecords[0]
			// Merge test history (combine and dedupe by date)
			merged.TestHistory = mergeTestHistory(
				local.TestHistory,
				serverProgress.Get("testHistory"),
			)
			merged.CategoryProgress = local.CategoryProgress // Local wins for category progress
			merged.DailyChallenges = local.DailyChallenges
			merged.DailyChallengeDate = local.DailyChallengeDate

			// Take best times
			serverFastest := serverProgress.GetInt("fastestTestTime")
			if serverFastest > 0 && (merged.FastestTestTime == 0 || serverFastest < merged.FastestTestTime) {
				merged.FastestTestTime = serverFastest
			}
			serverBestStreak := serverProgress.GetInt("bestCorrectStreak")
			if serverBestStreak > merged.BestCorrectStreak {
				merged.BestCorrectStreak = serverBestStreak
			}
		}

		// Update user record
		authRecord.Set("xp", merged.XP)
		authRecord.Set("level", merged.Level)
		authRecord.Set("streak", merged.Streak)
		authRecord.Set("longestStreak", merged.LongestStreak)
		authRecord.Set("questionsCompleted", merged.QuestionsCompleted)
		authRecord.Set("questionsCorrect", merged.QuestionsCorrect)
		authRecord.Set("badges", merged.Badges)

		if err := app.Save(authRecord); err != nil {
			return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to save user progress"})
		}

		// Update or create user_progress record
		var progressRecord *core.Record
		if len(progressRecords) > 0 {
			progressRecord = progressRecords[0]
		} else {
			collection, err := app.FindCollectionByNameOrId("user_progress")
			if err != nil {
				return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to find collection"})
			}
			progressRecord = core.NewRecord(collection)
			progressRecord.Set("user", authRecord.Id)
		}

		progressRecord.Set("categoryProgress", merged.CategoryProgress)
		progressRecord.Set("testHistory", merged.TestHistory)
		progressRecord.Set("dailyChallenges", merged.DailyChallenges)
		progressRecord.Set("dailyChallengeDate", merged.DailyChallengeDate)
		progressRecord.Set("fastestTestTime", merged.FastestTestTime)
		progressRecord.Set("bestCorrectStreak", merged.BestCorrectStreak)

		if err := app.Save(progressRecord); err != nil {
			return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to save detailed progress"})
		}

		return e.JSON(http.StatusOK, SyncProgressResponse{
			MergedProgress: merged,
			SyncedAt:       progressRecord.GetDateTime("updated").String(),
		})
	}).Bind(RequireAuth(app))

	// Update specific progress field
	se.Router.PATCH("/api/progress", func(e *core.RequestEvent) error {
		authRecord := e.Auth
		if authRecord == nil {
			return e.JSON(http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
		}

		var updates map[string]interface{}
		if err := e.BindBody(&updates); err != nil {
			return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
		}

		// Allowed fields to update on user record
		userFields := map[string]bool{
			"xp":                 true,
			"level":              true,
			"streak":             true,
			"longestStreak":      true,
			"questionsCompleted": true,
			"questionsCorrect":   true,
			"badges":             true,
		}

		// Allowed fields to update on progress record
		progressFields := map[string]bool{
			"categoryProgress":   true,
			"testHistory":        true,
			"dailyChallenges":    true,
			"dailyChallengeDate": true,
			"fastestTestTime":    true,
			"bestCorrectStreak":  true,
		}

		// Update user record
		for field, value := range updates {
			if userFields[field] {
				authRecord.Set(field, value)
			}
		}

		// Recalculate level if XP was updated
		if _, hasXP := updates["xp"]; hasXP {
			authRecord.Set("level", calculateLevel(authRecord.GetInt("xp")))
		}

		if err := app.Save(authRecord); err != nil {
			return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to update user"})
		}

		// Update progress record if needed
		hasProgressUpdates := false
		for field := range updates {
			if progressFields[field] {
				hasProgressUpdates = true
				break
			}
		}

		if hasProgressUpdates {
			progressRecords, _ := app.FindRecordsByFilter(
				"user_progress",
				"user = {:userId}",
				"-updated",
				1,
				0,
				map[string]any{"userId": authRecord.Id},
			)

			var progressRecord *core.Record
			if len(progressRecords) > 0 {
				progressRecord = progressRecords[0]
			} else {
				collection, err := app.FindCollectionByNameOrId("user_progress")
				if err != nil {
					return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to find collection"})
				}
				progressRecord = core.NewRecord(collection)
				progressRecord.Set("user", authRecord.Id)
			}

			for field, value := range updates {
				if progressFields[field] {
					progressRecord.Set(field, value)
				}
			}

			if err := app.Save(progressRecord); err != nil {
				return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to update progress"})
			}
		}

		return e.JSON(http.StatusOK, map[string]string{"status": "updated"})
	}).Bind(RequireAuth(app))

	// Add XP endpoint (for gamification events)
	se.Router.POST("/api/progress/add-xp", func(e *core.RequestEvent) error {
		authRecord := e.Auth
		if authRecord == nil {
			return e.JSON(http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
		}

		var req struct {
			Amount int    `json:"amount"`
			Reason string `json:"reason"`
		}
		if err := e.BindBody(&req); err != nil {
			return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
		}

		if req.Amount <= 0 || req.Amount > 1000 {
			return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid XP amount"})
		}

		currentXP := authRecord.GetInt("xp")
		newXP := currentXP + req.Amount
		newLevel := calculateLevel(newXP)
		oldLevel := authRecord.GetInt("level")

		authRecord.Set("xp", newXP)
		authRecord.Set("level", newLevel)

		if err := app.Save(authRecord); err != nil {
			return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to add XP"})
		}

		return e.JSON(http.StatusOK, map[string]interface{}{
			"newXP":     newXP,
			"newLevel":  newLevel,
			"leveledUp": newLevel > oldLevel,
		})
	}).Bind(RequireAuth(app))

	// Award badge endpoint
	se.Router.POST("/api/progress/award-badge", func(e *core.RequestEvent) error {
		authRecord := e.Auth
		if authRecord == nil {
			return e.JSON(http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
		}

		var req struct {
			BadgeID string `json:"badgeId"`
		}
		if err := e.BindBody(&req); err != nil {
			return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
		}

		if req.BadgeID == "" {
			return e.JSON(http.StatusBadRequest, map[string]string{"error": "Badge ID required"})
		}

		// Get current badges
		badges := authRecord.Get("badges")
		badgeList := []string{}
		if badges != nil {
			if badgeSlice, ok := badges.([]interface{}); ok {
				for _, b := range badgeSlice {
					badgeList = append(badgeList, b.(string))
				}
			}
		}

		// Check if already has badge
		for _, b := range badgeList {
			if b == req.BadgeID {
				return e.JSON(http.StatusOK, map[string]interface{}{
					"awarded": false,
					"reason":  "Badge already earned",
				})
			}
		}

		// Add new badge
		badgeList = append(badgeList, req.BadgeID)
		authRecord.Set("badges", badgeList)

		if err := app.Save(authRecord); err != nil {
			return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to award badge"})
		}

		return e.JSON(http.StatusOK, map[string]interface{}{
			"awarded":     true,
			"totalBadges": len(badgeList),
		})
	}).Bind(RequireAuth(app))
}

// calculateLevel calculates level from XP
func calculateLevel(xp int) int {
	levels := []int{0, 500, 1500, 3500, 7000, 12000}
	level := 1
	for i, threshold := range levels {
		if xp >= threshold {
			level = i + 1
		}
	}
	return level
}

// mergeTestHistory merges test history from local and server
func mergeTestHistory(local, server interface{}) interface{} {
	if local == nil {
		return server
	}
	if server == nil {
		return local
	}

	// Simple merge: prefer local if both exist
	// In production, you'd want to merge by date and dedupe
	localSlice, localOk := local.([]interface{})
	serverSlice, serverOk := server.([]interface{})

	if !localOk {
		return server
	}
	if !serverOk {
		return local
	}

	// Create a map of tests by date to dedupe
	testMap := make(map[string]interface{})
	for _, test := range serverSlice {
		if testMap, ok := test.(map[string]interface{}); ok {
			if date, ok := testMap["date"].(string); ok {
				testMap[date] = test
			}
		}
	}
	for _, test := range localSlice {
		if testMap, ok := test.(map[string]interface{}); ok {
			if date, ok := testMap["date"].(string); ok {
				testMap[date] = test
			}
		}
	}

	// Convert back to slice
	result := make([]interface{}, 0, len(testMap))
	for _, test := range testMap {
		result = append(result, test)
	}

	return result
}
