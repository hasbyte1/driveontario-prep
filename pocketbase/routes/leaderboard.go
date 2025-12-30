package routes

import (
	"net/http"
	"strconv"
	"time"

	"github.com/pocketbase/pocketbase/core"
)

// LeaderboardEntry represents a single entry in the leaderboard
type LeaderboardEntry struct {
	ID            string `json:"id"`
	Rank          int    `json:"rank"`
	Name          string `json:"name"`
	Avatar        string `json:"avatar,omitempty"`
	XP            int    `json:"xp"`
	Level         int    `json:"level"`
	Streak        int    `json:"streak"`
	Badges        int    `json:"badges"`
	IsCurrentUser bool   `json:"isCurrentUser,omitempty"`
}

// LeaderboardResponse represents the leaderboard API response
type LeaderboardResponse struct {
	Entries    []LeaderboardEntry `json:"entries"`
	UserRank   int                `json:"userRank,omitempty"`
	TotalUsers int                `json:"totalUsers"`
	Period     string             `json:"period"`
}

// RegisterLeaderboardRoutes registers all leaderboard-related API routes
func RegisterLeaderboardRoutes(app core.App, se *core.ServeEvent) {
	// Get leaderboard
	se.Router.GET("/api/leaderboard", func(e *core.RequestEvent) error {
		period := e.Request.URL.Query().Get("period")
		if period == "" {
			period = "weekly"
		}

		limitStr := e.Request.URL.Query().Get("limit")
		limit := 20
		if limitStr != "" {
			if l, err := strconv.Atoi(limitStr); err == nil && l > 0 && l <= 100 {
				limit = l
			}
		}

		// Get current user ID if authenticated
		var currentUserID string
		if e.Auth != nil {
			currentUserID = e.Auth.Id
		}

		// Build query based on period
		var filter string
		filterParams := map[string]any{}

		if period == "weekly" {
			// Get start of current week (Monday)
			now := time.Now()
			weekday := int(now.Weekday())
			if weekday == 0 {
				weekday = 7 // Sunday is 7
			}
			startOfWeek := now.AddDate(0, 0, -(weekday - 1))
			startOfWeek = time.Date(startOfWeek.Year(), startOfWeek.Month(), startOfWeek.Day(), 0, 0, 0, 0, startOfWeek.Location())

			filter = "updated >= {:startOfWeek}"
			filterParams["startOfWeek"] = startOfWeek
		}

		// Get users sorted by XP
		var records []*core.Record
		var err error

		if filter != "" {
			records, err = app.FindRecordsByFilter(
				"users",
				filter,
				"-xp",
				limit,
				0,
				filterParams,
			)
		} else {
			records, err = app.FindRecordsByFilter(
				"users",
				"xp > 0",
				"-xp",
				limit,
				0,
				nil,
			)
		}

		if err != nil {
			return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to fetch leaderboard"})
		}

		// Get total user count
		totalRecords, _ := app.FindRecordsByFilter("users", "xp > 0", "", 0, 0, nil)
		totalUsers := len(totalRecords)

		// Build response
		entries := make([]LeaderboardEntry, len(records))
		var userRank int

		for i, record := range records {
			badges := record.Get("badges")
			badgeCount := 0
			if badges != nil {
				if badgeSlice, ok := badges.([]interface{}); ok {
					badgeCount = len(badgeSlice)
				}
			}

			isCurrentUser := record.Id == currentUserID
			if isCurrentUser {
				userRank = i + 1
			}

			entries[i] = LeaderboardEntry{
				ID:            record.Id,
				Rank:          i + 1,
				Name:          record.GetString("name"),
				Avatar:        record.GetString("avatar"),
				XP:            record.GetInt("xp"),
				Level:         record.GetInt("level"),
				Streak:        record.GetInt("streak"),
				Badges:        badgeCount,
				IsCurrentUser: isCurrentUser,
			}
		}

		// If user not in top results, find their rank
		if currentUserID != "" && userRank == 0 {
			// Count users with more XP
			currentUser, err := app.FindRecordById("users", currentUserID)
			if err == nil {
				userXP := currentUser.GetInt("xp")
				higherRanked, _ := app.FindRecordsByFilter(
					"users",
					"xp > {:userXp}",
					"",
					0,
					0,
					map[string]any{"userXp": userXP},
				)
				userRank = len(higherRanked) + 1
			}
		}

		return e.JSON(http.StatusOK, LeaderboardResponse{
			Entries:    entries,
			UserRank:   userRank,
			TotalUsers: totalUsers,
			Period:     period,
		})
	})

	// Get user's rank
	se.Router.GET("/api/leaderboard/rank/{userId}", func(e *core.RequestEvent) error {
		userID := e.Request.PathValue("userId")
		period := e.Request.URL.Query().Get("period")
		if period == "" {
			period = "allTime"
		}

		user, err := app.FindRecordById("users", userID)
		if err != nil {
			return e.JSON(http.StatusNotFound, map[string]string{"error": "User not found"})
		}

		userXP := user.GetInt("xp")

		// Count users with more XP
		var filter string
		filterParams := map[string]any{"userXp": userXP}

		if period == "weekly" {
			now := time.Now()
			weekday := int(now.Weekday())
			if weekday == 0 {
				weekday = 7
			}
			startOfWeek := now.AddDate(0, 0, -(weekday - 1))
			startOfWeek = time.Date(startOfWeek.Year(), startOfWeek.Month(), startOfWeek.Day(), 0, 0, 0, 0, startOfWeek.Location())

			filter = "xp > {:userXp} && updated >= {:startOfWeek}"
			filterParams["startOfWeek"] = startOfWeek
		} else {
			filter = "xp > {:userXp}"
		}

		higherRanked, err := app.FindRecordsByFilter(
			"users",
			filter,
			"",
			0,
			0,
			filterParams,
		)

		if err != nil {
			return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to calculate rank"})
		}

		rank := len(higherRanked) + 1

		return e.JSON(http.StatusOK, map[string]int{"rank": rank})
	})

	// Get users near current user
	se.Router.GET("/api/leaderboard/nearby/{userId}", func(e *core.RequestEvent) error {
		userID := e.Request.PathValue("userId")
		period := e.Request.URL.Query().Get("period")
		if period == "" {
			period = "allTime"
		}

		rangeStr := e.Request.URL.Query().Get("range")
		rangeSize := 2
		if rangeStr != "" {
			if r, err := strconv.Atoi(rangeStr); err == nil && r > 0 && r <= 10 {
				rangeSize = r
			}
		}

		user, err := app.FindRecordById("users", userID)
		if err != nil {
			return e.JSON(http.StatusNotFound, map[string]string{"error": "User not found"})
		}

		userXP := user.GetInt("xp")

		// Get users above
		aboveUsers, _ := app.FindRecordsByFilter(
			"users",
			"xp > {:userXp}",
			"xp", // ascending to get closest above
			rangeSize,
			0,
			map[string]any{"userXp": userXP},
		)

		// Get users below
		belowUsers, _ := app.FindRecordsByFilter(
			"users",
			"xp < {:userXp}",
			"-xp", // descending to get closest below
			rangeSize,
			0,
			map[string]any{"userXp": userXP},
		)

		// Calculate ranks
		allHigher, _ := app.FindRecordsByFilter(
			"users",
			"xp > {:userXp}",
			"",
			0,
			0,
			map[string]any{"userXp": userXP},
		)
		userRank := len(allHigher) + 1

		// Build response
		entries := []LeaderboardEntry{}

		// Add users above (in reverse order)
		for i := len(aboveUsers) - 1; i >= 0; i-- {
			record := aboveUsers[i]
			badges := record.Get("badges")
			badgeCount := 0
			if badges != nil {
				if badgeSlice, ok := badges.([]interface{}); ok {
					badgeCount = len(badgeSlice)
				}
			}

			entries = append(entries, LeaderboardEntry{
				ID:     record.Id,
				Rank:   userRank - (i + 1),
				Name:   record.GetString("name"),
				Avatar: record.GetString("avatar"),
				XP:     record.GetInt("xp"),
				Level:  record.GetInt("level"),
				Streak: record.GetInt("streak"),
				Badges: badgeCount,
			})
		}

		// Add current user
		badges := user.Get("badges")
		badgeCount := 0
		if badges != nil {
			if badgeSlice, ok := badges.([]interface{}); ok {
				badgeCount = len(badgeSlice)
			}
		}
		entries = append(entries, LeaderboardEntry{
			ID:            user.Id,
			Rank:          userRank,
			Name:          user.GetString("name"),
			Avatar:        user.GetString("avatar"),
			XP:            user.GetInt("xp"),
			Level:         user.GetInt("level"),
			Streak:        user.GetInt("streak"),
			Badges:        badgeCount,
			IsCurrentUser: true,
		})

		// Add users below
		for i, record := range belowUsers {
			badges := record.Get("badges")
			badgeCount := 0
			if badges != nil {
				if badgeSlice, ok := badges.([]interface{}); ok {
					badgeCount = len(badgeSlice)
				}
			}

			entries = append(entries, LeaderboardEntry{
				ID:     record.Id,
				Rank:   userRank + i + 1,
				Name:   record.GetString("name"),
				Avatar: record.GetString("avatar"),
				XP:     record.GetInt("xp"),
				Level:  record.GetInt("level"),
				Streak: record.GetInt("streak"),
				Badges: badgeCount,
			})
		}

		return e.JSON(http.StatusOK, entries)
	})
}
