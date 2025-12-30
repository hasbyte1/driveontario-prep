# Backend Migration Plan

## Overview
Gradually migrate sensitive data and logic from frontend to backend for improved security, content protection, and business logic enforcement.

---

## Phase 1: Question Content Protection (Priority: HIGH)

### Current State
- All 135 questions stored in `src/data/questions.ts` as plain JSON
- Anyone can view source and extract all questions
- No way to add premium-only questions

### Target State
- Questions stored in Pocketbase `questions` collection
- Questions encrypted at rest, decrypted per-request
- License key or session-based access control
- Premium questions only accessible to premium users

### Implementation Steps

#### 1.1 Create Questions Collection Migration
```go
// New migration: create questions collection
questions := core.NewBaseCollection("questions")
questions.Fields.Add(
  &core.TextField{Name: "question", Required: true},
  &core.JSONField{Name: "options"},           // Encrypted JSON
  &core.NumberField{Name: "correctIndex"},    // Encrypted
  &core.TextField{Name: "explanation"},       // Encrypted
  &core.TextField{Name: "category"},
  &core.TextField{Name: "image"},
  &core.BoolField{Name: "isPremium"},
  &core.NumberField{Name: "difficulty"},      // 1-3
)
```

#### 1.2 Create Question Encryption Service
- AES-256 encryption for sensitive fields (options, correctIndex, explanation)
- Per-user decryption keys derived from user session
- Server-side decryption only

#### 1.3 Create Question API Routes
```
GET  /api/questions                    - List categories & counts (public)
GET  /api/questions/practice           - Get practice set (auth required)
GET  /api/questions/test               - Get test questions (auth required)
POST /api/questions/validate           - Validate answer server-side
```

#### 1.4 Update Frontend
- Remove `src/data/questions.ts` static data
- Create `src/lib/questions.ts` API client
- Update PracticeTest.tsx to fetch from API
- Add loading states and error handling

---

## Phase 2: Server-Side Answer Validation (Priority: HIGH)

### Current State
- Answers validated client-side
- XP awarded client-side (can be cheated)
- Test results calculated client-side

### Target State
- All answer validation on server
- XP awarded server-side only
- Anti-cheat: timing validation, answer pattern detection

### Implementation Steps

#### 2.1 Create Answer Validation Route
```
POST /api/questions/validate
Body: { questionId, selectedAnswer, timeSpent }
Response: { correct, correctAnswer, explanation, xpEarned }
```

#### 2.2 Create Test Session Management
```
POST /api/test/start          - Start test, get session ID + questions
POST /api/test/answer         - Submit answer for validation
POST /api/test/complete       - Complete test, get results + XP
GET  /api/test/results/:id    - Get test results
```

#### 2.3 Anti-Cheat Measures
- Minimum time per question (2 seconds)
- Maximum time per test
- Answer pattern detection (too many correct too fast)
- Rate limiting

---

## Phase 3: Stripe Session Security (Priority: HIGH)

### Current State
- Stripe public key exposed in frontend
- Checkout initiated from frontend
- Price IDs visible in source code

### Target State
- All Stripe operations server-side
- Frontend only receives checkout URL
- Webhook-only subscription updates

### Implementation Steps

#### 3.1 Update Checkout Flow
```
Frontend:
  1. User clicks "Subscribe"
  2. POST /api/stripe/create-checkout { plan: "monthly" }
  3. Redirect to returned URL

Backend:
  1. Validate user session
  2. Create Stripe checkout with server-side price IDs
  3. Return checkout URL only
```

#### 3.2 Remove Frontend Stripe Config
- Remove `VITE_STRIPE_PRICE_*` env vars
- Remove price IDs from frontend code
- Keep only `VITE_STRIPE_PUBLIC_KEY` for Stripe.js (if needed for elements)

#### 3.3 Webhook-Only Updates
- All subscription status changes via webhook only
- Frontend polls `/api/stripe/subscription-status` for current state
- No direct Stripe API calls from frontend

---

## Phase 4: Progress & XP Server Authority (Priority: MEDIUM)

### Current State
- Progress stored in localStorage
- XP calculated and awarded client-side
- Badges awarded client-side
- Easy to manipulate via browser dev tools

### Target State
- Server is source of truth for all progress
- XP can only be earned through validated actions
- Badges awarded server-side based on verified progress
- localStorage used only as offline cache

### Implementation Steps

