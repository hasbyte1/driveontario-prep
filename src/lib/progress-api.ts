/**
 * Progress API Client
 *
 * This module provides functions to interact with the server-side progress API.
 * It handles syncing local progress with server, XP transactions, and badge verification.
 * The server is the source of truth - local storage is used only for offline cache.
 */

import { pb } from './pocketbase';
import {
  UserProgress,
  getStoredProgress,
  saveProgress,
  checkAndAwardBadges,
  ALL_BADGES,
} from '@/utils/storage';

// Check if backend is configured and available
const isBackendAvailable = (): boolean => {
  return !!pb.baseURL && !pb.baseURL.includes('localhost:8090');
};

// ============================================
// Types
// ============================================

export interface ServerProgress {
  xp: number;
  level: number;
  streak: number;
  longestStreak: number;
  questionsCompleted: number;
  questionsCorrect: number;
  badges: string[];
  categoryProgress: Record<string, { correct: number; total: number }>;
  testHistory: unknown[];
  dailyChallenges: unknown[];
  dailyChallengeDate: string;
  fastestTestTime: number;
  bestCorrectStreak: number;
}

export interface SyncResponse {
  mergedProgress: ServerProgress;
  syncedAt: string;
  conflicts?: string[];
}

export interface XPResponse {
  newXP: number;
  newLevel: number;
  leveledUp: boolean;
}

export interface BadgeResponse {
  awarded: boolean;
  xpAwarded?: number;
  newXP?: number;
  newLevel?: number;
  leveledUp?: boolean;
  totalBadges?: number;
  reason?: string;
}

export interface CheckBadgesResponse {
  newBadges: string[];
  totalXPEarned: number;
  newXP: number;
  newLevel: number;
  totalBadges: number;
}

export interface StreakResponse {
  streak: number;
  longestStreak: number;
  xpEarned: number;
  newXP: number;
  newLevel: number;
  newLogin: boolean;
}

export interface XPTransaction {
  id: string;
  amount: number;
  reason: string;
  referenceId: string;
  referenceType: string;
  created: string;
}

// ============================================
// Progress Sync
// ============================================

/**
 * Fetch server progress and merge with local
 * Server is the source of truth
 */
