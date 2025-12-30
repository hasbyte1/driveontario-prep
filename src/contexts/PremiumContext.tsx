import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Premium feature limits
export const FREE_LIMITS = {
  questionsPerDay: 50,
  testsPerDay: 3,
  flashcardsAccess: 30, // First 30 cards only
  testHistoryDays: 7,
  streakFreezePerMonth: 0,
  adsEnabled: true,
  offlineMode: false,
  detailedAnalytics: false,
  allBadges: false, // Premium-exclusive badges
  prioritySupport: false,
} as const;

export const PREMIUM_LIMITS = {
  questionsPerDay: Infinity,
  testsPerDay: Infinity,
  flashcardsAccess: Infinity,
  testHistoryDays: Infinity,
  streakFreezePerMonth: 3,
  adsEnabled: false,
  offlineMode: true,
  detailedAnalytics: true,
  allBadges: true,
  prioritySupport: true,
} as const;

export const PRICING = {
  monthly: {
    price: 9.99,
    period: 'month',
    savings: null,
  },
  yearly: {
    price: 59.99,
    period: 'year',
    savings: '50%',
    monthlyEquivalent: 4.99,
  },
  lifetime: {
    price: 29.99,
    period: 'once',
    savings: 'Best Value',
  },
} as const;

export type PlanType = 'free' | 'monthly' | 'yearly' | 'lifetime';

interface PremiumState {
  isPremium: boolean;
  plan: PlanType;
  expiresAt: string | null;
  // Daily usage tracking
  questionsToday: number;
  testsToday: number;
  lastResetDate: string;
}

interface PremiumContextType {
  state: PremiumState;
  isPremium: boolean;
  canAccessFeature: (feature: keyof typeof FREE_LIMITS) => boolean;
  getRemainingQuestions: () => number;
  getRemainingTests: () => number;
  incrementQuestionCount: () => void;
  incrementTestCount: () => void;
  upgradeToPremium: (plan: PlanType) => void;
  cancelPremium: () => void;
  showPaywall: boolean;
  setShowPaywall: (show: boolean) => void;
  paywallFeature: string | null;
  triggerPaywall: (feature: string) => void;
}

const PREMIUM_STORAGE_KEY = 'ontario_driveprep_premium';

const getDefaultState = (): PremiumState => ({
  isPremium: false,
  plan: 'free',
  expiresAt: null,
  questionsToday: 0,
  testsToday: 0,
  lastResetDate: new Date().toISOString().split('T')[0],
});

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

