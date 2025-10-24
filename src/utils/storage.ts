// Local storage utilities for offline support

export interface UserProgress {
  questionsCompleted: number;
  questionsCorrect: number;
  categoryProgress: Record<string, { correct: number; total: number }>;
  streak: number;
  lastActiveDate: string;
  badges: string[];
  testHistory: TestResult[];
}

export interface TestResult {
  id: string;
  date: string;
  score: number;
  totalQuestions: number;
  categoryBreakdown: Record<string, { correct: number; total: number }>;
  timeSpent: number;
  passed: boolean;
}

const STORAGE_KEY = "ontario_driveprep_progress";

export const getStoredProgress = (): UserProgress => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    questionsCompleted: 0,
    questionsCorrect: 0,
    categoryProgress: {},
    streak: 0,
    lastActiveDate: new Date().toISOString().split("T")[0],
    badges: [],
    testHistory: [],
  };
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
  
  if (lastActive === yesterdayStr) {
    return { ...progress, streak: progress.streak + 1, lastActiveDate: today };
  } else {
    return { ...progress, streak: 1, lastActiveDate: today };
  }
};

export const checkAndAwardBadges = (progress: UserProgress): string[] => {
  const newBadges: string[] = [];
  
  // Sign Master - 80% accuracy in signs category
  if (!progress.badges.includes("sign_master")) {
    const signStats = progress.categoryProgress["Road Signs & Signals"];
    if (signStats && signStats.total >= 20 && signStats.correct / signStats.total >= 0.8) {
      newBadges.push("sign_master");
    }
  }
  
  // Road Scholar - 100 questions completed
  if (!progress.badges.includes("road_scholar") && progress.questionsCompleted >= 100) {
    newBadges.push("road_scholar");
  }
  
  // Perfect Score - Score 100% on any test
  if (!progress.badges.includes("perfect_score")) {
    const hasPerfect = progress.testHistory.some(t => t.score === t.totalQuestions);
    if (hasPerfect) newBadges.push("perfect_score");
  }
  
  // Consistent - 7 day streak
  if (!progress.badges.includes("consistent") && progress.streak >= 7) {
    newBadges.push("consistent");
  }
  
  return newBadges;
};

export const getBadgeInfo = (badgeId: string) => {
  const badges: Record<string, { name: string; description: string; icon: string }> = {
    sign_master: {
      name: "Sign Master",
      description: "80%+ accuracy on 20+ road sign questions",
      icon: "🚸",
    },
    road_scholar: {
      name: "Road Scholar",
      description: "Completed 100+ practice questions",
      icon: "🎓",
    },
    perfect_score: {
      name: "Perfect Score",
      description: "Scored 100% on a practice test",
      icon: "💯",
    },
    consistent: {
      name: "Consistent Learner",
      description: "Maintained a 7-day streak",
      icon: "🔥",
    },
  };
  return badges[badgeId] || { name: badgeId, description: "", icon: "🏆" };
};