export async function syncProgress(forceOverwrite: boolean = false): Promise<UserProgress | null> {
  if (!isBackendAvailable() || !pb.authStore.isValid) {
    return null;
  }

  try {
    const localProgress = getStoredProgress();

    const response = await fetch(`${pb.baseURL}/api/progress/sync`, {
      method: 'POST',
      headers: {
        'Authorization': pb.authStore.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        localProgress: {
          xp: localProgress.xp,
          level: Math.floor(localProgress.xp / 500) + 1, // Approximate level
          streak: localProgress.streak,
          longestStreak: localProgress.longestStreak,
          questionsCompleted: localProgress.questionsCompleted,
          questionsCorrect: localProgress.questionsCorrect,
          badges: localProgress.badges,
          categoryProgress: localProgress.categoryProgress,
          testHistory: localProgress.testHistory,
          dailyChallenges: localProgress.dailyChallenges,
          dailyChallengeDate: localProgress.dailyChallengeDate,
          fastestTestTime: localProgress.fastestTestTime || 0,
          bestCorrectStreak: localProgress.bestCorrectStreak,
        },
        forceOverwrite,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to sync progress');
    }

    const data: SyncResponse = await response.json();
    const merged = data.mergedProgress;

    // Update local progress with server data
    const updatedProgress: UserProgress = {
      ...localProgress,
      xp: merged.xp,
      totalXpEarned: Math.max(localProgress.totalXpEarned, merged.xp),
      streak: merged.streak,
      longestStreak: merged.longestStreak,
      questionsCompleted: merged.questionsCompleted,
      questionsCorrect: merged.questionsCorrect,
      badges: merged.badges,
      categoryProgress: merged.categoryProgress || localProgress.categoryProgress,
      testHistory: (merged.testHistory as UserProgress['testHistory']) || localProgress.testHistory,
      dailyChallenges: (merged.dailyChallenges as UserProgress['dailyChallenges']) || localProgress.dailyChallenges,
      dailyChallengeDate: merged.dailyChallengeDate || localProgress.dailyChallengeDate,
      fastestTestTime: merged.fastestTestTime || localProgress.fastestTestTime,
      bestCorrectStreak: merged.bestCorrectStreak || localProgress.bestCorrectStreak,
    };

    saveProgress(updatedProgress);
    return updatedProgress;
  } catch (error) {
    console.error('Error syncing progress:', error);
    return null;
  }
}

/**
 * Get server progress (read-only, no sync)
 */
export async function getServerProgress(): Promise<ServerProgress | null> {
  if (!isBackendAvailable() || !pb.authStore.isValid) {
    return null;
  }

  try {
    const response = await fetch(`${pb.baseURL}/api/progress`, {
      headers: {
        'Authorization': pb.authStore.token,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch progress');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching progress:', error);
    return null;
  }
}

// ============================================
// XP Management
// ============================================

/**
 * Add XP through the server (creates audit log)
 */
export async function addXP(
  amount: number,
  reason: string,
  options?: {
    referenceId?: string;
    referenceType?: 'question' | 'test' | 'badge' | 'streak' | 'daily_challenge';
    sessionId?: string;
    metadata?: Record<string, unknown>;
  }
): Promise<XPResponse | null> {
  if (!isBackendAvailable() || !pb.authStore.isValid) {
    // Fallback to local XP update
    const progress = getStoredProgress();
    progress.xp += amount;
    progress.totalXpEarned += amount;
    saveProgress(progress);
    return {
      newXP: progress.xp,
      newLevel: Math.floor(progress.xp / 500) + 1,
      leveledUp: false,
    };
  }

  try {
    const response = await fetch(`${pb.baseURL}/api/progress/add-xp`, {
      method: 'POST',
      headers: {
        'Authorization': pb.authStore.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        reason,
        referenceId: options?.referenceId,
        referenceType: options?.referenceType,
        sessionId: options?.sessionId,
        metadata: options?.metadata,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to add XP');
    }

    const data: XPResponse = await response.json();

    // Update local cache
    const progress = getStoredProgress();
    progress.xp = data.newXP;
    progress.totalXpEarned = Math.max(progress.totalXpEarned, data.newXP);
    saveProgress(progress);

    return data;
  } catch (error) {
    console.error('Error adding XP:', error);
    // Fallback to local
    const progress = getStoredProgress();
    progress.xp += amount;
    progress.totalXpEarned += amount;
    saveProgress(progress);
    return {
      newXP: progress.xp,
      newLevel: Math.floor(progress.xp / 500) + 1,
      leveledUp: false,
    };
  }
}

/**
 * Get XP transaction history
 */
export async function getXPHistory(limit: number = 50): Promise<XPTransaction[]> {
  if (!isBackendAvailable() || !pb.authStore.isValid) {
    return [];
  }

  try {
    const response = await fetch(`${pb.baseURL}/api/progress/xp-history?limit=${limit}`, {
      headers: {
        'Authorization': pb.authStore.token,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch XP history');
    }

    const data = await response.json();
    return data.transactions;
  } catch (error) {
    console.error('Error fetching XP history:', error);
    return [];
  }
}

// ============================================
// Badge Management
// ============================================

/**
 * Award a badge through the server (with verification)
 */
export async function awardBadge(
  badgeId: string,
  verificationData?: Record<string, unknown>
): Promise<BadgeResponse> {
  if (!isBackendAvailable() || !pb.authStore.isValid) {
    // Fallback to local badge award
    const progress = getStoredProgress();
    if (progress.badges.includes(badgeId)) {
      return { awarded: false, reason: 'Badge already earned' };
    }

    const badgeInfo = ALL_BADGES[badgeId];
    if (!badgeInfo) {
      return { awarded: false, reason: 'Unknown badge' };
    }

    progress.badges.push(badgeId);
    progress.xp += badgeInfo.xpReward;
    progress.totalXpEarned += badgeInfo.xpReward;
    saveProgress(progress);

    return {
      awarded: true,
      xpAwarded: badgeInfo.xpReward,
      newXP: progress.xp,
      totalBadges: progress.badges.length,
    };
  }

  try {
    const response = await fetch(`${pb.baseURL}/api/progress/award-badge`, {
      method: 'POST',
      headers: {
        'Authorization': pb.authStore.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        badgeId,
        verificationData,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to award badge');
    }

    const data: BadgeResponse = await response.json();

    // Update local cache
    if (data.awarded) {
      const progress = getStoredProgress();
      if (!progress.badges.includes(badgeId)) {
        progress.badges.push(badgeId);
      }
      if (data.newXP) {
        progress.xp = data.newXP;
        progress.totalXpEarned = Math.max(progress.totalXpEarned, data.newXP);
      }
      saveProgress(progress);
    }

    return data;
  } catch (error) {
    console.error('Error awarding badge:', error);
    return { awarded: false, reason: 'Server error' };
  }
}

/**
 * Check and award all eligible badges
 */
export async function checkAndAwardAllBadges(): Promise<CheckBadgesResponse | null> {
  if (!isBackendAvailable() || !pb.authStore.isValid) {
    // Fallback to local badge check
    const progress = getStoredProgress();
    const newBadges = checkAndAwardBadges(progress);

    if (newBadges.length > 0) {
      let totalXP = 0;
      for (const badgeId of newBadges) {
        progress.badges.push(badgeId);
        const badgeInfo = ALL_BADGES[badgeId];
        if (badgeInfo) {
          totalXP += badgeInfo.xpReward;
        }
      }
      progress.xp += totalXP;
      progress.totalXpEarned += totalXP;
      saveProgress(progress);

      return {
        newBadges,
        totalXPEarned: totalXP,
        newXP: progress.xp,
        newLevel: Math.floor(progress.xp / 500) + 1,
        totalBadges: progress.badges.length,
      };
    }

    return null;
  }

  try {
    const response = await fetch(`${pb.baseURL}/api/progress/check-badges`, {
      method: 'POST',
      headers: {
        'Authorization': pb.authStore.token,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to check badges');
    }

    const data: CheckBadgesResponse = await response.json();

    // Update local cache
    if (data.newBadges.length > 0) {
      const progress = getStoredProgress();
      for (const badgeId of data.newBadges) {
        if (!progress.badges.includes(badgeId)) {
          progress.badges.push(badgeId);
        }
      }
      progress.xp = data.newXP;
      progress.totalXpEarned = Math.max(progress.totalXpEarned, data.newXP);
      saveProgress(progress);
    }

    return data.newBadges.length > 0 ? data : null;
  } catch (error) {
    console.error('Error checking badges:', error);
    return null;
  }
}

// ============================================
// Streak Management
// ============================================

/**
 * Update streak on daily login
 */
export async function updateStreak(): Promise<StreakResponse | null> {
  if (!isBackendAvailable() || !pb.authStore.isValid) {
    return null;
  }

  try {
    const response = await fetch(`${pb.baseURL}/api/progress/update-streak`, {
      method: 'POST',
      headers: {
        'Authorization': pb.authStore.token,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to update streak');
    }

    const data: StreakResponse = await response.json();

    // Update local cache
    const progress = getStoredProgress();
    progress.streak = data.streak;
    progress.longestStreak = data.longestStreak;
    if (data.newLogin) {
      progress.xp = data.newXP;
      progress.totalXpEarned = Math.max(progress.totalXpEarned, data.newXP);
      progress.loginDays += 1;
    }
    progress.lastActiveDate = new Date().toISOString().split('T')[0];
    saveProgress(progress);

    return data;
  } catch (error) {
    console.error('Error updating streak:', error);
    return null;
  }
}

// ============================================
// Progress Update Helpers
// ============================================

/**
 * Update progress fields on the server
 */
export async function updateProgress(
  updates: Partial<{
    xp: number;
    streak: number;
    longestStreak: number;
    questionsCompleted: number;
    questionsCorrect: number;
    badges: string[];
    categoryProgress: Record<string, { correct: number; total: number }>;
    testHistory: unknown[];
    dailyChallenges: unknown[];
    dailyChallengeDate: string;
    fastestTestTime: number;
    bestCorrectStreak: number;
  }>
): Promise<boolean> {
  if (!isBackendAvailable() || !pb.authStore.isValid) {
    // Just update local
    const progress = getStoredProgress();
    Object.assign(progress, updates);
    saveProgress(progress);
    return true;
  }

  try {
    const response = await fetch(`${pb.baseURL}/api/progress`, {
      method: 'PATCH',
      headers: {
        'Authorization': pb.authStore.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error('Failed to update progress');
    }

    // Update local cache
    const progress = getStoredProgress();
    Object.assign(progress, updates);
    saveProgress(progress);

    return true;
  } catch (error) {
    console.error('Error updating progress:', error);
    // Fallback to local update
    const progress = getStoredProgress();
    Object.assign(progress, updates);
    saveProgress(progress);
    return false;
  }
}

// ============================================
// Initialization
// ============================================

/**
 * Initialize progress sync on app load
 * This should be called when the user logs in or on app startup if authenticated
 */
export async function initializeProgressSync(): Promise<{
  synced: boolean;
  streakUpdated: boolean;
  newBadges: string[];
  xpEarned: number;
}> {
  const result = {
    synced: false,
    streakUpdated: false,
    newBadges: [] as string[],
    xpEarned: 0,
  };

  if (!isBackendAvailable() || !pb.authStore.isValid) {
    return result;
  }

  try {
    // 1. Sync progress with server
    const syncResult = await syncProgress();
    result.synced = syncResult !== null;

    // 2. Update streak for daily login
    const streakResult = await updateStreak();
    if (streakResult && streakResult.newLogin) {
      result.streakUpdated = true;
      result.xpEarned += streakResult.xpEarned;
    }

    // 3. Check for any newly eligible badges
    const badgeResult = await checkAndAwardAllBadges();
    if (badgeResult) {
      result.newBadges = badgeResult.newBadges;
      result.xpEarned += badgeResult.totalXPEarned;
    }

    return result;
  } catch (error) {
    console.error('Error initializing progress sync:', error);
    return result;
  }
}