#### 4.1 Create Progress Sync Protocol
```
On App Load:
  1. Load localStorage cache (for instant UI)
  2. Fetch server progress
  3. Server progress overwrites local (server is authority)

On Progress Update:
  1. Send action to server (e.g., answer question)
  2. Server validates and updates
  3. Server returns new progress state
  4. Update localStorage cache
```

#### 4.2 Create XP Transaction Log
```go
xp_transactions := core.NewBaseCollection("xp_transactions")
xp_transactions.Fields.Add(
  &core.RelationField{Name: "user"},
  &core.NumberField{Name: "amount"},
  &core.TextField{Name: "reason"},       // "correct_answer", "test_complete", etc.
  &core.TextField{Name: "referenceId"},  // questionId, testId, etc.
  &core.AutodateField{Name: "created"},
)
```

#### 4.3 Badge Verification
- Server checks badge conditions on each progress update
- Badges can only be awarded through verified actions
- Badge award creates XP transaction

---

## Phase 5: License Key System (Priority: MEDIUM)

### Current State
- No license key system
- Premium status based on Stripe subscription only

### Target State
- Optional license keys for:
  - Lifetime purchases (offline verification)
  - Enterprise/school deployments
  - Gift codes / promotions
- License keys cryptographically signed

### Implementation Steps

#### 5.1 Create License Collection
```go
licenses := core.NewBaseCollection("licenses")
licenses.Fields.Add(
  &core.TextField{Name: "key", Unique: true},
  &core.TextField{Name: "type"},           // "lifetime", "enterprise", "promo"
  &core.RelationField{Name: "user"},       // null until redeemed
  &core.DateField{Name: "expiresAt"},
  &core.NumberField{Name: "maxActivations"},
  &core.NumberField{Name: "activations"},
  &core.BoolField{Name: "isActive"},
)
```

#### 5.2 License Key Format
```
Format: DPREP-XXXXX-XXXXX-XXXXX-CHECK
- DPREP: Product prefix
- XXXXX: Random alphanumeric segments
- CHECK: Checksum for offline validation
```

#### 5.3 License API Routes
```
POST /api/license/redeem     - Redeem license key
GET  /api/license/validate   - Validate current license
POST /api/license/generate   - Admin: generate new licenses
```

---

## Phase 6: Offline Mode with Encrypted Cache (Priority: LOW)

### Current State
- PWA caches all assets
- Questions cached in plain text
- Works offline but data is exposed

### Target State
- Encrypted question cache
- License-based offline access
- Time-limited offline mode (e.g., 7 days)

### Implementation Steps

#### 6.1 Encrypted IndexedDB Storage
- Use Web Crypto API for client-side encryption
- Derive encryption key from user session + device fingerprint
- Auto-expire cached data

#### 6.2 Offline Session Tokens
- Server issues signed offline token (JWT)
- Token valid for X days
- Contains encrypted question access rights

---

## Migration Order & Timeline

| Phase | Priority | Complexity | Dependencies |
|-------|----------|------------|--------------|
| 1. Question Protection | HIGH | Medium | None |
| 2. Answer Validation | HIGH | Medium | Phase 1 |
| 3. Stripe Security | HIGH | Low | None |
| 4. Progress Authority | MEDIUM | High | Phase 2 |
| 5. License Keys | MEDIUM | Medium | Phase 3 |
| 6. Offline Encryption | LOW | High | Phase 1, 5 |

## Recommended Start: Phase 1 + Phase 3

Start with Question Protection and Stripe Security as they:
1. Protect your core content (questions)
2. Secure your revenue stream (payments)
3. Have no dependencies on each other
4. Can be developed in parallel

---

## Environment Variables (Final State)

### Frontend (.env)
```env
VITE_POCKETBASE_URL=https://api.driveontario.com
VITE_APP_VERSION=1.0.0
```

### Backend (environment)
```env
# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_MONTHLY=price_...
STRIPE_PRICE_YEARLY=price_...
STRIPE_PRICE_LIFETIME=price_...

# Encryption
QUESTION_ENCRYPTION_KEY=...  # 32-byte hex
LICENSE_SIGNING_KEY=...       # RSA private key

# Security
JWT_SECRET=...
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW=60
```

---

## Questions to Consider

1. **Backwards Compatibility**: How to handle existing users with localStorage progress?
2. **Offline Experience**: How much functionality should work offline?
3. **Question Updates**: How to push new questions without app update?
4. **Analytics**: What server-side analytics do you want?
5. **Admin Dashboard**: Need a way to manage questions, users, licenses?
