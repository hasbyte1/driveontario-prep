import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import {api} from '../lib/api';
import {
  StorageHelper,
  SecureStorageHelper,
  STORAGE_KEYS,
} from '../lib/storage';
import type {User, LoginCredentials, RegisterCredentials} from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isPremium: boolean;
  hasCompletedOnboarding: boolean;
  login: (credentials: LoginCredentials) => Promise<{success: boolean; error?: string}>;
  register: (credentials: RegisterCredentials) => Promise<{success: boolean; error?: string}>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children: ReactNode}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  // Load initial state from storage
  useEffect(() => {
    loadInitialState();
  }, []);

  const loadInitialState = async () => {
    try {
      // Check onboarding status
      const onboardingComplete = StorageHelper.getBoolean(
        STORAGE_KEYS.ONBOARDING_COMPLETE,
      );
      setHasCompletedOnboarding(onboardingComplete ?? false);

      // Check for existing auth token
      const token = await SecureStorageHelper.getSecure(STORAGE_KEYS.AUTH_TOKEN);

      if (token) {
        // Try to refresh user data
        const response = await api.getCurrentUser();
        if (response.success && response.data) {
          setUser(response.data as User);
        } else {
          // Token invalid, clear it
          await SecureStorageHelper.removeSecure(STORAGE_KEYS.AUTH_TOKEN);
        }
      }
    } catch (error) {
      console.error('Failed to load auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = useCallback(
    async (credentials: LoginCredentials): Promise<{success: boolean; error?: string}> => {
      try {
        const response = await api.login(credentials);

        if (response.success && response.data) {
          const {token, record} = response.data;

          // Store token securely
          await SecureStorageHelper.setSecure(STORAGE_KEYS.AUTH_TOKEN, token);

          // Store user data
          StorageHelper.setObject(STORAGE_KEYS.USER_DATA, record);

          setUser(record);
          return {success: true};
        }

        return {success: false, error: response.error || 'Login failed'};
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Login failed',
        };
      }
    },
    [],
  );

  const register = useCallback(
    async (credentials: RegisterCredentials): Promise<{success: boolean; error?: string}> => {
      try {
        const response = await api.register(credentials);

        if (response.success && response.data) {
          // Auto-login after registration
          return login({
            email: credentials.email,
            password: credentials.password,
          });
        }

        return {success: false, error: response.error || 'Registration failed'};
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Registration failed',
        };
      }
    },
    [login],
  );

  const logout = useCallback(async () => {
    try {
      // Clear auth token
      await SecureStorageHelper.removeSecure(STORAGE_KEYS.AUTH_TOKEN);

      // Clear user data
      StorageHelper.delete(STORAGE_KEYS.USER_DATA);

      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const response = await api.getCurrentUser();
      if (response.success && response.data) {
        setUser(response.data as User);
        StorageHelper.setObject(STORAGE_KEYS.USER_DATA, response.data);
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  }, []);

  const completeOnboarding = useCallback(() => {
    StorageHelper.setBoolean(STORAGE_KEYS.ONBOARDING_COMPLETE, true);
    setHasCompletedOnboarding(true);
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    isPremium: user?.isPremium ?? false,
    hasCompletedOnboarding,
    login,
    register,
    logout,
    refreshUser,
    completeOnboarding,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
