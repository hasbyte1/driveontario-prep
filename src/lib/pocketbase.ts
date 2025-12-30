import PocketBase, { RecordModel } from 'pocketbase';

// Pocketbase client instance
// In production, set VITE_POCKETBASE_URL environment variable
const POCKETBASE_URL = import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8090';

export const pb = new PocketBase(POCKETBASE_URL);

// Disable auto-cancellation for better UX
pb.autoCancellation(false);

// Types for our collections
export interface User extends RecordModel {
  email: string;
  name: string;
  avatar?: string;
  created: string;
  updated: string;
  // Custom fields
  xp: number;
  level: number;
  streak: number;
  longestStreak: number;
  questionsCompleted: number;
  questionsCorrect: number;
  badges: string[];
  isPremium: boolean;
  premiumPlan: 'free' | 'monthly' | 'yearly' | 'lifetime';
  premiumExpiresAt?: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}

export interface UserProgress {
  id: string;
  user: string;
  categoryProgress: Record<string, { correct: number; total: number }>;
  testHistory: TestHistoryItem[];
  dailyChallenges: DailyChallengeItem[];
  dailyChallengeDate: string;
  fastestTestTime: number | null;
  bestCorrectStreak: number;
  created: string;
  updated: string;
}

export interface TestHistoryItem {
  id: string;
  date: string;
  score: number;
  totalQuestions: number;
  categoryBreakdown: Record<string, { correct: number; total: number }>;
  timeSpent: number;
  passed: boolean;
  xpEarned: number;
}

export interface DailyChallengeItem {
  id: string;
  type: string;
  description: string;
  target: number;
  progress: number;
  xpReward: number;
  completed: boolean;
}

export interface Subscription {
  id: string;
  user: string;
  stripeSubscriptionId: string;
  stripeCustomerId: string;
  plan: 'monthly' | 'yearly' | 'lifetime';
  status: 'active' | 'cancelled' | 'past_due' | 'expired';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  created: string;
  updated: string;
}

// Helper to check if user is authenticated
export const isAuthenticated = (): boolean => {
  return pb.authStore.isValid;
};

// Helper to get current user
export const getCurrentUser = (): User | null => {
  if (!pb.authStore.isValid) return null;
  return pb.authStore.record as User;
};

// Helper to clear auth
export const clearAuth = (): void => {
  pb.authStore.clear();
};

// Export auth store for subscriptions
export const authStore = pb.authStore;
