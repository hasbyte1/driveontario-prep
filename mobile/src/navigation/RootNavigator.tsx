import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAuth} from '../contexts/AuthContext';
import type {RootStackParamList} from '../types';

// Navigators
import {MainTabNavigator} from './MainTabNavigator';
import {AuthNavigator} from './AuthNavigator';

// Screens
import {OnboardingScreen} from '../screens/OnboardingScreen';
import {PracticeScreen} from '../screens/PracticeScreen';
import {TestScreen} from '../screens/TestScreen';
import {TestResultScreen} from '../screens/TestResultScreen';
import {SettingsScreen} from '../screens/SettingsScreen';
import {PremiumScreen} from '../screens/PremiumScreen';
import {LeaderboardScreen} from '../screens/LeaderboardScreen';
import {AchievementsScreen} from '../screens/AchievementsScreen';
import {CategoryDetailScreen} from '../screens/CategoryDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const {isAuthenticated, isLoading, hasCompletedOnboarding} = useAuth();

  if (isLoading) {
    // Return splash screen or loading indicator
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      {!hasCompletedOnboarding ? (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      ) : !isAuthenticated ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <>
          <Stack.Screen name="Main" component={MainTabNavigator} />
          <Stack.Screen
            name="Practice"
            component={PracticeScreen}
            options={{
              headerShown: true,
              headerTitle: 'Practice',
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen
            name="Test"
            component={TestScreen}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="TestResult"
            component={TestResultScreen}
            options={{
              headerShown: true,
              headerTitle: 'Test Results',
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              headerShown: true,
              headerTitle: 'Settings',
            }}
          />
          <Stack.Screen
            name="Premium"
            component={PremiumScreen}
            options={{
              headerShown: true,
              headerTitle: 'Premium',
              presentation: 'modal',
            }}
          />
          <Stack.Screen
            name="Leaderboard"
            component={LeaderboardScreen}
            options={{
              headerShown: true,
              headerTitle: 'Leaderboard',
            }}
          />
          <Stack.Screen
            name="Achievements"
            component={AchievementsScreen}
            options={{
              headerShown: true,
              headerTitle: 'Achievements',
            }}
          />
          <Stack.Screen
            name="CategoryDetail"
            component={CategoryDetailScreen}
            options={{
              headerShown: true,
              headerTitle: 'Category',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
