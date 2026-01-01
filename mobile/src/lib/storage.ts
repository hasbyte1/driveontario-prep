import {MMKV} from 'react-native-mmkv';
import EncryptedStorage from 'react-native-encrypted-storage';

// Create MMKV instances
// Default storage for general app data
export const storage = new MMKV({
  id: 'driveontario-storage',
});

// Encrypted storage for sensitive data (uses secure enclave)
export const secureStorage = new MMKV({
  id: 'driveontario-secure',
  encryptionKey: 'driveontario-encryption-key-v1',
});

// Storage keys
export const STORAGE_KEYS = {
  // Auth
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  REFRESH_TOKEN: 'refresh_token',

  // Progress
  PROGRESS_DATA: 'progress_data',
  XP_TOTAL: 'xp_total',
  CURRENT_STREAK: 'current_streak',
  BADGES: 'badges',
  TEST_HISTORY: 'test_history',

  // Settings
  THEME: 'theme',
  NOTIFICATIONS_ENABLED: 'notifications_enabled',
  SOUND_ENABLED: 'sound_enabled',
  HAPTIC_ENABLED: 'haptic_enabled',
  DAILY_REMINDER_TIME: 'daily_reminder_time',

  // Offline
  OFFLINE_TOKEN: 'offline_token',
  CACHED_QUESTIONS: 'cached_questions',
  CACHE_EXPIRES_AT: 'cache_expires_at',

  // Premium
  IS_PREMIUM: 'is_premium',
  PREMIUM_PLAN: 'premium_plan',
  LICENSE_KEY: 'license_key',

  // App State
  ONBOARDING_COMPLETE: 'onboarding_complete',
  LAST_SYNC: 'last_sync',
} as const;

// Type-safe storage helpers
export const StorageHelper = {
  // String operations
  getString: (key: string): string | undefined => {
    return storage.getString(key);
  },

  setString: (key: string, value: string): void => {
    storage.set(key, value);
  },

  // Number operations
  getNumber: (key: string): number | undefined => {
    return storage.getNumber(key);
  },

  setNumber: (key: string, value: number): void => {
    storage.set(key, value);
  },

  // Boolean operations
  getBoolean: (key: string): boolean | undefined => {
    return storage.getBoolean(key);
  },

  setBoolean: (key: string, value: boolean): void => {
    storage.set(key, value);
  },

  // Object operations (JSON serialized)
  getObject: <T>(key: string): T | null => {
    const value = storage.getString(key);
    if (!value) return null;
    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  },

  setObject: <T>(key: string, value: T): void => {
    storage.set(key, JSON.stringify(value));
  },

  // Delete
  delete: (key: string): void => {
    storage.delete(key);
  },

  // Clear all
  clearAll: (): void => {
    storage.clearAll();
  },

  // Check if key exists
  contains: (key: string): boolean => {
    return storage.contains(key);
  },

  // Get all keys
  getAllKeys: (): string[] => {
    return storage.getAllKeys();
  },
};

// Secure storage helpers (for highly sensitive data like tokens)
export const SecureStorageHelper = {
  // Use encrypted-storage for most sensitive data (stored in Keychain/Keystore)
  getSecure: async (key: string): Promise<string | null> => {
    try {
      const value = await EncryptedStorage.getItem(key);
      return value;
    } catch {
      return null;
    }
  },

  setSecure: async (key: string, value: string): Promise<void> => {
    try {
      await EncryptedStorage.setItem(key, value);
    } catch (error) {
      console.error('Failed to store secure item:', error);
    }
  },

  removeSecure: async (key: string): Promise<void> => {
    try {
      await EncryptedStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove secure item:', error);
    }
  },

  clearSecure: async (): Promise<void> => {
    try {
      await EncryptedStorage.clear();
    } catch (error) {
      console.error('Failed to clear secure storage:', error);
    }
  },

  // Use MMKV encrypted instance for less sensitive but still private data
  getString: (key: string): string | undefined => {
    return secureStorage.getString(key);
  },

  setString: (key: string, value: string): void => {
    secureStorage.set(key, value);
  },

  getObject: <T>(key: string): T | null => {
    const value = secureStorage.getString(key);
    if (!value) return null;
    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  },

  setObject: <T>(key: string, value: T): void => {
    secureStorage.set(key, JSON.stringify(value));
  },

  delete: (key: string): void => {
    secureStorage.delete(key);
  },
};

// Zustand persist storage adapter for MMKV
export const zustandMMKVStorage = {
  getItem: (name: string) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  setItem: (name: string, value: string) => {
    storage.set(name, value);
  },
  removeItem: (name: string) => {
    storage.delete(name);
  },
};