export const PremiumProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PremiumState>(() => {
    const stored = localStorage.getItem(PREMIUM_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...getDefaultState(), ...parsed };
    }
    return getDefaultState();
  });

  const [showPaywall, setShowPaywall] = useState(false);
  const [paywallFeature, setPaywallFeature] = useState<string | null>(null);

  // Reset daily counts if it's a new day
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (state.lastResetDate !== today) {
      setState(prev => ({
        ...prev,
        questionsToday: 0,
        testsToday: 0,
        lastResetDate: today,
      }));
    }
  }, [state.lastResetDate]);

  // Check if premium has expired
  useEffect(() => {
    if (state.isPremium && state.expiresAt && state.plan !== 'lifetime') {
      const expiryDate = new Date(state.expiresAt);
      if (expiryDate < new Date()) {
        setState(prev => ({
          ...prev,
          isPremium: false,
          plan: 'free',
          expiresAt: null,
        }));
      }
    }
  }, [state.isPremium, state.expiresAt, state.plan]);

  // Persist state changes
  useEffect(() => {
    localStorage.setItem(PREMIUM_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const isPremium = state.isPremium;

  const canAccessFeature = (feature: keyof typeof FREE_LIMITS): boolean => {
    if (isPremium) return true;

    const limit = FREE_LIMITS[feature];
    if (typeof limit === 'boolean') return limit;

    switch (feature) {
      case 'questionsPerDay':
        return state.questionsToday < FREE_LIMITS.questionsPerDay;
      case 'testsPerDay':
        return state.testsToday < FREE_LIMITS.testsPerDay;
      default:
        return true;
    }
  };

  const getRemainingQuestions = (): number => {
    if (isPremium) return Infinity;
    return Math.max(0, FREE_LIMITS.questionsPerDay - state.questionsToday);
  };

  const getRemainingTests = (): number => {
    if (isPremium) return Infinity;
    return Math.max(0, FREE_LIMITS.testsPerDay - state.testsToday);
  };

  const incrementQuestionCount = () => {
    if (!isPremium) {
      setState(prev => ({
        ...prev,
        questionsToday: prev.questionsToday + 1,
      }));
    }
  };

  const incrementTestCount = () => {
    if (!isPremium) {
      setState(prev => ({
        ...prev,
        testsToday: prev.testsToday + 1,
      }));
    }
  };

  const upgradeToPremium = (plan: PlanType) => {
    let expiresAt: string | null = null;

    if (plan === 'monthly') {
      const date = new Date();
      date.setMonth(date.getMonth() + 1);
      expiresAt = date.toISOString();
    } else if (plan === 'yearly') {
      const date = new Date();
      date.setFullYear(date.getFullYear() + 1);
      expiresAt = date.toISOString();
    }
    // lifetime has no expiry

    setState(prev => ({
      ...prev,
      isPremium: true,
      plan,
      expiresAt,
    }));
    setShowPaywall(false);
  };

  const cancelPremium = () => {
    setState(prev => ({
      ...prev,
      isPremium: false,
      plan: 'free',
      expiresAt: null,
    }));
  };

  const triggerPaywall = (feature: string) => {
    setPaywallFeature(feature);
    setShowPaywall(true);
  };

  return (
    <PremiumContext.Provider
      value={{
        state,
        isPremium,
        canAccessFeature,
        getRemainingQuestions,
        getRemainingTests,
        incrementQuestionCount,
        incrementTestCount,
        upgradeToPremium,
        cancelPremium,
        showPaywall,
        setShowPaywall,
        paywallFeature,
        triggerPaywall,
      }}
    >
      {children}
    </PremiumContext.Provider>
  );
};

export const usePremium = (): PremiumContextType => {
  const context = useContext(PremiumContext);
  if (!context) {
    throw new Error('usePremium must be used within a PremiumProvider');
  }
  return context;
};

// Premium feature descriptions for marketing
export const PREMIUM_FEATURES = [
  {
    icon: '🎯',
    title: 'Unlimited Practice',
    description: 'No daily limits on questions or tests',
    free: '50 questions/day, 3 tests/day',
    premium: 'Unlimited',
  },
  {
    icon: '📊',
    title: 'Advanced Analytics',
    description: 'Detailed performance insights and weak area analysis',
    free: 'Basic stats only',
    premium: 'Full analytics dashboard',
  },
  {
    icon: '🔥',
    title: 'Streak Freeze',
    description: 'Protect your streak when life gets busy',
    free: 'No streak protection',
    premium: '3 freezes per month',
  },
  {
    icon: '📱',
    title: 'Offline Mode',
    description: 'Study anywhere without internet',
    free: 'Requires internet',
    premium: 'Full offline access',
  },
  {
    icon: '🏆',
    title: 'Exclusive Badges',
    description: 'Unlock premium-only achievements',
    free: '16 badges',
    premium: '25+ badges',
  },
  {
    icon: '🚫',
    title: 'Ad-Free Experience',
    description: 'Focus on learning without distractions',
    free: 'Ads between tests',
    premium: 'No ads ever',
  },
  {
    icon: '📚',
    title: 'Full Question Bank',
    description: 'Access all 500+ practice questions',
    free: '135 questions',
    premium: '500+ questions',
  },
  {
    icon: '📅',
    title: 'Unlimited History',
    description: 'Review all your past tests anytime',
    free: 'Last 7 days only',
    premium: 'Full history',
  },
];
