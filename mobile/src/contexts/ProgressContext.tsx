import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import {api} from '../lib/api';
import {StorageHelper, STORAGE_KEYS} from '../lib/storage';
import {useAuth} from './AuthContext';
import {CATEGORIES, XP_CONFIG} from '../lib/config';
import type {Progress, Badge, CategoryProgress, Category} from '../types';

interface ProgressContextType {
  progress: Progress | null;
  isLoading: boolean;
  xp: number;
  level: number;
  currentStreak: number;
  badges: Badge[];
  recordCorrectAnswer: (category: Category, xpEarned?: number) => void;
  recordIncorrectAnswer: (category: Category) => void;
  recordTestCompletion: (passed: boolean, isPerfect: boolean, xpEarned: number) => void;
  syncProgress: () => Promise<void>;
  getXpForNextLevel: () => number;
  getLevelProgress: () => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

// Calculate level from XP (exponential curve)
function calculateLevel(xp: number): number {
  // Level 1: 0 XP, Level 2: 100 XP, Level 3: 300 XP, etc.
  // Formula: XP needed = 100 * (level - 1) * level / 2
  let level = 1;
  let totalXpNeeded = 0;
  while (totalXpNeeded <= xp) {
    level++;
    totalXpNeeded += 100 * (level - 1);
  }
  return level - 1;
}

function getXpForLevel(level: number): number {
  // Total XP needed to reach this level
  let total = 0;
  for (let i = 1; i < level; i++) {
    total += 100 * i;
  }
  return total;
}

const defaultCategoryProgress: CategoryProgress = {
  questionsAnswered: 0,
  correctAnswers: 0,
  accuracy: 0,
  mastery: 0,
};

const defaultProgress: Progress = {
  userId: '',
  xp: 0,
  level: 1,
  currentStreak: 0,
  longestStreak: 0,
  testsCompleted: 0,
  perfectTests: 0,
  questionsAnswered: 0,
  correctAnswers: 0,
  categoryProgress: CATEGORIES.reduce(
    (acc, cat) => ({...acc, [cat]: {...defaultCategoryProgress}}),
    {} as Record<Category, CategoryProgress>,
  ),
  badges: [],
  weeklyXp: [0, 0, 0, 0, 0, 0, 0],
};

export function ProgressProvider({children}: {children: ReactNode}) {
  const {user, isAuthenticated} = useAuth();
  const [progress, setProgress] = useState<Progress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load progress when user changes
  useEffect(() => {
    if (isAuthenticated && user) {
      loadProgress();
    } else {
      setProgress(null);
      setIsLoading(false);
    }
  }, [isAuthenticated, user?.id]);

  const loadProgress = async () => {
    setIsLoading(true);
    try {
      // First try to load from local storage (for instant UI)
      const cached = StorageHelper.getObject<Progress>(STORAGE_KEYS.PROGRESS_DATA);
      if (cached) {
        setProgress(cached);
      }

      // Then fetch from server (source of truth)
      const response = await api.getProgress();
      if (response.success && response.data) {
        setProgress(response.data);
        StorageHelper.setObject(STORAGE_KEYS.PROGRESS_DATA, response.data);
      } else if (!cached) {
        // No cached data and server failed, use defaults
        setProgress({...defaultProgress, userId: user?.id || ''});
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
      if (!progress) {
        setProgress({...defaultProgress, userId: user?.id || ''});
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateProgress = useCallback((updater: (prev: Progress) => Progress) => {
    setProgress(prev => {
      if (!prev) return prev;
      const updated = updater(prev);
      // Recalculate level
      updated.level = calculateLevel(updated.xp);
      // Save to local storage
      StorageHelper.setObject(STORAGE_KEYS.PROGRESS_DATA, updated);
      return updated;
    });
  }, []);

  const recordCorrectAnswer = useCallback(
    (category: Category, xpEarned = XP_CONFIG.correctAnswer) => {
      updateProgress(prev => {
        const catProgress = prev.categoryProgress[category] || {...defaultCategoryProgress};
        const newCatProgress: CategoryProgress = {
          ...catProgress,
          questionsAnswered: catProgress.questionsAnswered + 1,
          correctAnswers: catProgress.correctAnswers + 1,
          accuracy:
            ((catProgress.correctAnswers + 1) /
              (catProgress.questionsAnswered + 1)) *
            100,
          mastery: Math.min(
            100,
            catProgress.mastery + 2,
          ),
        };

        return {
          ...prev,
          xp: prev.xp + xpEarned,
          questionsAnswered: prev.questionsAnswered + 1,
          correctAnswers: prev.correctAnswers + 1,
          categoryProgress: {
            ...prev.categoryProgress,
            [category]: newCatProgress,
          },
        };
      });
    },
    [updateProgress],
  );

  const recordIncorrectAnswer = useCallback(
    (category: Category) => {
      updateProgress(prev => {
        const catProgress = prev.categoryProgress[category] || {...defaultCategoryProgress};
        const newCatProgress: CategoryProgress = {
          ...catProgress,
          questionsAnswered: catProgress.questionsAnswered + 1,
          accuracy:
            (catProgress.correctAnswers /
              (catProgress.questionsAnswered + 1)) *
            100,
          mastery: Math.max(0, catProgress.mastery - 1),
        };

        return {
          ...prev,
          questionsAnswered: prev.questionsAnswered + 1,
          categoryProgress: {
            ...prev.categoryProgress,
            [category]: newCatProgress,
          },
        };
      });
    },
    [updateProgress],
  );

  const recordTestCompletion = useCallback(
    (passed: boolean, isPerfect: boolean, xpEarned: number) => {
      updateProgress(prev => ({
        ...prev,
        xp: prev.xp + xpEarned,
        testsCompleted: prev.testsCompleted + 1,
        perfectTests: isPerfect ? prev.perfectTests + 1 : prev.perfectTests,
      }));
    },
    [updateProgress],
  );

  const syncProgress = useCallback(async () => {
    if (!progress) return;
    try {
      const response = await api.syncProgress(progress);
      if (response.success && response.data) {
        setProgress(response.data);
        StorageHelper.setObject(STORAGE_KEYS.PROGRESS_DATA, response.data);
      }
    } catch (error) {
      console.error('Failed to sync progress:', error);
    }
  }, [progress]);

  const getXpForNextLevel = useCallback((): number => {
    if (!progress) return 100;
    const currentLevelXp = getXpForLevel(progress.level);
    const nextLevelXp = getXpForLevel(progress.level + 1);
    return nextLevelXp - currentLevelXp;
  }, [progress]);

  const getLevelProgress = useCallback((): number => {
    if (!progress) return 0;
    const currentLevelXp = getXpForLevel(progress.level);
    const nextLevelXp = getXpForLevel(progress.level + 1);
    const progressInLevel = progress.xp - currentLevelXp;
    const levelRange = nextLevelXp - currentLevelXp;
    return (progressInLevel / levelRange) * 100;
  }, [progress]);

  const value: ProgressContextType = {
    progress,
    isLoading,
    xp: progress?.xp ?? 0,
    level: progress?.level ?? 1,
    currentStreak: progress?.currentStreak ?? 0,
    badges: progress?.badges ?? [],
    recordCorrectAnswer,
    recordIncorrectAnswer,
    recordTestCompletion,
    syncProgress,
    getXpForNextLevel,
    getLevelProgress,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextType {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
