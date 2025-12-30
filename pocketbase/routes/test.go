package routes

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

// Test session constants
const (
	MinTimePerQuestion = 2000           // 2 seconds minimum per question
	MaxTestDuration    = 60 * 60 * 1000 // 60 minutes max for a test
	MaxAnswersPerMin   = 30             // Max answers per minute (anti-bot)
	SuspiciousPerfect  = 10             // Flag if >10 perfect answers in a row under 3s each
)

// XP reward constants
const (
	XPQuestionComplete = 5
	XPCorrectAnswer    = 10
	XPTestComplete     = 25
	XPTestPass         = 50
	XPPerfectScore     = 100
	XPDifficultyBonus  = 5 // per difficulty level above 1
)

// TestStartRequest represents a test start request
type TestStartRequest struct {
	Category string `json:"category,omitempty"`
}

// TestStartResponse represents a test start response
type TestStartResponse struct {
	SessionID string              `json:"sessionId"`
	Questions []QuestionForClient `json:"questions"`
	Count     int                 `json:"count"`
	TimeLimit int                 `json:"timeLimit"` // milliseconds
}

// TestAnswerRequest represents an answer submission
type TestAnswerRequest struct {
	SessionID      string `json:"sessionId"`
	QuestionID     string `json:"questionId"`
	QuestionIndex  int    `json:"questionIndex"`
	SelectedAnswer int    `json:"selectedAnswer"`
	TimeSpent      int    `json:"timeSpent"` // milliseconds
}

// TestAnswerResponse represents an answer validation response
type TestAnswerResponse struct {
	Correct       bool   `json:"correct"`
	CorrectAnswer int    `json:"correctAnswer"`
	Explanation   string `json:"explanation"`
	XPEarned      int    `json:"xpEarned"`
	Flagged       bool   `json:"flagged,omitempty"` // If answer was flagged for suspicious timing
}

// TestCompleteRequest represents a test completion request
type TestCompleteRequest struct {
	SessionID string `json:"sessionId"`
}

// TestCompleteResponse represents the test results
type TestCompleteResponse struct {
	Score             int                      `json:"score"`
	TotalQuestions    int                      `json:"totalQuestions"`
	Passed            bool                     `json:"passed"`
	TimeSpent         int                      `json:"timeSpent"` // seconds
	XPEarned          int                      `json:"xpEarned"`
	CategoryBreakdown map[string]CategoryScore `json:"categoryBreakdown"`
	Flagged           bool                     `json:"flagged,omitempty"`
	FlagReason        string                   `json:"flagReason,omitempty"`
}

// CategoryScore represents score breakdown per category
type CategoryScore struct {
	Correct int `json:"correct"`
	Total   int `json:"total"`
}

// SessionAnswer stores answer data for a question
type SessionAnswer struct {
	QuestionID     string `json:"questionId"`
	SelectedAnswer int    `json:"selectedAnswer"`
	CorrectAnswer  int    `json:"correctAnswer"`
	TimeSpent      int    `json:"timeSpent"`
	Correct        bool   `json:"correct"`
	XPEarned       int    `json:"xpEarned"`
	AnsweredAt     string `json:"answeredAt"`
}

// RegisterTestRoutes registers test session API routes
func RegisterTestRoutes(app core.App, se *core.ServeEvent) {
	// Start a new test session
	se.Router.POST("/api/test/start", func(e *core.RequestEvent) error {
		return handleTestStart(app, e)
	}).Bind(apis.RequireAuth())

	// Submit an answer during a test
	se.Router.POST("/api/test/answer", func(e *core.RequestEvent) error {
		return handleTestAnswer(app, e)
	}).Bind(apis.RequireAuth())

	// Complete a test and get results
	se.Router.POST("/api/test/complete", func(e *core.RequestEvent) error {
		return handleTestComplete(app, e)
	}).Bind(apis.RequireAuth())

	// Get test results by session ID
	se.Router.GET("/api/test/results/{sessionId}", func(e *core.RequestEvent) error {
		return handleGetTestResults(app, e)
	}).Bind(apis.RequireAuth())
}

