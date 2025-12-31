package routes

import (
	"encoding/json"
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"driveprep/services"

	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

// Question represents a question from the database
type Question struct {
	ID            string   `json:"id"`
	Question      string   `json:"question"`
	Options       []string `json:"options"`
	CorrectAnswer int      `json:"correctAnswer"`
	Explanation   string   `json:"explanation"`
	Category      string   `json:"category"`
	ImageUrl      string   `json:"imageUrl,omitempty"`
	IsPremium     bool     `json:"isPremium"`
	Difficulty    int      `json:"difficulty"`
}

// QuestionForClient represents a question sent to the client (without correct answer)
type QuestionForClient struct {
	ID         string   `json:"id"`
	Question   string   `json:"question"`
	Options    []string `json:"options"`
	Category   string   `json:"category"`
	ImageUrl   string   `json:"imageUrl,omitempty"`
	IsPremium  bool     `json:"isPremium"`
	Difficulty int      `json:"difficulty"`
}

// CategoryCount represents category statistics
type CategoryCount struct {
	Category string `json:"category"`
	Count    int    `json:"count"`
	Premium  int    `json:"premium"`
}

// ValidateRequest represents an answer validation request
type ValidateRequest struct {
	QuestionID     string `json:"questionId"`
	SelectedAnswer int    `json:"selectedAnswer"`
	TimeSpent      int    `json:"timeSpent"` // milliseconds
}

// ValidateResponse represents an answer validation response
type ValidateResponse struct {
	Correct       bool   `json:"correct"`
	CorrectAnswer int    `json:"correctAnswer"`
	Explanation   string `json:"explanation"`
	XPEarned      int    `json:"xpEarned"`
}

var encryption *services.Encryption

func initEncryption() error {
	var err error
	encryption, err = services.NewEncryption()
	return err
}

// RegisterQuestionRoutes registers all question-related API routes
func RegisterQuestionRoutes(app core.App, se *core.ServeEvent) {
	// Initialize encryption service
	if err := initEncryption(); err != nil {
		app.Logger().Error("Failed to initialize encryption", "error", err)
	}

	// Public: Get category counts
	se.Router.GET("/api/questions/categories", func(e *core.RequestEvent) error {
		return handleGetCategories(app, e)
	})

	// Auth required: Get practice questions
	se.Router.GET("/api/questions/practice", func(e *core.RequestEvent) error {
		return handleGetPracticeQuestions(app, e)
	}).Bind(apis.RequireAuth())

	// Auth required: Get test questions (40 random questions)
	se.Router.GET("/api/questions/test", func(e *core.RequestEvent) error {
		return handleGetTestQuestions(app, e)
	}).Bind(apis.RequireAuth())

	// Auth required: Validate answer
	se.Router.POST("/api/questions/validate", func(e *core.RequestEvent) error {
		return handleValidateAnswer(app, e)
	}).Bind(apis.RequireAuth())

	// Auth required: Get single question by ID (for review)
	se.Router.GET("/api/questions/{id}", func(e *core.RequestEvent) error {
		return handleGetQuestion(app, e)
	}).Bind(apis.RequireAuth())
}

func handleGetCategories(app core.App, e *core.RequestEvent) error {
	collection, err := app.FindCollectionByNameOrId("questions")
	if err != nil {
		return e.JSON(http.StatusOK, map[string]interface{}{
			"categories": []CategoryCount{},
			"total":      0,
		})
	}

	// Get all questions and count by category
	records, err := app.FindAllRecords(collection)
	if err != nil {
		return e.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Failed to fetch questions",
		})
	}

	categoryMap := make(map[string]*CategoryCount)
	for _, record := range records {
		category := record.GetString("category")
		isPremium := record.GetBool("isPremium")

		if _, exists := categoryMap[category]; !exists {
			categoryMap[category] = &CategoryCount{Category: category}
		}
		categoryMap[category].Count++
		if isPremium {
			categoryMap[category].Premium++
		}
	}

	categories := make([]CategoryCount, 0, len(categoryMap))
	for _, cc := range categoryMap {
		categories = append(categories, *cc)
	}

	return e.JSON(http.StatusOK, map[string]interface{}{
		"categories": categories,
		"total":      len(records),
	})
}

