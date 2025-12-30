package routes

import (
	"encoding/json"
	"io"
	"net/http"
	"os"
	"time"

	"github.com/pocketbase/pocketbase/core"
	"github.com/stripe/stripe-go/v76"
	"github.com/stripe/stripe-go/v76/billingportal/session"
	checkoutsession "github.com/stripe/stripe-go/v76/checkout/session"
	"github.com/stripe/stripe-go/v76/subscription"
	"github.com/stripe/stripe-go/v76/webhook"
)

// Stripe price IDs - ONLY set via environment variables (never from client)
var (
	priceMonthly  = os.Getenv("STRIPE_PRICE_MONTHLY")
	priceYearly   = os.Getenv("STRIPE_PRICE_YEARLY")
	priceLifetime = os.Getenv("STRIPE_PRICE_LIFETIME")
	webhookSecret = os.Getenv("STRIPE_WEBHOOK_SECRET")
)

func init() {
	stripe.Key = os.Getenv("STRIPE_SECRET_KEY")
}

// CheckoutRequest represents the request body for creating a checkout session
// Note: No priceId or userId - these are determined server-side for security
type CheckoutRequest struct {
	Plan       string `json:"plan"`
	SuccessURL string `json:"successUrl"`
	CancelURL  string `json:"cancelUrl"`
}

// CheckoutResponse represents the response for a checkout session
type CheckoutResponse struct {
	SessionID string `json:"sessionId"`
	URL       string `json:"url"`
}

// SubscriptionStatus represents the subscription status response
type SubscriptionStatus struct {
	Active            bool   `json:"active"`
	Plan              string `json:"plan"`
	ExpiresAt         string `json:"expiresAt,omitempty"`
	CancelAtPeriodEnd bool   `json:"cancelAtPeriodEnd"`
}

// CustomerPortalRequest represents the request for customer portal
type CustomerPortalRequest struct {
	ReturnURL string `json:"returnUrl"`
}

