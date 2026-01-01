import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import {useColorScheme} from 'react-native';
import notifee, {TriggerType, RepeatFrequency} from '@notifee/react-native';
import {StorageHelper, STORAGE_KEYS} from '../lib/storage';
import type {AppSettings} from '../types';

interface SettingsContextType {
  settings: AppSettings;
  theme: 'light' | 'dark';
  isDarkMode: boolean;
  updateSettings: (updates: Partial<AppSettings>) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleNotifications: (enabled: boolean) => Promise<void>;
  setDailyReminder: (time: string | null) => Promise<void>;
}

const defaultSettings: AppSettings = {
  theme: 'system',
  notificationsEnabled: true,
  soundEnabled: true,
  hapticEnabled: true,
  dailyReminderTime: '09:00',
  dailyGoal: 20,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({children}: {children: ReactNode}) {
  const systemColorScheme = useColorScheme();
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  // Load settings from storage
  useEffect(() => {
    const saved = StorageHelper.getObject<AppSettings>('app_settings');
    if (saved) {
      setSettings({...defaultSettings, ...saved});
    }
  }, []);

  // Compute actual theme based on setting
  const theme: 'light' | 'dark' =
    settings.theme === 'system'
      ? systemColorScheme === 'dark'
        ? 'dark'
        : 'light'
      : settings.theme;

  const isDarkMode = theme === 'dark';

  const saveSettings = useCallback((newSettings: AppSettings) => {
    StorageHelper.setObject('app_settings', newSettings);
    setSettings(newSettings);
  }, []);

  const updateSettings = useCallback(
    (updates: Partial<AppSettings>) => {
      const newSettings = {...settings, ...updates};
      saveSettings(newSettings);
    },
    [settings, saveSettings],
  );

  const setTheme = useCallback(
    (newTheme: 'light' | 'dark' | 'system') => {
      updateSettings({theme: newTheme});
    },
    [updateSettings],
  );

  const toggleNotifications = useCallback(
    async (enabled: boolean) => {
      if (enabled) {
        // Request permission
        const permission = await notifee.requestPermission();
        if (permission.authorizationStatus >= 1) {
          updateSettings({notificationsEnabled: true});

          // Re-schedule daily reminder if set
          if (settings.dailyReminderTime) {
            await scheduleDailyReminder(settings.dailyReminderTime);
          }
        }
      } else {
        // Cancel all scheduled notifications
        await notifee.cancelAllNotifications();
        updateSettings({notificationsEnabled: false});
      }
    },
    [settings.dailyReminderTime, updateSettings],
  );

  const scheduleDailyReminder = async (time: string) => {
    // Cancel existing reminders
    await notifee.cancelTriggerNotifications();

    // Parse time (HH:mm format)
    const [hours, minutes] = time.split(':').map(Number);

    // Create trigger for daily reminder
    const trigger = {
      type: TriggerType.TIMESTAMP as const,
      timestamp: getNextTriggerTime(hours, minutes),
      repeatFrequency: RepeatFrequency.DAILY,
    };

    await notifee.createTriggerNotification(
      {
        title: 'Time to Study!',
        body: 'Keep your streak going! Practice some G1 questions today.',
        android: {
          channelId: 'reminders',
          pressAction: {id: 'default'},
        },
        ios: {
          sound: 'default',
        },
      },
      trigger,
    );
  };

  const getNextTriggerTime = (hours: number, minutes: number): number => {
    const now = new Date();
    const trigger = new Date();
    trigger.setHours(hours, minutes, 0, 0);

    // If time already passed today, schedule for tomorrow
    if (trigger <= now) {
      trigger.setDate(trigger.getDate() + 1);
    }

    return trigger.getTime();
  };

  const setDailyReminder = useCallback(
    async (time: string | null) => {
      if (!time) {
        // Cancel daily reminder
        await notifee.cancelTriggerNotifications();
        updateSettings({dailyReminderTime: undefined});
      } else {
        // Schedule new reminder
        await scheduleDailyReminder(time);
        updateSettings({dailyReminderTime: time});
      }
    },
    [updateSettings],
  );

  const value: SettingsContextType = {
    settings,
    theme,
    isDarkMode,
    updateSettings,
    setTheme,
    toggleNotifications,
    setDailyReminder,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextType {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