func handleGetPracticeQuestions(app core.App, e *core.RequestEvent) error {
	authRecord := e.Auth
	if authRecord == nil {
		return e.JSON(http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
	}

	// Get query parameters
	category := e.Request.URL.Query().Get("category")
	limitStr := e.Request.URL.Query().Get("limit")
	limit := 20 // default
	if limitStr != "" {
		if l, err := strconv.Atoi(limitStr); err == nil && l > 0 && l <= 50 {
			limit = l
		}
	}

	// Check if user is premium
	isPremium := authRecord.GetBool("isPremium")

	collection, err := app.FindCollectionByNameOrId("questions")
	if err != nil {
		return e.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Questions not available",
		})
	}

	// Build filter
	filter := ""
	if category != "" {
		filter = "category = {:category}"
	}
	if !isPremium {
		if filter != "" {
			filter += " && "
		}
		filter += "isPremium = false"
	}

	var records []*core.Record
	if filter != "" {
		records, err = app.FindRecordsByFilter(collection.Id, filter, "", limit*2, 0,
			map[string]interface{}{"category": category})
	} else {
		records, err = app.FindAllRecords(collection)
	}

	if err != nil {
		return e.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Failed to fetch questions",
		})
	}

	// Shuffle and limit
	rand.Shuffle(len(records), func(i, j int) {
		records[i], records[j] = records[j], records[i]
	})
	if len(records) > limit {
		records = records[:limit]
	}

	// Convert to client format (without correct answers)
	questions := make([]QuestionForClient, 0, len(records))
	for _, record := range records {
		q, err := recordToQuestionForClient(record)
		if err != nil {
			continue
		}
		questions = append(questions, q)
	}

	return e.JSON(http.StatusOK, map[string]interface{}{
		"questions": questions,
		"count":     len(questions),
	})
}

func handleGetTestQuestions(app core.App, e *core.RequestEvent) error {
	authRecord := e.Auth
	if authRecord == nil {
		return e.JSON(http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
	}

	// Check if user is premium
	isPremium := authRecord.GetBool("isPremium")

	collection, err := app.FindCollectionByNameOrId("questions")
	if err != nil {
		return e.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Questions not available",
		})
	}

	// Get questions (exclude premium for free users)
	filter := ""
	if !isPremium {
		filter = "isPremium = false"
	}

	var records []*core.Record
	if filter != "" {
		records, err = app.FindRecordsByFilter(collection.Id, filter, "", 0, 0, nil)
	} else {
		records, err = app.FindAllRecords(collection)
	}

	if err != nil {
		return e.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Failed to fetch questions",
		})
	}

	// Shuffle and select 40 questions (like the real G1 test)
	rand.Shuffle(len(records), func(i, j int) {
		records[i], records[j] = records[j], records[i]
	})
	testSize := 40
	if len(records) < testSize {
		testSize = len(records)
	}
	records = records[:testSize]

	// Convert to client format
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

	// Create a session to track this test
	sessionCollection, err := app.FindCollectionByNameOrId("question_sessions")
	if err == nil {
		session := core.NewRecord(sessionCollection)
		session.Set("user", authRecord.Id)
		session.Set("sessionType", "test")
		questionIdsJSON, _ := json.Marshal(questionIds)
		session.Set("questionIds", string(questionIdsJSON))
		session.Set("currentIndex", 0)
		session.Set("answers", "{}")
		session.Set("status", "active")
		session.Set("startedAt", time.Now().UTC().Format(time.RFC3339))
		app.Save(session)

		return e.JSON(http.StatusOK, map[string]interface{}{
			"questions": questions,
			"sessionId": session.Id,
			"count":     len(questions),
		})
	}

	return e.JSON(http.StatusOK, map[string]interface{}{
		"questions": questions,
		"count":     len(questions),
	})
}

