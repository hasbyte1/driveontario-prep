import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { pb, User, clearAuth, getCurrentUser, isAuthenticated } from '@/lib/pocketbase';
import { getStoredProgress, saveProgress, type UserProgress as LocalProgress } from '@/utils/storage';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  syncProgress: () => Promise<void>;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  authModalMode: 'login' | 'signup';
  setAuthModalMode: (mode: 'login' | 'signup') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Check if we're in demo/offline mode (no backend configured)
const isDemoMode = !import.meta.env.VITE_POCKETBASE_URL;

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      if (isDemoMode) {
        setIsLoading(false);
        return;
      }

      try {
        if (pb.authStore.isValid) {
          // Refresh auth token
          await pb.collection('users').authRefresh();
          setUser(getCurrentUser());
        }
      } catch (error) {
        console.error('Auth refresh failed:', error);
        clearAuth();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    // Subscribe to auth changes
    const unsubscribe = pb.authStore.onChange((token, model) => {
      setUser(model as User | null);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    if (isDemoMode) {
      // Demo mode: simulate login
      toast.success('Demo mode: Logged in successfully');
      const demoUser: User = {
        id: 'demo-user',
        email,
        name: email.split('@')[0],
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        xp: 0,
        level: 1,
        streak: 0,
        longestStreak: 0,
        questionsCompleted: 0,
        questionsCorrect: 0,
        badges: [],
        isPremium: false,
        premiumPlan: 'free',
      };
      setUser(demoUser);
      setShowAuthModal(false);
      return true;
    }

    try {
      setIsLoading(true);
      await pb.collection('users').authWithPassword(email, password);
      setUser(getCurrentUser());
      toast.success('Welcome back!');
      setShowAuthModal(false);

      // Sync local progress to server
      await syncProgress();

      return true;
    } catch (error: any) {
      console.error('Login failed:', error);
      toast.error(error.message || 'Login failed. Please check your credentials.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    if (isDemoMode) {
      // Demo mode: simulate signup
      toast.success('Demo mode: Account created successfully');
      const demoUser: User = {
        id: 'demo-user-' + Date.now(),
        email,
        name,
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        xp: 0,
        level: 1,
        streak: 0,
        longestStreak: 0,
        questionsCompleted: 0,
        questionsCorrect: 0,
        badges: [],
        isPremium: false,
        premiumPlan: 'free',
      };
      setUser(demoUser);
      setShowAuthModal(false);
      return true;
    }

    try {
      setIsLoading(true);

      // Get local progress to initialize account
      const localProgress = getStoredProgress();

      // Create user with initial progress data
      await pb.collection('users').create({
        email,
        password,
        passwordConfirm: password,
        name,
        xp: localProgress.xp,
        level: 1,
        streak: localProgress.streak,
        longestStreak: localProgress.longestStreak,
        questionsCompleted: localProgress.questionsCompleted,
        questionsCorrect: localProgress.questionsCorrect,
        badges: localProgress.badges,
        isPremium: false,
        premiumPlan: 'free',
      });

      // Auto-login after signup
      await pb.collection('users').authWithPassword(email, password);
      setUser(getCurrentUser());

      toast.success('Account created! Welcome to DrivePrep!');
      setShowAuthModal(false);

      return true;
    } catch (error: any) {
      console.error('Signup failed:', error);
      toast.error(error.message || 'Signup failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    if (isDemoMode) {
      toast.info('Google login is not available in demo mode');
      return false;
    }

    try {
      setIsLoading(true);
      const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' });

      // Update user name from OAuth if not set
      if (authData.meta?.name && !authData.record.name) {
        await pb.collection('users').update(authData.record.id, {
          name: authData.meta.name,
        });
      }

      setUser(getCurrentUser());
      toast.success('Welcome!');
      setShowAuthModal(false);

      await syncProgress();

      return true;
    } catch (error: any) {
      console.error('Google login failed:', error);
      toast.error('Google login failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearAuth();
    setUser(null);
    toast.info('Logged out successfully');
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    if (!user) return false;

    if (isDemoMode) {
      setUser({ ...user, ...data });
      toast.success('Profile updated');
      return true;
    }

    try {
      const updated = await pb.collection('users').update(user.id, data);
      setUser(updated as User);
      toast.success('Profile updated');
      return true;
    } catch (error: any) {
      console.error('Profile update failed:', error);
      toast.error('Failed to update profile');
      return false;
    }
  };

  const syncProgress = async (): Promise<void> => {
    if (!user || isDemoMode) return;

    try {
      const localProgress = getStoredProgress();

      // Merge local progress with server progress (take highest values)
      const serverUser = await pb.collection('users').getOne(user.id);

      const mergedData = {
        xp: Math.max(localProgress.xp, serverUser.xp || 0),
        streak: Math.max(localProgress.streak, serverUser.streak || 0),
        longestStreak: Math.max(localProgress.longestStreak, serverUser.longestStreak || 0),
        questionsCompleted: Math.max(localProgress.questionsCompleted, serverUser.questionsCompleted || 0),
        questionsCorrect: Math.max(localProgress.questionsCorrect, serverUser.questionsCorrect || 0),
        badges: [...new Set([...localProgress.badges, ...(serverUser.badges || [])])],
      };

      // Update server
      await pb.collection('users').update(user.id, mergedData);

      // Update local storage with merged data
      const updatedLocal: LocalProgress = {
        ...localProgress,
        ...mergedData,
      };
      saveProgress(updatedLocal);

      setUser(prev => prev ? { ...prev, ...mergedData } : null);
    } catch (error) {
      console.error('Progress sync failed:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        loginWithGoogle,
        logout,
        updateProfile,
        syncProgress,
        showAuthModal,
        setShowAuthModal,
        authModalMode,
        setAuthModalMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
