import React from 'react';
import {View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAuth} from '../contexts/AuthContext';
import {useProgress} from '../contexts/ProgressContext';
import type {RootStackParamList} from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function ProfileScreen() {
  const navigation = useNavigation<NavigationProp>();
  const {user, isPremium, logout} = useAuth();
  const {xp, level, currentStreak, badges, progress} = useProgress();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => logout(),
      },
    ]);
  };

  const accuracy =
    progress && progress.questionsAnswered > 0
      ? Math.round(
          (progress.correctAnswers / progress.questionsAnswered) * 100,
        )
      : 0;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View className="bg-primary-600 px-6 pt-6 pb-16 rounded-b-3xl">
          <View className="flex-row justify-between items-start mb-6">
            <Text className="text-xl font-bold text-white">Profile</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Settings')}>
              <Text className="text-2xl">⚙️</Text>
            </TouchableOpacity>
          </View>

          <View className="items-center">
            {/* Avatar */}
            <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-4">
              <Text className="text-4xl">
                {user?.name?.charAt(0)?.toUpperCase() || '👤'}
              </Text>
            </View>
            <Text className="text-white text-xl font-bold">
              {user?.name || 'Driver'}
            </Text>
            <Text className="text-white/80">{user?.email}</Text>

            {/* Premium Badge */}
            {isPremium && (
              <View className="bg-yellow-400 px-3 py-1 rounded-full mt-2 flex-row items-center">
                <Text className="mr-1">👑</Text>
                <Text className="font-semibold text-yellow-900">Premium</Text>
              </View>
            )}
          </View>
        </View>

        {/* Stats Cards */}
        <View className="px-6 -mt-10">
          <View className="bg-white rounded-xl p-4 shadow-lg">
            <View className="flex-row justify-between">
              <StatItem label="Level" value={level.toString()} icon="⭐" />
              <StatItem
                label="Total XP"
                value={xp.toLocaleString()}
                icon="✨"
              />
              <StatItem
                label="Streak"
                value={`${currentStreak}d`}
                icon="🔥"
              />
              <StatItem label="Accuracy" value={`${accuracy}%`} icon="🎯" />
            </View>
          </View>
        </View>

        {/* Achievements */}
        <View className="px-6 mt-6">
          <TouchableOpacity
            className="flex-row justify-between items-center mb-4"
            onPress={() => navigation.navigate('Achievements')}>
            <Text className="text-lg font-bold text-gray-900">Achievements</Text>
            <Text className="text-primary-600">See All →</Text>
          </TouchableOpacity>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="-mx-2">
            {badges.length > 0 ? (
              badges.slice(0, 5).map(badge => (
                <View
                  key={badge.id}
                  className="bg-white rounded-xl p-4 mx-2 items-center shadow-sm"
                  style={{width: 100}}>
                  <Text className="text-3xl mb-2">{badge.icon}</Text>
                  <Text
                    className="text-xs text-gray-900 font-medium text-center"
                    numberOfLines={2}>
                    {badge.name}
                  </Text>
                </View>
              ))
            ) : (
              <View className="bg-gray-100 rounded-xl p-4 mx-2 items-center">
                <Text className="text-3xl mb-2">🏆</Text>
                <Text className="text-gray-500 text-sm">
                  Complete tests to earn badges
                </Text>
              </View>
            )}
          </ScrollView>
        </View>

        {/* Menu Items */}
        <View className="px-6 mt-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">Account</Text>
          <View className="bg-white rounded-xl shadow-sm overflow-hidden">
            <MenuItem
              icon="👤"
              title="Edit Profile"
              onPress={() => {}}
            />
            <MenuItem
              icon="🏆"
              title="Leaderboard"
              onPress={() => navigation.navigate('Leaderboard')}
            />
            {!isPremium && (
              <MenuItem
                icon="👑"
                title="Upgrade to Premium"
                onPress={() => navigation.navigate('Premium')}
                highlight
              />
            )}
            <MenuItem
              icon="🔔"
              title="Notifications"
              onPress={() => navigation.navigate('Settings')}
            />
            <MenuItem
              icon="❓"
              title="Help & Support"
              onPress={() => {}}
            />
            <MenuItem
              icon="📜"
              title="Terms & Privacy"
              onPress={() => {}}
            />
            <MenuItem
              icon="🚪"
              title="Logout"
              onPress={handleLogout}
              danger
              showBorder={false}
            />
          </View>
        </View>

        {/* App Version */}
        <View className="items-center py-8">
          <Text className="text-gray-400 text-sm">Drive Ontario Prep v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <View className="items-center flex-1">
      <Text className="text-xl mb-1">{icon}</Text>
      <Text className="text-lg font-bold text-gray-900">{value}</Text>
      <Text className="text-xs text-gray-500">{label}</Text>
    </View>
  );
}

function MenuItem({
  icon,
  title,
  onPress,
  highlight = false,
  danger = false,
  showBorder = true,
}: {
  icon: string;
  title: string;
  onPress: () => void;
  highlight?: boolean;
  danger?: boolean;
  showBorder?: boolean;
}) {
  return (
    <TouchableOpacity
      className={`flex-row items-center px-4 py-4 ${
        showBorder ? 'border-b border-gray-100' : ''
      }`}
      onPress={onPress}>
      <Text className="text-xl mr-3">{icon}</Text>
      <Text
        className={`flex-1 font-medium ${
          highlight
            ? 'text-primary-600'
            : danger
              ? 'text-red-500'
              : 'text-gray-900'
        }`}>
        {title}
      </Text>
      <Text className="text-gray-400">→</Text>
    </TouchableOpacity>
  );
}
