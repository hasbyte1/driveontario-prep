import React from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import type {MainTabParamList} from '../types';

// Screens
import {HomeScreen} from '../screens/HomeScreen';
import {PracticeTabScreen} from '../screens/PracticeTabScreen';
import {TestTabScreen} from '../screens/TestTabScreen';
import {ProfileScreen} from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

// Tab bar icons
function TabIcon({
  name,
  focused,
}: {
  name: 'home' | 'practice' | 'test' | 'profile';
  focused: boolean;
}) {
  const icons: Record<string, string> = {
    home: focused ? '🏠' : '🏡',
    practice: focused ? '📚' : '📖',
    test: focused ? '📝' : '📋',
    profile: focused ? '👤' : '👥',
  };

  return (
    <View className="items-center justify-center">
      <Text className="text-2xl">{icons[name]}</Text>
    </View>
  );
}

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          paddingTop: 8,
          paddingBottom: 8,
          height: 70,
        },
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#6b7280',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => <TabIcon name="home" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="PracticeTab"
        component={PracticeTabScreen}
        options={{
          tabBarLabel: 'Practice',
          tabBarIcon: ({focused}) => (
            <TabIcon name="practice" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="TestTab"
        component={TestTabScreen}
        options={{
          tabBarLabel: 'Test',
          tabBarIcon: ({focused}) => <TabIcon name="test" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused}) => (
            <TabIcon name="profile" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
