import { pb, User } from './pocketbase';

export interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  avatar?: string;
  xp: number;
  level: number;
  streak: number;
  badges: number;
  isCurrentUser?: boolean;
}

export interface LeaderboardData {
  entries: LeaderboardEntry[];
  userRank?: number;
  totalUsers: number;
  period: 'weekly' | 'allTime';
}

// Demo leaderboard data for when no backend is configured
const DEMO_NAMES = [
  'Sarah M.', 'Michael T.', 'Emily R.', 'David K.', 'Jessica L.',
  'Chris P.', 'Amanda S.', 'Ryan W.', 'Nicole B.', 'Kevin D.',
  'Lauren H.', 'Jason C.', 'Ashley G.', 'Brandon F.', 'Stephanie N.',
  'Matthew Y.', 'Megan O.', 'Andrew J.', 'Rachel V.', 'Joshua Z.',
];

const generateDemoLeaderboard = (
  period: 'weekly' | 'allTime',
  currentUserXp: number = 0,
  currentUserName: string = 'You'
): LeaderboardData => {
  // Generate random but consistent entries
  const seed = period === 'weekly' ? 42 : 137;
  const seededRandom = (i: number) => {
    const x = Math.sin(seed + i) * 10000;
    return x - Math.floor(x);
  };

  let entries: LeaderboardEntry[] = DEMO_NAMES.map((name, i) => {
    const baseXp = period === 'weekly'
      ? Math.floor(seededRandom(i) * 2000) + 500
      : Math.floor(seededRandom(i) * 10000) + 1000;

    return {
      id: `demo-${i}`,
      rank: 0,
      name,
      xp: baseXp,
      level: Math.floor(baseXp / 1000) + 1,
      streak: Math.floor(seededRandom(i + 100) * 30),
      badges: Math.floor(seededRandom(i + 200) * 16),
    };
  });

  // Add current user if they have XP
  if (currentUserXp > 0) {
    entries.push({
      id: 'current-user',
      rank: 0,
      name: currentUserName,
      xp: currentUserXp,
      level: Math.floor(currentUserXp / 1000) + 1,
      streak: 0,
      badges: 0,
      isCurrentUser: true,
    });
  }

  // Sort by XP and assign ranks
  entries.sort((a, b) => b.xp - a.xp);
  entries = entries.map((entry, i) => ({ ...entry, rank: i + 1 }));

  const userEntry = entries.find(e => e.isCurrentUser);

  return {
    entries: entries.slice(0, 20),
    userRank: userEntry?.rank,
    totalUsers: entries.length + Math.floor(seededRandom(999) * 500) + 100,
    period,
  };
};

/**
 * Fetch leaderboard data from the backend
 */
