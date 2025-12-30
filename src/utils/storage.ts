// Local storage utilities for offline support

export interface UserProgress {
  questionsCompleted: number;
  questionsCorrect: number;
  categoryProgress: Record<string, { correct: number; total: number }>;
  streak: number;
  lastActiveDate: string;
  badges: string[];
  testHistory: TestResult[];
  // New gamification fields
  xp: number;
  totalXpEarned: number;
  dailyChallenges: DailyChallenge[];
  dailyChallengeDate: string;
  loginDays: number;
  fastestTestTime: number | null;
  longestStreak: number;
  correctStreak: number; // Current consecutive correct answers
  bestCorrectStreak: number; // Best ever consecutive correct answers
}

export interface TestResult {
  id: string;
  date: string;
  score: number;
  totalQuestions: number;
  categoryBreakdown: Record<string, { correct: number; total: number }>;
  timeSpent: number;
  passed: boolean;
  xpEarned?: number;
}

export interface DailyChallenge {
  id: string;
  type: 'questions' | 'correct' | 'category' | 'test' | 'flashcards' | 'streak';
  description: string;
  target: number;
  progress: number;
  xpReward: number;
  completed: boolean;
}

// XP Constants
export const XP_REWARDS = {
  QUESTION_COMPLETE: 10,
  CORRECT_ANSWER: 15,
  FIRST_TRY_CORRECT: 25,
  DAILY_LOGIN: 50,
  TEST_COMPLETE: 100,
  TEST_PASS: 200,
  PERFECT_SCORE: 500,
  STREAK_7_DAY: 300,
  STREAK_14_DAY: 500,
  STREAK_30_DAY: 1000,
  FLASHCARD_MASTERED: 20,
  DAILY_CHALLENGE: 100,
} as const;

// Level thresholds
export const LEVELS = [
  { level: 1, name: "Learner", minXp: 0, icon: "🚗" },
  { level: 2, name: "Novice", minXp: 500, icon: "🚙" },
  { level: 3, name: "Intermediate", minXp: 1500, icon: "🚕" },
  { level: 4, name: "Advanced", minXp: 3500, icon: "🏎️" },
  { level: 5, name: "Expert", minXp: 7000, icon: "🚀" },
  { level: 6, name: "G1 Master", minXp: 12000, icon: "👑" },
] as const;

export const getLevel = (xp: number) => {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXp) {
      const currentLevel = LEVELS[i];
      const nextLevel = LEVELS[i + 1];
      const xpForCurrentLevel = xp - currentLevel.minXp;
      const xpNeededForNext = nextLevel ? nextLevel.minXp - currentLevel.minXp : 0;
      const progress = nextLevel ? (xpForCurrentLevel / xpNeededForNext) * 100 : 100;

      return {
        ...currentLevel,
        xpForCurrentLevel,
        xpNeededForNext,
        progress: Math.min(progress, 100),
        nextLevel: nextLevel || null,
      };
    }
  }
  return { ...LEVELS[0], xpForCurrentLevel: 0, xpNeededForNext: 500, progress: 0, nextLevel: LEVELS[1] };
};

const STORAGE_KEY = "ontario_driveprep_progress";

const getDefaultProgress = (): UserProgress => ({
  questionsCompleted: 0,
  questionsCorrect: 0,
  categoryProgress: {},
  streak: 0,
  lastActiveDate: new Date().toISOString().split("T")[0],
  badges: [],
  testHistory: [],
  xp: 0,
  totalXpEarned: 0,
  dailyChallenges: [],
  dailyChallengeDate: "",
  loginDays: 0,
  fastestTestTime: null,
  longestStreak: 0,
  correctStreak: 0,
  bestCorrectStreak: 0,
});

export const getStoredProgress = (): UserProgress => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const parsed = JSON.parse(stored);
    // Merge with defaults to handle new fields for existing users
    return { ...getDefaultProgress(), ...parsed };
  }
  return getDefaultProgress();
};

export const saveProgress = (progress: UserProgress) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