// RegisterStripeRoutes registers all Stripe-related API routes
func RegisterStripeRoutes(app core.App, se *core.ServeEvent) {
	// Create checkout session
	// POST /api/stripe/create-checkout
	// Body: { plan: "monthly"|"yearly"|"lifetime", successUrl, cancelUrl }
	// Security: User ID from auth token, price ID from server config
	se.Router.POST("/api/stripe/create-checkout", func(e *core.RequestEvent) error {
		authRecord := e.Auth
		if authRecord == nil {
			return e.JSON(http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
		}

		var req CheckoutRequest
		if err := e.BindBody(&req); err != nil {
			return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
		}

		// Get the price ID from SERVER config based on plan (never from client)
		var priceID string
		var mode stripe.CheckoutSessionMode

		switch req.Plan {
		case "monthly":
			priceID = priceMonthly
			mode = stripe.CheckoutSessionModeSubscription
		case "yearly":
			priceID = priceYearly
			mode = stripe.CheckoutSessionModeSubscription
		case "lifetime":
			priceID = priceLifetime
			mode = stripe.CheckoutSessionModePayment
		default:
			return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid plan"})
		}

		if priceID == "" {
			return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Price not configured for this plan"})
		}

		// Validate URLs (basic security check)
		if req.SuccessURL == "" || req.CancelURL == "" {
			return e.JSON(http.StatusBadRequest, map[string]string{"error": "Success and cancel URLs required"})
		}

		// Check if user already has a Stripe customer ID
		customerID := authRecord.GetString("stripeCustomerId")

		// Create checkout session params
		params := &stripe.CheckoutSessionParams{
			Mode:       stripe.String(string(mode)),
			SuccessURL: stripe.String(req.SuccessURL),
			CancelURL:  stripe.String(req.CancelURL),
			LineItems: []*stripe.CheckoutSessionLineItemParams{
				{
					Price:    stripe.String(priceID),
					Quantity: stripe.Int64(1),
				},
			},
			// Store user info in metadata for webhook processing
			Metadata: map[string]string{
				"userId": authRecord.Id,
				"plan":   req.Plan,
			},
		}

		// Use existing customer or set email for new customer
		if customerID != "" {
			params.Customer = stripe.String(customerID)
		} else {
			params.CustomerEmail = stripe.String(authRecord.Email())
		}

		// Create the session
		sess, err := checkoutsession.New(params)
		if err != nil {
			return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to create checkout session"})
		}

		return e.JSON(http.StatusOK, CheckoutResponse{
			SessionID: sess.ID,
			URL:       sess.URL,
		})
	}).Bind(RequireAuth(app))

	// Get subscription status for authenticated user
	// GET /api/stripe/subscription-status
	// Security: Returns status for authenticated user only
	se.Router.GET("/api/stripe/subscription-status", func(e *core.RequestEvent) error {
		authRecord := e.Auth
		if authRecord == nil {
			return e.JSON(http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
		}

		// Get subscription from database for authenticated user
		subscriptions, err := app.FindRecordsByFilter(
			"subscriptions",
			"user = {:userId} && status = 'active'",
			"-created",
			1,
			0,
			map[string]any{"userId": authRecord.Id},
		)

		if err != nil || len(subscriptions) == 0 {
			// Check if user has premium flag (for lifetime purchases)
			if authRecord.GetBool("isPremium") {
				return e.JSON(http.StatusOK, SubscriptionStatus{
					Active:            true,
					Plan:              authRecord.GetString("premiumPlan"),
					CancelAtPeriodEnd: false,
				})
			}
			return e.JSON(http.StatusOK, SubscriptionStatus{
				Active: false,
				Plan:   "free",
			})
		}

		sub := subscriptions[0]
		return e.JSON(http.StatusOK, SubscriptionStatus{
			Active:            true,
			Plan:              sub.GetString("plan"),
			ExpiresAt:         sub.GetDateTime("currentPeriodEnd").String(),
			CancelAtPeriodEnd: sub.GetString("status") == "cancelled",
		})
	}).Bind(RequireAuth(app))

	// Cancel subscription for authenticated user
	// POST /api/stripe/cancel-subscription
	// Security: Cancels subscription for authenticated user only
	se.Router.POST("/api/stripe/cancel-subscription", func(e *core.RequestEvent) error {
		authRecord := e.Auth
		if authRecord == nil {
			return e.JSON(http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
		}

		// Get user's active subscription
		subscriptions, err := app.FindRecordsByFilter(
			"subscriptions",
			"user = {:userId} && status = 'active'",
			"-created",
			1,
			0,
			map[string]any{"userId": authRecord.Id},
		)

		if err != nil || len(subscriptions) == 0 {
			return e.JSON(http.StatusNotFound, map[string]string{"error": "No active subscription found"})
		}

		sub := subscriptions[0]
		stripeSubID := sub.GetString("stripeSubscriptionId")

		if stripeSubID != "" {
			// Cancel at period end in Stripe
			_, err = subscription.Update(stripeSubID, &stripe.SubscriptionParams{
				CancelAtPeriodEnd: stripe.Bool(true),
			})
			if err != nil {
				return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to cancel subscription"})
			}
		}

		// Update subscription status in database
		sub.Set("status", "cancelled")
		if err := app.Save(sub); err != nil {
			return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to update subscription"})
		}

		return e.JSON(http.StatusOK, map[string]string{"status": "cancelled"})
	}).Bind(RequireAuth(app))

	// Resume subscription for authenticated user
	// POST /api/stripe/resume-subscription
	// Security: Resumes subscription for authenticated user only
	se.Router.POST("/api/stripe/resume-subscription", func(e *core.RequestEvent) error {
		authRecord := e.Auth
		if authRecord == nil {
			return e.JSON(http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
		}

		// Get user's cancelled subscription
		subscriptions, err := app.FindRecordsByFilter(
			"subscriptions",
			"user = {:userId} && status = 'cancelled'",
			"-created",
			1,
			0,
			map[string]any{"userId": authRecord.Id},
		)

		if err != nil || len(subscriptions) == 0 {
			return e.JSON(http.StatusNotFound, map[string]string{"error": "No cancelled subscription found"})
		}

		sub := subscriptions[0]
		stripeSubID := sub.GetString("stripeSubscriptionId")

		if stripeSubID != "" {
			// Resume subscription in Stripe
			_, err = subscription.Update(stripeSubID, &stripe.SubscriptionParams{
				CancelAtPeriodEnd: stripe.Bool(false),
			})
			if err != nil {
				return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to resume subscription"})
			}
		}

		// Update subscription status
		sub.Set("status", "active")
		if err := app.Save(sub); err != nil {
			return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to update subscription"})
		}

		// Update user premium status
		authRecord.Set("isPremium", true)
		authRecord.Set("premiumPlan", sub.GetString("plan"))
		if err := app.Save(authRecord); err != nil {
			return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to update user"})
		}

		return e.JSON(http.StatusOK, map[string]string{"status": "resumed"})
	}).Bind(RequireAuth(app))

	// Customer portal for authenticated user
	// POST /api/stripe/customer-portal
	// Body: { returnUrl }
	// Security: Opens portal for authenticated user only
	se.Router.POST("/api/stripe/customer-portal", func(e *core.RequestEvent) error {
		authRecord := e.Auth
		if authRecord == nil {
			return e.JSON(http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
		}

		var req CustomerPortalRequest
		if err := e.BindBody(&req); err != nil {
			return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
		}

		customerID := authRecord.GetString("stripeCustomerId")
		if customerID == "" {
			return e.JSON(http.StatusBadRequest, map[string]string{"error": "No Stripe customer found"})
		}

		if req.ReturnURL == "" {
			return e.JSON(http.StatusBadRequest, map[string]string{"error": "Return URL required"})
		}

		// Create billing portal session
		params := &stripe.BillingPortalSessionParams{
			Customer:  stripe.String(customerID),
			ReturnURL: stripe.String(req.ReturnURL),
		}

		sess, err := session.New(params)
		if err != nil {
			return e.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to create portal session"})
		}

		return e.JSON(http.StatusOK, map[string]string{"url": sess.URL})
	}).Bind(RequireAuth(app))

	// Stripe webhook handler
	// POST /api/stripe/webhook
	// Security: Verified by Stripe signature
	se.Router.POST("/api/stripe/webhook", func(e *core.RequestEvent) error {
		body, err := io.ReadAll(e.Request.Body)
		if err != nil {
			return e.JSON(http.StatusBadRequest, map[string]string{"error": "Failed to read body"})
		}

		// Verify webhook signature
		sigHeader := e.Request.Header.Get("Stripe-Signature")
		event, err := webhook.ConstructEvent(body, sigHeader, webhookSecret)
		if err != nil {
			return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid signature"})
		}

		// Handle different event types
		switch event.Type {
		case "checkout.session.completed":
			var session stripe.CheckoutSession
			if err := json.Unmarshal(event.Data.Raw, &session); err != nil {
				return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid session data"})
			}
			handleCheckoutComplete(app, &session)

		case "customer.subscription.updated":
			var sub stripe.Subscription
			if err := json.Unmarshal(event.Data.Raw, &sub); err != nil {
				return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid subscription data"})
			}
			handleSubscriptionUpdate(app, &sub)

		case "customer.subscription.deleted":
			var sub stripe.Subscription
			if err := json.Unmarshal(event.Data.Raw, &sub); err != nil {
				return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid subscription data"})
			}
			handleSubscriptionCancelled(app, &sub)

		case "invoice.payment_failed":
			var invoice stripe.Invoice
			if err := json.Unmarshal(event.Data.Raw, &invoice); err != nil {
				return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid invoice data"})
			}
			handlePaymentFailed(app, &invoice)
		}

		return e.JSON(http.StatusOK, map[string]string{"received": "true"})
	})
}

// handleCheckoutComplete processes successful checkout sessions
func handleCheckoutComplete(app core.App, session *stripe.CheckoutSession) {
	userID := session.Metadata["userId"]
	plan := session.Metadata["plan"]

	if userID == "" {
		return
	}

	// Find user
	user, err := app.FindRecordById("users", userID)
	if err != nil {
		return
	}

	// Update user with Stripe customer ID
	user.Set("stripeCustomerId", session.Customer.ID)
	user.Set("isPremium", true)
	user.Set("premiumPlan", plan)

	// Set expiration for subscriptions
	if plan != "lifetime" && session.Subscription != nil {
		// Get subscription details
		sub, err := subscription.Get(session.Subscription.ID, nil)
		if err == nil {
			user.Set("premiumExpiresAt", time.Unix(sub.CurrentPeriodEnd, 0))

			// Create subscription record
			subscriptionCollection, _ := app.FindCollectionByNameOrId("subscriptions")
			if subscriptionCollection != nil {
				subRecord := core.NewRecord(subscriptionCollection)
				subRecord.Set("user", userID)
				subRecord.Set("stripeSubscriptionId", session.Subscription.ID)
				subRecord.Set("stripeCustomerId", session.Customer.ID)
				subRecord.Set("plan", plan)
				subRecord.Set("status", "active")
				subRecord.Set("currentPeriodStart", time.Unix(sub.CurrentPeriodStart, 0))
				subRecord.Set("currentPeriodEnd", time.Unix(sub.CurrentPeriodEnd, 0))
				app.Save(subRecord)
			}
		}
	}

	app.Save(user)
}

// handleSubscriptionUpdate processes subscription updates
func handleSubscriptionUpdate(app core.App, sub *stripe.Subscription) {
	// Find subscription record by Stripe ID
	subscriptions, err := app.FindRecordsByFilter(
		"subscriptions",
		"stripeSubscriptionId = {:subId}",
		"",
		1,
		0,
		map[string]any{"subId": sub.ID},
	)

	if err != nil || len(subscriptions) == 0 {
		return
	}

	record := subscriptions[0]

	// Update subscription details
	record.Set("currentPeriodStart", time.Unix(sub.CurrentPeriodStart, 0))
	record.Set("currentPeriodEnd", time.Unix(sub.CurrentPeriodEnd, 0))

	if sub.CancelAtPeriodEnd {
		record.Set("status", "cancelled")
	} else {
		record.Set("status", "active")
	}

	app.Save(record)

	// Update user record
	userID := record.GetString("user")
	user, err := app.FindRecordById("users", userID)
	if err == nil {
		user.Set("premiumExpiresAt", time.Unix(sub.CurrentPeriodEnd, 0))
		user.Set("isPremium", !sub.CancelAtPeriodEnd)
		app.Save(user)
	}
}

// handleSubscriptionCancelled processes subscription cancellations
func handleSubscriptionCancelled(app core.App, sub *stripe.Subscription) {
	// Find subscription record
	subscriptions, err := app.FindRecordsByFilter(
		"subscriptions",
		"stripeSubscriptionId = {:subId}",
		"",
		1,
		0,
		map[string]any{"subId": sub.ID},
	)

	if err != nil || len(subscriptions) == 0 {
		return
	}

	record := subscriptions[0]
	record.Set("status", "expired")
	app.Save(record)

	// Update user
	userID := record.GetString("user")
	user, err := app.FindRecordById("users", userID)
	if err == nil {
		user.Set("isPremium", false)
		user.Set("premiumPlan", "free")
		user.Set("premiumExpiresAt", nil)
		app.Save(user)
	}
}

// handlePaymentFailed processes failed payments
func handlePaymentFailed(app core.App, invoice *stripe.Invoice) {
	if invoice.Subscription == nil {
		return
	}

	// Find subscription record
	subscriptions, err := app.FindRecordsByFilter(
		"subscriptions",
		"stripeSubscriptionId = {:subId}",
		"",
		1,
		0,
		map[string]any{"subId": invoice.Subscription.ID},
	)

	if err != nil || len(subscriptions) == 0 {
		return
	}

	record := subscriptions[0]
	record.Set("status", "past_due")
	app.Save(record)
}
