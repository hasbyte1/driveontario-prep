import React from 'react';
import {View, Text, TouchableOpacity, ScrollView, Switch, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSettings} from '../contexts/SettingsContext';
import {useAuth} from '../contexts/AuthContext';

export function SettingsScreen() {
  const {settings, updateSettings, setTheme, toggleNotifications, setDailyReminder} =
    useSettings();
  const {logout} = useAuth();

  const handleThemeChange = () => {
    Alert.alert('Select Theme', 'Choose your preferred theme', [
      {text: 'Light', onPress: () => setTheme('light')},
      {text: 'Dark', onPress: () => setTheme('dark')},
      {text: 'System', onPress: () => setTheme('system')},
      {text: 'Cancel', style: 'cancel'},
    ]);
  };

  const handleReminderChange = () => {
    if (!settings.dailyReminderTime) {
      Alert.alert('Set Reminder Time', 'Choose when to receive daily reminders', [
        {text: '8:00 AM', onPress: () => setDailyReminder('08:00')},
        {text: '9:00 AM', onPress: () => setDailyReminder('09:00')},
        {text: '6:00 PM', onPress: () => setDailyReminder('18:00')},
        {text: '8:00 PM', onPress: () => setDailyReminder('20:00')},
        {text: 'Cancel', style: 'cancel'},
      ]);
    } else {
      setDailyReminder(null);
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Logout', style: 'destructive', onPress: () => logout()},
    ]);
  };

  const themeLabel =
    settings.theme === 'system'
      ? 'System'
      : settings.theme === 'dark'
        ? 'Dark'
        : 'Light';

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      <ScrollView className="flex-1">
        {/* Appearance */}
        <View className="px-6 pt-6">
          <Text className="text-sm font-medium text-gray-500 uppercase mb-3">
            Appearance
          </Text>
          <View className="bg-white rounded-xl overflow-hidden">
            <TouchableOpacity
              className="flex-row items-center justify-between p-4 border-b border-gray-100"
              onPress={handleThemeChange}>
              <View className="flex-row items-center">
                <Text className="text-xl mr-3">🎨</Text>
                <Text className="text-gray-900">Theme</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-gray-500 mr-2">{themeLabel}</Text>
                <Text className="text-gray-400">→</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Notifications */}
        <View className="px-6 pt-6">
          <Text className="text-sm font-medium text-gray-500 uppercase mb-3">
            Notifications
          </Text>
          <View className="bg-white rounded-xl overflow-hidden">
            <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
              <View className="flex-row items-center flex-1">
                <Text className="text-xl mr-3">🔔</Text>
                <View className="flex-1">
                  <Text className="text-gray-900">Push Notifications</Text>
                  <Text className="text-gray-500 text-sm">
                    Receive updates and reminders
                  </Text>
                </View>
              </View>
              <Switch
                value={settings.notificationsEnabled}
                onValueChange={toggleNotifications}
                trackColor={{false: '#e5e7eb', true: '#93c5fd'}}
                thumbColor={settings.notificationsEnabled ? '#2563eb' : '#9ca3af'}
              />
            </View>

            <TouchableOpacity
              className="flex-row items-center justify-between p-4"
              onPress={handleReminderChange}>
              <View className="flex-row items-center">
                <Text className="text-xl mr-3">⏰</Text>
                <View>
                  <Text className="text-gray-900">Daily Reminder</Text>
                  <Text className="text-gray-500 text-sm">
                    {settings.dailyReminderTime
                      ? `Set for ${settings.dailyReminderTime}`
                      : 'Not set'}
                  </Text>
                </View>
              </View>
              <Text className="text-gray-400">→</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sound & Haptics */}
        <View className="px-6 pt-6">
          <Text className="text-sm font-medium text-gray-500 uppercase mb-3">
            Feedback
          </Text>
          <View className="bg-white rounded-xl overflow-hidden">
            <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
              <View className="flex-row items-center">
                <Text className="text-xl mr-3">🔊</Text>
                <Text className="text-gray-900">Sound Effects</Text>
              </View>
              <Switch
                value={settings.soundEnabled}
                onValueChange={value => updateSettings({soundEnabled: value})}
                trackColor={{false: '#e5e7eb', true: '#93c5fd'}}
                thumbColor={settings.soundEnabled ? '#2563eb' : '#9ca3af'}
              />
            </View>

            <View className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center">
                <Text className="text-xl mr-3">📳</Text>
                <Text className="text-gray-900">Haptic Feedback</Text>
              </View>
              <Switch
                value={settings.hapticEnabled}
                onValueChange={value => updateSettings({hapticEnabled: value})}
                trackColor={{false: '#e5e7eb', true: '#93c5fd'}}
                thumbColor={settings.hapticEnabled ? '#2563eb' : '#9ca3af'}
              />
            </View>
          </View>
        </View>

        {/* Study Goals */}
        <View className="px-6 pt-6">
          <Text className="text-sm font-medium text-gray-500 uppercase mb-3">
            Study Goals
          </Text>
          <View className="bg-white rounded-xl overflow-hidden">
            <TouchableOpacity className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center">
                <Text className="text-xl mr-3">🎯</Text>
                <View>
                  <Text className="text-gray-900">Daily Goal</Text>
                  <Text className="text-gray-500 text-sm">
                    {settings.dailyGoal} questions per day
                  </Text>
                </View>
              </View>
              <Text className="text-gray-400">→</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Support */}
        <View className="px-6 pt-6">
          <Text className="text-sm font-medium text-gray-500 uppercase mb-3">
            Support
          </Text>
          <View className="bg-white rounded-xl overflow-hidden">
            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-100">
              <View className="flex-row items-center">
                <Text className="text-xl mr-3">❓</Text>
                <Text className="text-gray-900">Help Center</Text>
              </View>
              <Text className="text-gray-400">→</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-100">
              <View className="flex-row items-center">
                <Text className="text-xl mr-3">💬</Text>
                <Text className="text-gray-900">Contact Support</Text>
              </View>
              <Text className="text-gray-400">→</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center">
                <Text className="text-xl mr-3">⭐</Text>
                <Text className="text-gray-900">Rate the App</Text>
              </View>
              <Text className="text-gray-400">→</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Account */}
        <View className="px-6 pt-6 pb-8">
          <Text className="text-sm font-medium text-gray-500 uppercase mb-3">
            Account
          </Text>
          <View className="bg-white rounded-xl overflow-hidden">
            <TouchableOpacity
              className="flex-row items-center justify-between p-4"
              onPress={handleLogout}>
              <View className="flex-row items-center">
                <Text className="text-xl mr-3">🚪</Text>
                <Text className="text-danger-500">Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