func handleTestStart(app core.App, e *core.RequestEvent) error {
	authRecord := e.Auth
	if authRecord == nil {
		return e.JSON(http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
	}

	var req TestStartRequest
	e.BindBody(&req) // Optional category

	// Check for existing active session
	sessionCollection, err := app.FindCollectionByNameOrId("question_sessions")
	if err != nil {
		return e.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Test sessions not available",
		})
	}

	// Abandon any existing active sessions for this user
	existingSessions, _ := app.FindRecordsByFilter(
		sessionCollection.Id,
		"user = {:userId} && status = 'active'",
		"", 0, 0,
		map[string]interface{}{"userId": authRecord.Id},
	)
	for _, s := range existingSessions {
		s.Set("status", "abandoned")
		app.Save(s)
	}

	// Get questions
	isPremium := authRecord.GetBool("isPremium")
	questionCollection, err := app.FindCollectionByNameOrId("questions")
	if err != nil {
		return e.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Questions not available",
		})
	}

	// Build filter
	filter := ""
	filterParams := map[string]interface{}{}
	if req.Category != "" {
		filter = "category = {:category}"
		filterParams["category"] = req.Category
	}
	if !isPremium {
		if filter != "" {
			filter += " && "
		}
		filter += "isPremium = false"
	}

	var records []*core.Record
	if filter != "" {
		records, err = app.FindRecordsByFilter(questionCollection.Id, filter, "", 0, 0, filterParams)
	} else {
		records, err = app.FindAllRecords(questionCollection)
	}

	if err != nil {
		return e.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Failed to fetch questions",
		})
	}

	// Shuffle and select 40 questions
	shuffleRecords(records)
	testSize := 40
	if len(records) < testSize {
		testSize = len(records)
	}
	records = records[:testSize]

	// Convert to client format and collect IDs
	questions := make([]QuestionForClient, 0, len(records))
	questionIds := make([]string, 0, len(records))
	for _, record := range records {
		q, err := recordToQuestionForClient(record)
		if err != nil {
			continue
		}
		questions = append(questions, q)
		questionIds = append(questionIds, record.Id)
	}

	// Create session
	session := core.NewRecord(sessionCollection)
	session.Set("user", authRecord.Id)
	session.Set("sessionType", "test")
	questionIdsJSON, _ := json.Marshal(questionIds)
	session.Set("questionIds", string(questionIdsJSON))
	session.Set("currentIndex", 0)
	session.Set("answers", "[]")
	session.Set("status", "active")
	session.Set("startedAt", time.Now().UTC().Format(time.RFC3339))
	if req.Category != "" {
		session.Set("category", req.Category)
	}

	if err := app.Save(session); err != nil {
		return e.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Failed to create test session",
		})
	}

	return e.JSON(http.StatusOK, TestStartResponse{
		SessionID: session.Id,
		Questions: questions,
		Count:     len(questions),
		TimeLimit: MaxTestDuration,
	})
}