func handleValidateAnswer(app core.App, e *core.RequestEvent) error {
	authRecord := e.Auth
	if authRecord == nil {
		return e.JSON(http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
	}

	var req ValidateRequest
	if err := e.BindBody(&req); err != nil {
		return e.JSON(http.StatusBadRequest, map[string]string{
			"error": "Invalid request body",
		})
	}

	// Find the question
	record, err := app.FindRecordById("questions", req.QuestionID)
	if err != nil {
		return e.JSON(http.StatusNotFound, map[string]string{
			"error": "Question not found",
		})
	}

	// Decrypt and get the correct answer
	question, err := recordToQuestion(record)
	if err != nil {
		return e.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Failed to process question",
		})
	}

	// Check if premium question and user is not premium
	if question.IsPremium && !authRecord.GetBool("isPremium") {
		return e.JSON(http.StatusForbidden, map[string]string{
			"error": "Premium question - upgrade required",
		})
	}

	// Validate the answer
	correct := req.SelectedAnswer == question.CorrectAnswer

	// Calculate XP earned (only if correct and reasonable time spent)
	xpEarned := 0
	if correct {
		// Minimum 2 seconds per question to prevent cheating
		if req.TimeSpent >= 2000 {
			xpEarned = 10 // Base XP for correct answer
			// Bonus for difficulty
			xpEarned += (question.Difficulty - 1) * 5
		}
	}

	// TODO: Update user XP in Phase 4 (Progress Authority)

	return e.JSON(http.StatusOK, ValidateResponse{
		Correct:       correct,
		CorrectAnswer: question.CorrectAnswer,
		Explanation:   question.Explanation,
		XPEarned:      xpEarned,
	})
}

func handleGetQuestion(app core.App, e *core.RequestEvent) error {
	authRecord := e.Auth
	if authRecord == nil {
		return e.JSON(http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
	}

	questionId := e.Request.PathValue("id")
	if questionId == "" {
		return e.JSON(http.StatusBadRequest, map[string]string{
			"error": "Question ID required",
		})
	}

	record, err := app.FindRecordById("questions", questionId)
	if err != nil {
		return e.JSON(http.StatusNotFound, map[string]string{
			"error": "Question not found",
		})
	}

	// Check premium access
	if record.GetBool("isPremium") && !authRecord.GetBool("isPremium") {
		return e.JSON(http.StatusForbidden, map[string]string{
			"error": "Premium question - upgrade required",
		})
	}

	q, err := recordToQuestionForClient(record)
	if err != nil {
		return e.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Failed to process question",
		})
	}

	return e.JSON(http.StatusOK, q)
}

// recordToQuestion converts a database record to a full Question (with decryption)
func recordToQuestion(record *core.Record) (Question, error) {
	q := Question{
		ID:         record.Id,
		Category:   record.GetString("category"),
		ImageUrl:   record.GetString("imageUrl"),
		IsPremium:  record.GetBool("isPremium"),
		Difficulty: record.GetInt("difficulty"),
	}

	// Decrypt sensitive fields
	if encryption != nil {
		questionText, err := encryption.Decrypt(record.GetString("question"))
		if err != nil {
			return q, err
		}
		q.Question = questionText

		optionsJSON, err := encryption.Decrypt(record.GetString("options"))
		if err != nil {
			return q, err
		}
		var options []string
		if err := json.Unmarshal([]byte(optionsJSON), &options); err != nil {
			return q, err
		}
		q.Options = options

		correctAnswerStr, err := encryption.Decrypt(record.GetString("correctAnswer"))
		if err != nil {
			return q, err
		}
		correctAnswer, _ := strconv.Atoi(correctAnswerStr)
		q.CorrectAnswer = correctAnswer

		explanation, err := encryption.Decrypt(record.GetString("explanation"))
		if err != nil {
			return q, err
		}
		q.Explanation = explanation
	} else {
		// No encryption - direct access
		q.Question = record.GetString("question")
		var options []string
		json.Unmarshal([]byte(record.GetString("options")), &options)
		q.Options = options
		q.CorrectAnswer = record.GetInt("correctAnswer")
		q.Explanation = record.GetString("explanation")
	}

	return q, nil
}

// recordToQuestionForClient converts a database record to a client-safe Question (no correct answer)
func recordToQuestionForClient(record *core.Record) (QuestionForClient, error) {
	q := QuestionForClient{
		ID:         record.Id,
		Category:   record.GetString("category"),
		ImageUrl:   record.GetString("imageUrl"),
		IsPremium:  record.GetBool("isPremium"),
		Difficulty: record.GetInt("difficulty"),
	}

	// Decrypt question and options only
	if encryption != nil {
		questionText, err := encryption.Decrypt(record.GetString("question"))
		if err != nil {
			return q, err
		}
		q.Question = questionText

		optionsJSON, err := encryption.Decrypt(record.GetString("options"))
		if err != nil {
			return q, err
		}
		var options []string
		if err := json.Unmarshal([]byte(optionsJSON), &options); err != nil {
			return q, err
		}
		q.Options = options
	} else {
		q.Question = record.GetString("question")
		var options []string
		json.Unmarshal([]byte(record.GetString("options")), &options)
		q.Options = options
	}

	return q, nil
}
