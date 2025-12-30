package routes

import (
	"net/http"
	"time"

	"github.com/pocketbase/pocketbase/core"
)

// Badge definitions for server-side verification
type BadgeDefinition struct {
	ID       string
	Tier     string
	XPReward int
}

var badgeDefinitions = map[string]BadgeDefinition{
	// Bronze tier
	"first_steps":   {ID: "first_steps", Tier: "bronze", XPReward: 50},
	"early_bird":    {ID: "early_bird", Tier: "bronze", XPReward: 75},
	"night_owl":     {ID: "night_owl", Tier: "bronze", XPReward: 75},
	"quick_learner": {ID: "quick_learner", Tier: "bronze", XPReward: 100},
	// Silver tier
	"sign_master":  {ID: "sign_master", Tier: "silver", XPReward: 200},
	"road_scholar": {ID: "road_scholar", Tier: "silver", XPReward: 250},
	"sharpshooter": {ID: "sharpshooter", Tier: "silver", XPReward: 200},
	"speed_demon":  {ID: "speed_demon", Tier: "silver", XPReward: 250},
	"consistent":   {ID: "consistent", Tier: "silver", XPReward: 300},
	// Gold tier
	"perfect_score":     {ID: "perfect_score", Tier: "gold", XPReward: 500},
	"category_champion": {ID: "category_champion", Tier: "gold", XPReward: 750},
	"dedicated_driver":  {ID: "dedicated_driver", Tier: "gold", XPReward: 500},
	"marathon_runner":   {ID: "marathon_runner", Tier: "gold", XPReward: 500},
	// Platinum tier
	"diamond_streak": {ID: "diamond_streak", Tier: "platinum", XPReward: 1000},
	"test_master":    {ID: "test_master", Tier: "platinum", XPReward: 750},
	"perfectionist":  {ID: "perfectionist", Tier: "platinum", XPReward: 1000},
	// Legendary tier
	"g1_legend": {ID: "g1_legend", Tier: "legendary", XPReward: 2000},
}

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

	// Add XP endpoint (for gamification events) - with transaction logging
	se.Router.POST("/api/progress/add-xp", func(e *core.RequestEvent) error {
		authRecord := e.Auth
		if authRecord == nil {
			return e.JSON(http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
		}

		var req struct {
			Amount        int                    `json:"amount"`
			Reason        string                 `json:"reason"`
			ReferenceId   string                 `json:"referenceId,omitempty"`
			ReferenceType string                 `json:"referenceType,omitempty"`
			SessionId     string                 `json:"sessionId,omitempty"`
			Metadata      map[string]interface{} `json:"metadata,omitempty"`
		}
		if err := e.BindBody(&req); err != nil {
			return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
		}

		if req.Amount <= 0 || req.Amount > 1000 {
			return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid XP amount"})
		}

		if req.Reason == "" {
			return e.JSON(http.StatusBadRequest, map[string]string{"error": "Reason required"})
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

		// Log XP transaction
		if err := logXPTransaction(app, authRecord.Id, req.Amount, req.Reason, req.ReferenceId, req.ReferenceType, req.SessionId, req.Metadata); err != nil {
			// Log error but don't fail the request - XP was already added
			app.Logger().Error("Failed to log XP transaction", "error", err)
		}

		return e.JSON(http.StatusOK, map[string]interface{}{
			"newXP":     newXP,
			"newLevel":  newLevel,
			"leveledUp": newLevel > oldLevel,
		})
	}).Bind(RequireAuth(app))

	// Get XP transaction history
	se.Router.GET("/api/progress/xp-history", func(e *core.RequestEvent) error {
		authRecord := e.Auth
		if authRecord == nil {
			return e.JSON(http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
		}

		limit := 50
		if l := e.Request.URL.Query().Get("limit"); l != "" {
			if parsed := parseInt(l); parsed > 0 && parsed <= 100 {
				limit = parsed
			}
		}

		transactions, err := app.FindRecordsByFilter(
			"xp_transactions",
			"user = {:userId}",
			"-created",
			limit,
			0,
			map[string]any{"userId": authRecord.Id},
		)

		if err != nil {
			return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to fetch XP history"})
		}

		result := make([]map[string]interface{}, len(transactions))
		for i, tx := range transactions {
			result[i] = map[string]interface{}{
				"id":            tx.Id,
				"amount":        tx.GetInt("amount"),
				"reason":        tx.GetString("reason"),
				"referenceId":   tx.GetString("referenceId"),
				"referenceType": tx.GetString("referenceType"),
				"created":       tx.GetDateTime("created").String(),
			}
		}

		return e.JSON(http.StatusOK, map[string]interface{}{
			"transactions": result,
			"total":        len(result),
		})
	}).Bind(RequireAuth(app))

	// Award badge endpoint - with server-side verification
	se.Router.POST("/api/progress/award-badge", func(e *core.RequestEvent) error {
		authRecord := e.Auth
		if authRecord == nil {
			return e.JSON(http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
		}

		var req struct {
			BadgeID          string                 `json:"badgeId"`
			VerificationData map[string]interface{} `json:"verificationData,omitempty"`
		}
		if err := e.BindBody(&req); err != nil {
			return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
		}

		if req.BadgeID == "" {
			return e.JSON(http.StatusBadRequest, map[string]string{"error": "Badge ID required"})
		}

		// Verify badge exists
		badgeDef, exists := badgeDefinitions[req.BadgeID]
		if !exists {
			return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid badge ID"})
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

		// Verify badge conditions based on user stats
		verified, verificationReason := verifyBadgeCondition(app, authRecord, req.BadgeID, req.VerificationData)
		if !verified {
			return e.JSON(http.StatusOK, map[string]interface{}{
				"awarded": false,
				"reason":  verificationReason,
			})
		}

		// Add new badge
		badgeList = append(badgeList, req.BadgeID)
		authRecord.Set("badges", badgeList)

		// Award XP for badge
		currentXP := authRecord.GetInt("xp")
		newXP := currentXP + badgeDef.XPReward
		newLevel := calculateLevel(newXP)
		oldLevel := authRecord.GetInt("level")

		authRecord.Set("xp", newXP)
		authRecord.Set("level", newLevel)

		if err := app.Save(authRecord); err != nil {
			return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to award badge"})
		}

		// Log XP transaction for badge award
		if err := logXPTransaction(app, authRecord.Id, badgeDef.XPReward, "badge_earned", req.BadgeID, "badge", "", req.VerificationData); err != nil {
			app.Logger().Error("Failed to log badge XP transaction", "error", err)
		}

		// Log badge award in badge_awards collection
		if err := logBadgeAward(app, authRecord.Id, req.BadgeID, badgeDef.Tier, badgeDef.XPReward, req.VerificationData); err != nil {
			app.Logger().Error("Failed to log badge award", "error", err)
		}

		return e.JSON(http.StatusOK, map[string]interface{}{
			"awarded":     true,
			"xpAwarded":   badgeDef.XPReward,
			"newXP":       newXP,
			"newLevel":    newLevel,
			"leveledUp":   newLevel > oldLevel,
			"totalBadges": len(badgeList),
		})
	}).Bind(RequireAuth(app))

	// Check and award all eligible badges at once
	se.Router.POST("/api/progress/check-badges", func(e *core.RequestEvent) error {
		authRecord := e.Auth
		if authRecord == nil {
			return e.JSON(http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
		}

		// Get current badges
		badges := authRecord.Get("badges")
		currentBadges := make(map[string]bool)
		if badges != nil {
			if badgeSlice, ok := badges.([]interface{}); ok {
				for _, b := range badgeSlice {
					currentBadges[b.(string)] = true
				}
			}
		}

		// Check all badges user doesn't have
		newBadges := []string{}
		totalXP := 0

		for badgeID, badgeDef := range badgeDefinitions {
			if currentBadges[badgeID] {
				continue
			}

			verified, _ := verifyBadgeCondition(app, authRecord, badgeID, nil)
			if verified {
				newBadges = append(newBadges, badgeID)
				totalXP += badgeDef.XPReward

				// Log badge award
				if err := logBadgeAward(app, authRecord.Id, badgeID, badgeDef.Tier, badgeDef.XPReward, nil); err != nil {
					app.Logger().Error("Failed to log badge award", "error", err)
				}
			}
		}

		if len(newBadges) == 0 {
			return e.JSON(http.StatusOK, map[string]interface{}{
				"newBadges":     []string{},
				"totalXPEarned": 0,
			})
		}

		// Update user with new badges and XP
		badgeList := make([]string, 0, len(currentBadges)+len(newBadges))
		for b := range currentBadges {
			badgeList = append(badgeList, b)
		}
		badgeList = append(badgeList, newBadges...)

		currentXP := authRecord.GetInt("xp")
		newXP := currentXP + totalXP
		newLevel := calculateLevel(newXP)

		authRecord.Set("badges", badgeList)
		authRecord.Set("xp", newXP)
		authRecord.Set("level", newLevel)

		if err := app.Save(authRecord); err != nil {
			return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to save badges"})
		}

		// Log XP transaction for all badges at once
		if err := logXPTransaction(app, authRecord.Id, totalXP, "badges_earned", "", "badge", "", map[string]interface{}{"badges": newBadges}); err != nil {
			app.Logger().Error("Failed to log badges XP transaction", "error", err)
		}

		return e.JSON(http.StatusOK, map[string]interface{}{
			"newBadges":     newBadges,
			"totalXPEarned": totalXP,
			"newXP":         newXP,
			"newLevel":      newLevel,
			"totalBadges":   len(badgeList),
		})
	}).Bind(RequireAuth(app))

	// Get badge awards history
	se.Router.GET("/api/progress/badges", func(e *core.RequestEvent) error {
		authRecord := e.Auth
		if authRecord == nil {
			return e.JSON(http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
		}

		awards, err := app.FindRecordsByFilter(
			"badge_awards",
			"user = {:userId}",
			"-created",
			100,
			0,
			map[string]any{"userId": authRecord.Id},
		)

		if err != nil {
			// Collection might not exist yet, return empty
			return e.JSON(http.StatusOK, map[string]interface{}{
				"badges": []interface{}{},
			})
		}

		result := make([]map[string]interface{}, len(awards))
		for i, award := range awards {
			result[i] = map[string]interface{}{
				"badgeId":   award.GetString("badgeId"),
				"tier":      award.GetString("tier"),
				"xpAwarded": award.GetInt("xpAwarded"),
				"earnedAt":  award.GetDateTime("created").String(),
			}
		}

		return e.JSON(http.StatusOK, map[string]interface{}{
			"badges": result,
		})
	}).Bind(RequireAuth(app))

	// Update streak on daily login
	se.Router.POST("/api/progress/update-streak", func(e *core.RequestEvent) error {
		authRecord := e.Auth
		if authRecord == nil {
			return e.JSON(http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
		}

		// Get user progress record
		progressRecords, _ := app.FindRecordsByFilter(
			"user_progress",
			"user = {:userId}",
			"-updated",
			1,
			0,
			map[string]any{"userId": authRecord.Id},
		)

		today := time.Now().Format("2006-01-02")
		yesterday := time.Now().AddDate(0, 0, -1).Format("2006-01-02")

		var lastActiveDate string
		if len(progressRecords) > 0 {
			lastActiveDate = progressRecords[0].GetString("dailyChallengeDate")
		}

		// Already logged in today
		if lastActiveDate == today {
			return e.JSON(http.StatusOK, map[string]interface{}{
				"streak":   authRecord.GetInt("streak"),
				"xpEarned": 0,
				"newLogin": false,
			})
		}

		currentStreak := authRecord.GetInt("streak")
		longestStreak := authRecord.GetInt("longestStreak")
		var newStreak int
		xpEarned := 50 // Daily login XP

		if lastActiveDate == yesterday {
			newStreak = currentStreak + 1
			// Streak milestones
			if newStreak == 7 {
				xpEarned += 300
			} else if newStreak == 14 {
				xpEarned += 500
			} else if newStreak == 30 {
				xpEarned += 1000
			}
		} else {
			newStreak = 1
		}

		if newStreak > longestStreak {
			longestStreak = newStreak
		}

		currentXP := authRecord.GetInt("xp")
		newXP := currentXP + xpEarned
		newLevel := calculateLevel(newXP)

		authRecord.Set("streak", newStreak)
		authRecord.Set("longestStreak", longestStreak)
		authRecord.Set("xp", newXP)
		authRecord.Set("level", newLevel)

		if err := app.Save(authRecord); err != nil {
			return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to update streak"})
		}

		// Log XP transaction
		if err := logXPTransaction(app, authRecord.Id, xpEarned, "daily_login", "", "streak", "", map[string]interface{}{"streak": newStreak}); err != nil {
			app.Logger().Error("Failed to log streak XP transaction", "error", err)
		}

		return e.JSON(http.StatusOK, map[string]interface{}{
			"streak":        newStreak,
			"longestStreak": longestStreak,
			"xpEarned":      xpEarned,
			"newXP":         newXP,
			"newLevel":      newLevel,
			"newLogin":      true,
		})
	}).Bind(RequireAuth(app))
}

// logXPTransaction logs an XP transaction to the xp_transactions collection
func logXPTransaction(app core.App, userId string, amount int, reason, referenceId, referenceType, sessionId string, metadata map[string]interface{}) error {
	collection, err := app.FindCollectionByNameOrId("xp_transactions")
	if err != nil {
		return err // Collection might not exist yet
	}

	record := core.NewRecord(collection)
	record.Set("user", userId)
	record.Set("amount", amount)
	record.Set("reason", reason)
	if referenceId != "" {
		record.Set("referenceId", referenceId)
	}
	if referenceType != "" {
		record.Set("referenceType", referenceType)
	}
	if sessionId != "" {
		record.Set("sessionId", sessionId)
	}
	if metadata != nil {
		record.Set("metadata", metadata)
	}

	return app.Save(record)
}

// logBadgeAward logs a badge award to the badge_awards collection
func logBadgeAward(app core.App, userId, badgeId, tier string, xpAwarded int, verificationData map[string]interface{}) error {
	collection, err := app.FindCollectionByNameOrId("badge_awards")
	if err != nil {
		return err // Collection might not exist yet
	}

	record := core.NewRecord(collection)
	record.Set("user", userId)
	record.Set("badgeId", badgeId)
	record.Set("tier", tier)
	record.Set("xpAwarded", xpAwarded)
	if verificationData != nil {
		record.Set("verificationData", verificationData)
	}

	return app.Save(record)
}

// verifyBadgeCondition checks if a user meets the conditions for a badge
func verifyBadgeCondition(app core.App, authRecord *core.Record, badgeID string, verificationData map[string]interface{}) (bool, string) {
	questionsCompleted := authRecord.GetInt("questionsCompleted")
	questionsCorrect := authRecord.GetInt("questionsCorrect")
	streak := authRecord.GetInt("streak")

	// Get user progress for category stats
	progressRecords, _ := app.FindRecordsByFilter(
		"user_progress",
		"user = {:userId}",
		"-updated",
		1,
		0,
		map[string]any{"userId": authRecord.Id},
	)

	var categoryProgress map[string]interface{}
	var testHistory []interface{}
	var bestCorrectStreak int

	if len(progressRecords) > 0 {
		record := progressRecords[0]
		if cp := record.Get("categoryProgress"); cp != nil {
			categoryProgress, _ = cp.(map[string]interface{})
		}
		if th := record.Get("testHistory"); th != nil {
			testHistory, _ = th.([]interface{})
		}
		bestCorrectStreak = record.GetInt("bestCorrectStreak")
	}

	switch badgeID {
	case "first_steps":
		if questionsCompleted >= 1 {
			return true, ""
		}
		return false, "Complete at least 1 question"

	case "early_bird":
		hour := time.Now().Hour()
		if hour < 8 && questionsCompleted > 0 {
			return true, ""
		}
		return false, "Study before 8 AM"

	case "night_owl":
		hour := time.Now().Hour()
		if hour >= 22 && questionsCompleted > 0 {
			return true, ""
		}
		return false, "Study after 10 PM"

	case "quick_learner":
		if questionsCompleted >= 25 {
			return true, ""
		}
		return false, "Complete 25 questions"

	case "sign_master":
		if categoryProgress != nil {
			if signStats, ok := categoryProgress["Road Signs & Signals"].(map[string]interface{}); ok {
				total, _ := signStats["total"].(float64)
				correct, _ := signStats["correct"].(float64)
				if total >= 20 && correct/total >= 0.8 {
					return true, ""
				}
			}
		}
		return false, "80%+ accuracy on 20+ road sign questions"

	case "road_scholar":
		if questionsCompleted >= 100 {
			return true, ""
		}
		return false, "Complete 100 questions"

	case "sharpshooter":
		if bestCorrectStreak >= 10 {
			return true, ""
		}
		return false, "Get 10 correct answers in a row"

	case "speed_demon":
		for _, t := range testHistory {
			if test, ok := t.(map[string]interface{}); ok {
				passed, _ := test["passed"].(bool)
				timeSpent, _ := test["timeSpent"].(float64)
				if passed && timeSpent < 900 {
					return true, ""
				}
			}
		}
		return false, "Pass a test in under 15 minutes"

	case "consistent":
		if streak >= 7 {
			return true, ""
		}
		return false, "Maintain a 7-day streak"

	case "perfect_score":
		for _, t := range testHistory {
			if test, ok := t.(map[string]interface{}); ok {
				score, _ := test["score"].(float64)
				total, _ := test["totalQuestions"].(float64)
				if score == total && total > 0 {
					return true, ""
				}
			}
		}
		return false, "Score 100% on a test"

	case "category_champion":
		categories := []string{"Road Signs & Signals", "Rules of the Road", "Safe Driving & Vehicle Handling",
			"Alcohol/Drugs & Penalties", "Licensing & Documents", "Miscellaneous"}
		for _, cat := range categories {
			if categoryProgress != nil {
				if stats, ok := categoryProgress[cat].(map[string]interface{}); ok {
					total, _ := stats["total"].(float64)
					correct, _ := stats["correct"].(float64)
					if total < 10 || correct/total < 0.8 {
						return false, "Master all 6 categories (80%+ on 10+ questions each)"
					}
				} else {
					return false, "Master all 6 categories (80%+ on 10+ questions each)"
				}
			} else {
				return false, "Master all 6 categories (80%+ on 10+ questions each)"
			}
		}
		return true, ""

	case "dedicated_driver":
		if questionsCompleted >= 250 {
			return true, ""
		}
		return false, "Complete 250 questions"

	case "marathon_runner":
		if streak >= 14 {
			return true, ""
		}
		return false, "Maintain a 14-day streak"

	case "diamond_streak":
		if streak >= 30 {
			return true, ""
		}
		return false, "Maintain a 30-day streak"

	case "test_master":
		passedCount := 0
		for _, t := range testHistory {
			if test, ok := t.(map[string]interface{}); ok {
				if passed, _ := test["passed"].(bool); passed {
					passedCount++
				}
			}
		}
		if passedCount >= 10 {
			return true, ""
		}
		return false, "Pass 10 tests"

	case "perfectionist":
		perfectCount := 0
		for _, t := range testHistory {
			if test, ok := t.(map[string]interface{}); ok {
				score, _ := test["score"].(float64)
				total, _ := test["totalQuestions"].(float64)
				if score == total && total > 0 {
					perfectCount++
				}
			}
		}
		if perfectCount >= 3 {
			return true, ""
		}
		return false, "Get 3 perfect scores"

	case "g1_legend":
		if questionsCompleted >= 500 && questionsCorrect > 0 {
			accuracy := float64(questionsCorrect) / float64(questionsCompleted)
			if accuracy >= 0.9 {
				return true, ""
			}
		}
		return false, "Complete 500+ questions with 90%+ accuracy"
	}

	return false, "Unknown badge"
}

// parseInt helper to parse string to int
func parseInt(s string) int {
	var result int
	for _, c := range s {
		if c >= '0' && c <= '9' {
			result = result*10 + int(c-'0')
		}
	}
	return result
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