export const updateStreak = (progress: UserProgress): UserProgress => {
  const today = new Date().toISOString().split("T")[0];
  const lastActive = progress.lastActiveDate;

  if (lastActive === today) {
    return progress;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  let newStreak: number;
  let xpBonus = XP_REWARDS.DAILY_LOGIN;

  if (lastActive === yesterdayStr) {
    newStreak = progress.streak + 1;
    // Streak milestone bonuses
    if (newStreak === 7) xpBonus += XP_REWARDS.STREAK_7_DAY;
    if (newStreak === 14) xpBonus += XP_REWARDS.STREAK_14_DAY;
    if (newStreak === 30) xpBonus += XP_REWARDS.STREAK_30_DAY;
  } else {
    newStreak = 1;
  }

  const longestStreak = Math.max(progress.longestStreak, newStreak);

  return {
    ...progress,
    streak: newStreak,
    lastActiveDate: today,
    loginDays: progress.loginDays + 1,
    xp: progress.xp + xpBonus,
    totalXpEarned: progress.totalXpEarned + xpBonus,
    longestStreak,
  };
};

// Add XP to progress
export const addXP = (progress: UserProgress, amount: number): UserProgress => {
  return {
    ...progress,
    xp: progress.xp + amount,
    totalXpEarned: progress.totalXpEarned + amount,
  };
};

export const checkAndAwardBadges = (progress: UserProgress): string[] => {
  const newBadges: string[] = [];

  // Helper to check and add badge
  const checkBadge = (id: string, condition: boolean) => {
    if (!progress.badges.includes(id) && condition) {
      newBadges.push(id);
    }
  };

  // === BRONZE TIER ===
  // First Steps - Complete first question
  checkBadge("first_steps", progress.questionsCompleted >= 1);

  // Early Bird - Study before 8 AM (checked separately when answering)
  const hour = new Date().getHours();
  checkBadge("early_bird", hour < 8 && progress.questionsCompleted > 0);

  // Night Owl - Study after 10 PM
  checkBadge("night_owl", hour >= 22 && progress.questionsCompleted > 0);

  // Quick Learner - Complete 25 questions
  checkBadge("quick_learner", progress.questionsCompleted >= 25);

  // === SILVER TIER ===
  // Sign Master - 80% accuracy in signs category with 20+ questions
  const signStats = progress.categoryProgress["Road Signs & Signals"];
  checkBadge("sign_master", signStats?.total >= 20 && signStats.correct / signStats.total >= 0.8);

  // Road Scholar - 100 questions completed
  checkBadge("road_scholar", progress.questionsCompleted >= 100);

  // Sharpshooter - 10 correct in a row
  checkBadge("sharpshooter", progress.bestCorrectStreak >= 10);

  // Speed Demon - Pass test in under 15 minutes
  const fastTest = progress.testHistory.find(t => t.passed && t.timeSpent < 900);
  checkBadge("speed_demon", !!fastTest);

  // Consistent Learner - 7 day streak
  checkBadge("consistent", progress.streak >= 7);

  // === GOLD TIER ===
  // Perfect Score - 100% on any test
  const hasPerfect = progress.testHistory.some(t => t.score === t.totalQuestions);
  checkBadge("perfect_score", hasPerfect);

  // Category Champion - Master all 6 categories (80%+ on 10+ questions each)
  const categories = ["Road Signs & Signals", "Rules of the Road", "Safe Driving & Vehicle Handling",
                      "Alcohol/Drugs & Penalties", "Licensing & Documents", "Miscellaneous"];
  const allCategoriesMastered = categories.every(cat => {
    const stats = progress.categoryProgress[cat];
    return stats && stats.total >= 10 && stats.correct / stats.total >= 0.8;
  });
  checkBadge("category_champion", allCategoriesMastered);

  // Dedicated Driver - Complete 250 questions
  checkBadge("dedicated_driver", progress.questionsCompleted >= 250);

  // Marathon Runner - 14 day streak
  checkBadge("marathon_runner", progress.streak >= 14);

  // === PLATINUM TIER ===
  // Diamond Streak - 30 day streak
  checkBadge("diamond_streak", progress.streak >= 30);

  // Test Master - Pass 10 tests
  const passedTests = progress.testHistory.filter(t => t.passed).length;
  checkBadge("test_master", passedTests >= 10);

  // Perfectionist - Get 3 perfect scores
  const perfectScores = progress.testHistory.filter(t => t.score === t.totalQuestions).length;
  checkBadge("perfectionist", perfectScores >= 3);

  // === LEGENDARY TIER ===
  // G1 Legend - Complete 500+ questions with 90%+ accuracy
  const overallAccuracy = progress.questionsCompleted > 0
    ? progress.questionsCorrect / progress.questionsCompleted
    : 0;
  checkBadge("g1_legend", progress.questionsCompleted >= 500 && overallAccuracy >= 0.9);

  return newBadges;
};

export type BadgeTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'legendary';

export interface BadgeInfo {
  name: string;
  description: string;
  icon: string;
  tier: BadgeTier;
  xpReward: number;
}

export const ALL_BADGES: Record<string, BadgeInfo> = {
  // === BRONZE TIER ===
  first_steps: {
    name: "First Steps",
    description: "Complete your first question",
    icon: "👶",
    tier: "bronze",
    xpReward: 50,
  },
  early_bird: {
    name: "Early Bird",
    description: "Study before 8 AM",
    icon: "🌅",
    tier: "bronze",
    xpReward: 75,
  },
  night_owl: {
    name: "Night Owl",
    description: "Study after 10 PM",
    icon: "🦉",
    tier: "bronze",
    xpReward: 75,
  },
  quick_learner: {
    name: "Quick Learner",
    description: "Complete 25 questions",
    icon: "📚",
    tier: "bronze",
    xpReward: 100,
  },
  // === SILVER TIER ===
  sign_master: {
    name: "Sign Master",
    description: "80%+ accuracy on 20+ road sign questions",
    icon: "🚸",
    tier: "silver",
    xpReward: 200,
  },
  road_scholar: {
    name: "Road Scholar",
    description: "Complete 100+ practice questions",
    icon: "🎓",
    tier: "silver",
    xpReward: 250,
  },
  sharpshooter: {
    name: "Sharpshooter",
    description: "Get 10 correct answers in a row",
    icon: "🎯",
    tier: "silver",
    xpReward: 200,
  },
  speed_demon: {
    name: "Speed Demon",
    description: "Pass a test in under 15 minutes",
    icon: "⚡",
    tier: "silver",
    xpReward: 250,
  },
  consistent: {
    name: "Consistent Learner",
    description: "Maintain a 7-day streak",
    icon: "🔥",
    tier: "silver",
    xpReward: 300,
  },
  // === GOLD TIER ===
  perfect_score: {
    name: "Perfect Score",
    description: "Score 100% on a practice test",
    icon: "💯",
    tier: "gold",
    xpReward: 500,
  },
  category_champion: {
    name: "Category Champion",
    description: "Master all 6 categories (80%+ on 10+ questions)",
    icon: "🏆",
    tier: "gold",
    xpReward: 750,
  },
  dedicated_driver: {
    name: "Dedicated Driver",
    description: "Complete 250 questions",
    icon: "🚗",
    tier: "gold",
    xpReward: 500,
  },
  marathon_runner: {
    name: "Marathon Runner",
    description: "Maintain a 14-day streak",
    icon: "🏃",
    tier: "gold",
    xpReward: 500,
  },
  // === PLATINUM TIER ===
  diamond_streak: {
    name: "Diamond Streak",
    description: "Maintain a 30-day streak",
    icon: "💎",
    tier: "platinum",
    xpReward: 1000,
  },
  test_master: {
    name: "Test Master",
    description: "Pass 10 practice tests",
    icon: "🎖️",
    tier: "platinum",
    xpReward: 750,
  },
  perfectionist: {
    name: "Perfectionist",
    description: "Get 3 perfect scores on tests",
    icon: "✨",
    tier: "platinum",
    xpReward: 1000,
  },
  // === LEGENDARY TIER ===
  g1_legend: {
    name: "G1 Legend",
    description: "Complete 500+ questions with 90%+ accuracy",
    icon: "👑",
    tier: "legendary",
    xpReward: 2000,
  },
};

export const getBadgeInfo = (badgeId: string): BadgeInfo => {
  return ALL_BADGES[badgeId] || {
    name: badgeId,
    description: "",
    icon: "🏆",
    tier: "bronze" as BadgeTier,
    xpReward: 0,
  };
};

export const getBadgesByTier = (tier: BadgeTier): string[] => {
  return Object.entries(ALL_BADGES)
    .filter(([_, badge]) => badge.tier === tier)
    .map(([id]) => id);
};

export const TIER_COLORS: Record<BadgeTier, string> = {
  bronze: "from-amber-600 to-amber-800",
  silver: "from-slate-300 to-slate-500",
  gold: "from-yellow-400 to-yellow-600",
  platinum: "from-cyan-300 to-cyan-500",
  legendary: "from-purple-500 to-pink-500",
};

// Daily Challenges System
const CHALLENGE_TEMPLATES = [
  { type: 'questions' as const, description: "Answer {target} questions", targets: [10, 15, 20, 25], xpReward: 100 },
  { type: 'correct' as const, description: "Get {target} correct answers", targets: [5, 8, 10, 15], xpReward: 120 },
  { type: 'category' as const, description: "Answer {target} Road Signs questions", targets: [5, 8, 10], xpReward: 100 },
  { type: 'test' as const, description: "Complete a practice test", targets: [1], xpReward: 150 },
  { type: 'flashcards' as const, description: "Review {target} flashcards", targets: [10, 15, 20], xpReward: 80 },
  { type: 'streak' as const, description: "Maintain your daily streak", targets: [1], xpReward: 50 },
];

export const generateDailyChallenges = (progress: UserProgress): DailyChallenge[] => {
  const today = new Date().toISOString().split("T")[0];

  // Return existing challenges if already generated today
  if (progress.dailyChallengeDate === today && progress.dailyChallenges.length > 0) {
    return progress.dailyChallenges;
  }

  // Use date as seed for consistent daily challenges
  const seed = today.split("-").reduce((acc, val) => acc + parseInt(val), 0);
  const seededRandom = (index: number) => {
    const x = Math.sin(seed + index) * 10000;
    return x - Math.floor(x);
  };

  // Generate 3 varied challenges
  const selectedChallenges: DailyChallenge[] = [];
  const usedTypes = new Set<string>();

  for (let i = 0; i < 3 && selectedChallenges.length < 3; i++) {
    const templateIndex = Math.floor(seededRandom(i) * CHALLENGE_TEMPLATES.length);
    const template = CHALLENGE_TEMPLATES[templateIndex];

    if (usedTypes.has(template.type)) continue;
    usedTypes.add(template.type);

    const targetIndex = Math.floor(seededRandom(i + 10) * template.targets.length);
    const target = template.targets[targetIndex];

    selectedChallenges.push({
      id: `${today}-${template.type}-${i}`,
      type: template.type,
      description: template.description.replace("{target}", target.toString()),
      target,
      progress: 0,
      xpReward: template.xpReward,
      completed: false,
    });
  }

  // Ensure we always have 3 challenges
  while (selectedChallenges.length < 3) {
    const fallbackTemplate = CHALLENGE_TEMPLATES[selectedChallenges.length];
    const target = fallbackTemplate.targets[0];
    selectedChallenges.push({
      id: `${today}-fallback-${selectedChallenges.length}`,
      type: fallbackTemplate.type,
      description: fallbackTemplate.description.replace("{target}", target.toString()),
      target,
      progress: 0,
      xpReward: fallbackTemplate.xpReward,
      completed: false,
    });
  }

  return selectedChallenges;
};

export const updateDailyChallengeProgress = (
  progress: UserProgress,
  type: DailyChallenge['type'],
  amount: number = 1
): { progress: UserProgress; xpEarned: number; completedChallenges: DailyChallenge[] } => {
  let xpEarned = 0;
  const completedChallenges: DailyChallenge[] = [];

  const updatedChallenges = progress.dailyChallenges.map(challenge => {
    if (challenge.type === type && !challenge.completed) {
      const newProgress = Math.min(challenge.progress + amount, challenge.target);
      const completed = newProgress >= challenge.target;

      if (completed && !challenge.completed) {
        xpEarned += challenge.xpReward;
        completedChallenges.push({ ...challenge, completed: true });
      }

      return { ...challenge, progress: newProgress, completed };
    }
    return challenge;
  });

  return {
    progress: {
      ...progress,
      dailyChallenges: updatedChallenges,
      xp: progress.xp + xpEarned,
      totalXpEarned: progress.totalXpEarned + xpEarned,
    },
    xpEarned,
    completedChallenges,
  };
};