func handleTestAnswer(app core.App, e *core.RequestEvent) error {
	authRecord := e.Auth
	if authRecord == nil {
		return e.JSON(http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
	}

	var req TestAnswerRequest
	if err := e.BindBody(&req); err != nil {
		return e.JSON(http.StatusBadRequest, map[string]string{
			"error": "Invalid request body",
		})
	}

	// Find the session
	session, err := app.FindRecordById("question_sessions", req.SessionID)
	if err != nil {
		return e.JSON(http.StatusNotFound, map[string]string{
			"error": "Test session not found",
		})
	}

	// Verify session belongs to user
	if session.GetString("user") != authRecord.Id {
		return e.JSON(http.StatusForbidden, map[string]string{
			"error": "Session does not belong to user",
		})
	}

	// Check session status
	if session.GetString("status") != "active" {
		return e.JSON(http.StatusBadRequest, map[string]string{
			"error": "Test session is not active",
		})
	}

	// Check if test has timed out
	startedAt, _ := time.Parse(time.RFC3339, session.GetString("startedAt"))
	if time.Since(startedAt).Milliseconds() > MaxTestDuration {
		session.Set("status", "timeout")
		app.Save(session)
		return e.JSON(http.StatusBadRequest, map[string]string{
			"error": "Test session has timed out",
		})
	}

	// Verify question is in the session
	var questionIds []string
	json.Unmarshal([]byte(session.GetString("questionIds")), &questionIds)

	questionInSession := false
	for _, qid := range questionIds {
		if qid == req.QuestionID {
			questionInSession = true
			break
		}
	}
	if !questionInSession {
		return e.JSON(http.StatusBadRequest, map[string]string{
			"error": "Question not in this test session",
		})
	}

	// Get existing answers
	var answers []SessionAnswer
	json.Unmarshal([]byte(session.GetString("answers")), &answers)

	// Check if already answered
	for _, a := range answers {
		if a.QuestionID == req.QuestionID {
			return e.JSON(http.StatusBadRequest, map[string]string{
				"error": "Question already answered",
			})
		}
	}

	// Anti-cheat: Check answer rate
	recentAnswers := 0
	oneMinuteAgo := time.Now().Add(-1 * time.Minute)
	for _, a := range answers {
		answeredAt, _ := time.Parse(time.RFC3339, a.AnsweredAt)
		if answeredAt.After(oneMinuteAgo) {
			recentAnswers++
		}
	}
	if recentAnswers >= MaxAnswersPerMin {
		return e.JSON(http.StatusTooManyRequests, map[string]string{
			"error": "Too many answers submitted. Please slow down.",
		})
	}

	// Get the question
	questionRecord, err := app.FindRecordById("questions", req.QuestionID)
	if err != nil {
		return e.JSON(http.StatusNotFound, map[string]string{
			"error": "Question not found",
		})
	}

	question, err := recordToQuestion(questionRecord)
	if err != nil {
		return e.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Failed to process question",
		})
	}

	// Validate the answer
	correct := req.SelectedAnswer == question.CorrectAnswer

	// Calculate XP with anti-cheat validation
	xpEarned := 0
	flagged := false

	if req.TimeSpent >= MinTimePerQuestion {
		xpEarned = XPQuestionComplete
		if correct {
			xpEarned += XPCorrectAnswer
			// Difficulty bonus
			if question.Difficulty > 1 {
				xpEarned += (question.Difficulty - 1) * XPDifficultyBonus
			}
		}
	} else {
		// Suspicious timing - flag but don't award XP
		flagged = true
	}

	// Record the answer
	answer := SessionAnswer{
		QuestionID:     req.QuestionID,
		SelectedAnswer: req.SelectedAnswer,
		CorrectAnswer:  question.CorrectAnswer,
		TimeSpent:      req.TimeSpent,
		Correct:        correct,
		XPEarned:       xpEarned,
		AnsweredAt:     time.Now().UTC().Format(time.RFC3339),
	}
	answers = append(answers, answer)

	// Update session
	answersJSON, _ := json.Marshal(answers)
	session.Set("answers", string(answersJSON))
	session.Set("currentIndex", len(answers))
	if err := app.Save(session); err != nil {
		return e.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Failed to save answer",
		})
	}

	return e.JSON(http.StatusOK, TestAnswerResponse{
		Correct:       correct,
		CorrectAnswer: question.CorrectAnswer,
		Explanation:   question.Explanation,
		XPEarned:      xpEarned,
		Flagged:       flagged,
	})
}