export const fetchLeaderboard = async (
  period: 'weekly' | 'allTime',
  limit: number = 20
): Promise<LeaderboardData> => {
  // Check if backend is configured
  if (!pb.baseURL || pb.baseURL.includes('localhost:8090')) {
    // Use demo data
    const storedProgress = localStorage.getItem('ontario_driveprep_progress');
    let userXp = 0;
    let userName = 'You';

    if (storedProgress) {
      const progress = JSON.parse(storedProgress);
      userXp = progress.xp || 0;
    }

    if (pb.authStore.record) {
      const user = pb.authStore.record as User;
      userName = user.name || 'You';
      userXp = user.xp || userXp;
    }

    return generateDemoLeaderboard(period, userXp, userName);
  }

  try {
    const response = await fetch(
      `${pb.baseURL}/api/leaderboard?period=${period}&limit=${limit}`,
      {
        headers: {
          'Authorization': pb.authStore.token || '',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch leaderboard');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    // Fallback to demo data on error
    return generateDemoLeaderboard(period);
  }
};

/**
 * Get user's rank in the leaderboard
 */
export const getUserRank = async (
  userId: string,
  period: 'weekly' | 'allTime'
): Promise<number | null> => {
  if (!pb.baseURL || pb.baseURL.includes('localhost:8090')) {
    return null;
  }

  try {
    const response = await fetch(
      `${pb.baseURL}/api/leaderboard/rank/${userId}?period=${period}`,
      {
        headers: {
          'Authorization': pb.authStore.token || '',
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.rank;
  } catch (error) {
    console.error('Error fetching user rank:', error);
    return null;
  }
};

/**
 * Get users near the current user in the leaderboard
 */
export const getNearbyUsers = async (
  userId: string,
  period: 'weekly' | 'allTime',
  range: number = 2
): Promise<LeaderboardEntry[]> => {
  if (!pb.baseURL || pb.baseURL.includes('localhost:8090')) {
    return [];
  }

  try {
    const response = await fetch(
      `${pb.baseURL}/api/leaderboard/nearby/${userId}?period=${period}&range=${range}`,
      {
        headers: {
          'Authorization': pb.authStore.token || '',
        },
      }
    );

    if (!response.ok) {
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching nearby users:', error);
    return [];
  }
};

// Social sharing utilities
export interface ShareData {
  title: string;
  text: string;
  url?: string;
}

export const generateShareText = (
  type: 'progress' | 'badge' | 'level' | 'streak' | 'test',
  data: Record<string, unknown>
): ShareData => {
  const baseUrl = window.location.origin;

  switch (type) {
    case 'progress':
      return {
        title: 'My G1 Progress',
        text: `I've completed ${data.questionsCompleted} questions with ${data.accuracy}% accuracy on Ontario DrivePrep! Getting ready for my G1 test.`,
        url: baseUrl,
      };
    case 'badge':
      return {
        title: 'New Badge Unlocked!',
        text: `I just earned the "${data.badgeName}" badge on Ontario DrivePrep! ${data.badgeIcon}`,
        url: baseUrl,
      };
    case 'level':
      return {
        title: 'Level Up!',
        text: `I reached Level ${data.level} (${data.levelName}) on Ontario DrivePrep! ${data.levelIcon}`,
        url: baseUrl,
      };
    case 'streak':
      return {
        title: 'Study Streak!',
        text: `I'm on a ${data.streak}-day study streak on Ontario DrivePrep! Consistency is key for passing the G1 test.`,
        url: baseUrl,
      };
    case 'test':
      return {
        title: 'Test Result',
        text: `I scored ${data.score}/${data.total} (${data.percentage}%) on my G1 practice test! ${data.passed ? 'Passed!' : 'Keep practicing!'}`,
        url: baseUrl,
      };
    default:
      return {
        title: 'Ontario DrivePrep',
        text: 'Practice for your Ontario G1 driving test!',
        url: baseUrl,
      };
  }
};

export const shareContent = async (shareData: ShareData): Promise<boolean> => {
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return true;
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Error sharing:', error);
      }
      return false;
    }
  }

  // Fallback: copy to clipboard
  try {
    await navigator.clipboard.writeText(`${shareData.title}\n\n${shareData.text}\n\n${shareData.url || ''}`);
    return true;
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return false;
  }
};

// Challenge friend utilities
export interface Challenge {
  id: string;
  challengerId: string;
  challengerName: string;
  challengedId?: string;
  challengedName?: string;
  type: 'questions' | 'test' | 'streak';
  target: number;
  status: 'pending' | 'accepted' | 'completed' | 'expired';
  createdAt: string;
  expiresAt: string;
  challengerProgress: number;
  challengedProgress: number;
  winnerId?: string;
}

export const createChallengeLink = (
  type: 'questions' | 'test' | 'streak',
  target: number,
  userName: string
): string => {
  const params = new URLSearchParams({
    type,
    target: target.toString(),
    from: userName,
  });
  return `${window.location.origin}/challenge?${params.toString()}`;
};

export const parseChallengeLink = (
  url: string
): { type: string; target: number; from: string } | null => {
  try {
    const urlObj = new URL(url);
    const type = urlObj.searchParams.get('type');
    const target = urlObj.searchParams.get('target');
    const from = urlObj.searchParams.get('from');

    if (!type || !target || !from) return null;

    return {
      type,
      target: parseInt(target, 10),
      from,
    };
  } catch {
    return null;
  }
};
