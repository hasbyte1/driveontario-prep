// API Configuration
export const API_URL = __DEV__
  ? 'http://localhost:8090'
  : 'https://api.driveontario.com';

// OneSignal App ID - Replace with your actual App ID
export const ONESIGNAL_APP_ID = 'YOUR_ONESIGNAL_APP_ID';

// App Configuration
export const APP_CONFIG = {
  name: 'Drive Ontario Prep',
  version: '1.0.0',
  bundleId: 'com.driveontario.prep',
};

// Premium Plans
export const PREMIUM_PLANS = {
  monthly: {
    id: 'premium_monthly',
    name: 'Monthly',
    price: '$4.99',
    duration: '1 month',
  },
  yearly: {
    id: 'premium_yearly',
    name: 'Yearly',
    price: '$29.99',
    duration: '1 year',
    savings: '50%',
  },
  lifetime: {
    id: 'premium_lifetime',
    name: 'Lifetime',
    price: '$49.99',
    duration: 'Forever',
  },
};

// Question Categories
export const CATEGORIES = [
  'Road Signs & Signals',
  'Rules of the Road',
  'Safe Driving & Vehicle Handling',
  'Alcohol/Drugs & Penalties',
  'Licensing & Documents',
  'Miscellaneous',
] as const;

export type Category = (typeof CATEGORIES)[number];

// XP Configuration
export const XP_CONFIG = {
  correctAnswer: 10,
  incorrectAnswer: 0,
  perfectTest: 50,
  testCompletion: 25,
  dailyStreak: 20,
  firstPerfectTest: 100,
};

// Test Configuration
export const TEST_CONFIG = {
  questionsPerTest: 40,
  passingScore: 80, // 80% to pass (32/40)
  timeLimit: 0, // No time limit for G1 test
};