func handleTestComplete(app core.App, e *core.RequestEvent) error {
	authRecord := e.Auth
	if authRecord == nil {
		return e.JSON(http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
	}

	var req TestCompleteRequest
	if err := e.BindBody(&req); err != nil {
		return e.JSON(http.StatusBadRequest, map[string]string{
			"error": "Invalid request body",
		})
	}

	// Find the session
	session, err := app.FindRecordById("question_sessions", req.SessionID)
	if err != nil {
		return e.JSON(http.StatusNotFound, map[string]string{
			"error": "Test session not found",
		})
	}

	// Verify session belongs to user
	if session.GetString("user") != authRecord.Id {
		return e.JSON(http.StatusForbidden, map[string]string{
			"error": "Session does not belong to user",
		})
	}

	// Check if already completed
	if session.GetString("status") == "completed" {
		// Return cached results
		return returnCachedResults(session, e)
	}

	// Get answers
	var answers []SessionAnswer
	json.Unmarshal([]byte(session.GetString("answers")), &answers)

	// Get question IDs for category lookup
	var questionIds []string
	json.Unmarshal([]byte(session.GetString("questionIds")), &questionIds)

	// Calculate results
	score := 0
	totalXP := 0
	categoryBreakdown := make(map[string]CategoryScore)
	fastCorrectStreak := 0
	flagged := false
	flagReason := ""

	// Get question records for category info
	questionRecords := make(map[string]*core.Record)
	for _, qid := range questionIds {
		record, err := app.FindRecordById("questions", qid)
		if err == nil {
			questionRecords[qid] = record
		}
	}

	for _, answer := range answers {
		if answer.Correct {
			score++
		}
		totalXP += answer.XPEarned

		// Get category from question record
		if record, ok := questionRecords[answer.QuestionID]; ok {
			category := record.GetString("category")
			cs := categoryBreakdown[category]
			cs.Total++
			if answer.Correct {
				cs.Correct++
			}
			categoryBreakdown[category] = cs
		}

		// Anti-cheat: Check for suspicious patterns
		if answer.Correct && answer.TimeSpent < 3000 {
			fastCorrectStreak++
			if fastCorrectStreak >= SuspiciousPerfect {
				flagged = true
				flagReason = "Unusual answer pattern detected"
			}
		} else {
			fastCorrectStreak = 0
		}
	}

	// Fill in missing categories (unanswered questions)
	for _, qid := range questionIds {
		answered := false
		for _, a := range answers {
			if a.QuestionID == qid {
				answered = true
				break
			}
		}
		if !answered {
			if record, ok := questionRecords[qid]; ok {
				category := record.GetString("category")
				cs := categoryBreakdown[category]
				cs.Total++
				categoryBreakdown[category] = cs
			}
		}
	}

	totalQuestions := len(questionIds)
	passed := float64(score)/float64(totalQuestions) >= 0.8 // 80% pass rate

	// Calculate time spent
	startedAt, _ := time.Parse(time.RFC3339, session.GetString("startedAt"))
	timeSpent := int(time.Since(startedAt).Seconds())

	// Add completion bonuses
	totalXP += XPTestComplete
	if passed {
		totalXP += XPTestPass
	}
	if score == totalQuestions {
		totalXP += XPPerfectScore
	}

	// If flagged, reduce XP
	if flagged {
		totalXP = totalXP / 2 // 50% XP penalty for suspicious activity
	}

	// Update user XP (server-authoritative)
	if !flagged || totalXP > 0 {
		currentXP := authRecord.GetInt("xp")
		authRecord.Set("xp", currentXP+totalXP)

		// Update stats
		questionsCompleted := authRecord.GetInt("questionsCompleted")
		authRecord.Set("questionsCompleted", questionsCompleted+len(answers))

		questionsCorrect := authRecord.GetInt("questionsCorrect")
		authRecord.Set("questionsCorrect", questionsCorrect+score)

		if err := app.Save(authRecord); err != nil {
			app.Logger().Error("Failed to update user XP", "error", err)
		}
	}

	// Mark session as completed
	session.Set("status", "completed")
	session.Set("completedAt", time.Now().UTC().Format(time.RFC3339))

	// Store results in session for caching
	results := TestCompleteResponse{
		Score:             score,
		TotalQuestions:    totalQuestions,
		Passed:            passed,
		TimeSpent:         timeSpent,
		XPEarned:          totalXP,
		CategoryBreakdown: categoryBreakdown,
		Flagged:           flagged,
		FlagReason:        flagReason,
	}
	resultsJSON, _ := json.Marshal(results)
	session.Set("results", string(resultsJSON))

	if err := app.Save(session); err != nil {
		return e.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Failed to complete test",
		})
	}

	return e.JSON(http.StatusOK, results)
}

func handleGetTestResults(app core.App, e *core.RequestEvent) error {
	authRecord := e.Auth
	if authRecord == nil {
		return e.JSON(http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
	}

	sessionId := e.Request.PathValue("sessionId")
	if sessionId == "" {
		return e.JSON(http.StatusBadRequest, map[string]string{
			"error": "Session ID required",
		})
	}

	session, err := app.FindRecordById("question_sessions", sessionId)
	if err != nil {
		return e.JSON(http.StatusNotFound, map[string]string{
			"error": "Test session not found",
		})
	}

	// Verify session belongs to user
	if session.GetString("user") != authRecord.Id {
		return e.JSON(http.StatusForbidden, map[string]string{
			"error": "Session does not belong to user",
		})
	}

	if session.GetString("status") != "completed" {
		return e.JSON(http.StatusBadRequest, map[string]string{
			"error": "Test not completed yet",
		})
	}

	return returnCachedResults(session, e)
}

func returnCachedResults(session *core.Record, e *core.RequestEvent) error {
	resultsStr := session.GetString("results")
	if resultsStr == "" {
		return e.JSON(http.StatusNotFound, map[string]string{
			"error": "Results not available",
		})
	}

	var results TestCompleteResponse
	if err := json.Unmarshal([]byte(resultsStr), &results); err != nil {
		return e.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Failed to parse results",
		})
	}

	return e.JSON(http.StatusOK, results)
}

// Helper function to shuffle records
func shuffleRecords(records []*core.Record) {
	for i := len(records) - 1; i > 0; i-- {
		j := int(time.Now().UnixNano()) % (i + 1)
		records[i], records[j] = records[j], records[i]
	}
}
