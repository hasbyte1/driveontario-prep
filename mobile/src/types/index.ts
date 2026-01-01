import type {Category} from '../lib/config';

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  isPremium: boolean;
  premiumPlan?: 'monthly' | 'yearly' | 'lifetime';
  premiumExpiresAt?: string;
  createdAt: string;
}

// Question types
export interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: Category;
  image?: string;
  difficulty: 1 | 2 | 3;
  isPremium?: boolean;
}

export interface QuestionWithAnswer extends Question {
  selectedAnswer?: number;
  isCorrect?: boolean;
  timeSpent?: number;
}

// Test types
export interface TestResult {
  id: string;
  userId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  passed: boolean;
  xpEarned: number;
  duration: number;
  completedAt: string;
  questions: QuestionWithAnswer[];
}

export interface TestSession {
  id: string;
  questions: Question[];
  currentIndex: number;
  answers: Map<string, number>;
  startedAt: Date;
  isPractice: boolean;
}

// Progress types
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  requirement: {
    type: 'tests_completed' | 'perfect_tests' | 'streak' | 'xp' | 'category_mastery';
    value: number;
    category?: Category;
  };
}

export interface Progress {
  userId: string;
  xp: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  lastStudyDate?: string;
  testsCompleted: number;
  perfectTests: number;
  questionsAnswered: number;
  correctAnswers: number;
  categoryProgress: Record<Category, CategoryProgress>;
  badges: Badge[];
  weeklyXp: number[];
}

export interface CategoryProgress {
  questionsAnswered: number;
  correctAnswers: number;
  accuracy: number;
  mastery: number; // 0-100
}

// Leaderboard types
export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar?: string;
  xp: number;
  level: number;
  isCurrentUser?: boolean;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

// Auth types
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

// Settings types
export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  notificationsEnabled: boolean;
  soundEnabled: boolean;
  hapticEnabled: boolean;
  dailyReminderTime?: string; // HH:mm format
  dailyGoal: number; // questions per day
}

// Navigation types
export type RootStackParamList = {
  Main: undefined;
  Auth: undefined;
  Onboarding: undefined;
  Practice: {category?: Category};
  Test: {testId?: string};
  TestResult: {resultId: string};
  QuestionReview: {questionId: string; testId: string};
  Settings: undefined;
  Premium: undefined;
  Profile: undefined;
  Leaderboard: undefined;
  Achievements: undefined;
  CategoryDetail: {category: Category};
};

export type MainTabParamList = {
  Home: undefined;
  PracticeTab: undefined;
  TestTab: undefined;
  ProfileTab: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type {Category} from '../lib/config';
