import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAuth} from '../contexts/AuthContext';
import {useProgress} from '../contexts/ProgressContext';
import {CATEGORIES} from '../lib/config';
import type {RootStackParamList, Category} from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const {user, isPremium} = useAuth();
  const {xp, level, currentStreak, getLevelProgress} = useProgress();

  const levelProgress = getLevelProgress();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-primary-600 px-6 pt-6 pb-12 rounded-b-3xl">
          <View className="flex-row justify-between items-center mb-6">
            <View>
              <Text className="text-primary-100 text-base">Welcome back,</Text>
              <Text className="text-white text-2xl font-bold">
                {user?.name || 'Driver'}
              </Text>
            </View>
            <TouchableOpacity
              className="w-12 h-12 bg-white/20 rounded-full items-center justify-center"
              onPress={() => navigation.navigate('Settings')}>
              <Text className="text-2xl">⚙️</Text>
            </TouchableOpacity>
          </View>

          {/* Stats Card */}
          <View className="bg-white rounded-2xl p-4 shadow-lg">
            <View className="flex-row justify-between items-center mb-4">
              <View className="items-center flex-1">
                <Text className="text-3xl font-bold text-primary-600">
                  {level}
                </Text>
                <Text className="text-gray-500 text-sm">Level</Text>
              </View>
              <View className="w-px h-12 bg-gray-200" />
              <View className="items-center flex-1">
                <Text className="text-3xl font-bold text-primary-600">
                  {xp.toLocaleString()}
                </Text>
                <Text className="text-gray-500 text-sm">XP</Text>
              </View>
              <View className="w-px h-12 bg-gray-200" />
              <View className="items-center flex-1">
                <Text className="text-3xl font-bold text-warning-500">
                  {currentStreak}
                </Text>
                <Text className="text-gray-500 text-sm">Day Streak</Text>
              </View>
            </View>

            {/* Level Progress */}
            <View>
              <View className="flex-row justify-between mb-1">
                <Text className="text-xs text-gray-500">Level {level}</Text>
                <Text className="text-xs text-gray-500">Level {level + 1}</Text>
              </View>
              <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <View
                  className="h-full bg-primary-500 rounded-full"
                  style={{width: `${levelProgress}%`}}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-6 -mt-6">
          <View className="flex-row space-x-4">
            <TouchableOpacity
              className="flex-1 bg-success-500 p-4 rounded-xl shadow-sm"
              style={{marginRight: 8}}
              onPress={() => navigation.navigate('Practice', {})}>
              <Text className="text-3xl mb-2">📚</Text>
              <Text className="text-white font-semibold text-lg">Practice</Text>
              <Text className="text-white/80 text-sm">Quick review</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 bg-primary-500 p-4 rounded-xl shadow-sm"
              style={{marginLeft: 8}}
              onPress={() => navigation.navigate('Test', {})}>
              <Text className="text-3xl mb-2">📝</Text>
              <Text className="text-white font-semibold text-lg">Full Test</Text>
              <Text className="text-white/80 text-sm">40 questions</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Premium Banner (if not premium) */}
        {!isPremium && (
          <TouchableOpacity
            className="mx-6 mt-6 bg-gradient-to-r from-purple-500 to-primary-500 p-4 rounded-xl"
            style={{backgroundColor: '#8b5cf6'}}
            onPress={() => navigation.navigate('Premium')}>
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-white font-bold text-lg">
                  Unlock Premium
                </Text>
                <Text className="text-white/80 text-sm">
                  Access all questions & features
                </Text>
              </View>
              <Text className="text-3xl">👑</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Categories */}
        <View className="px-6 mt-6 mb-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-gray-900">Categories</Text>
            <TouchableOpacity>
              <Text className="text-primary-600">See All</Text>
            </TouchableOpacity>
          </View>

          {CATEGORIES.map((category, index) => (
            <CategoryCard
              key={category}
              category={category}
              index={index}
              onPress={() =>
                navigation.navigate('CategoryDetail', {category})
              }
            />
          ))}
        </View>

        {/* Leaderboard Preview */}
        <View className="px-6 mb-8">
          <TouchableOpacity
            className="bg-white rounded-xl p-4 shadow-sm flex-row items-center justify-between"
            onPress={() => navigation.navigate('Leaderboard')}>
            <View className="flex-row items-center">
              <Text className="text-3xl mr-3">🏆</Text>
              <View>
                <Text className="font-bold text-gray-900">Leaderboard</Text>
                <Text className="text-gray-500 text-sm">
                  See how you rank
                </Text>
              </View>
            </View>
            <Text className="text-gray-400 text-xl">→</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Category Card Component
function CategoryCard({
  category,
  index,
  onPress,
}: {
  category: Category;
  index: number;
  onPress: () => void;
}) {
  const icons: Record<string, string> = {
    'Road Signs & Signals': '🚦',
    'Rules of the Road': '📜',
    'Safe Driving & Vehicle Handling': '🚗',
    'Alcohol/Drugs & Penalties': '⚠️',
    'Licensing & Documents': '📋',
    Miscellaneous: '📌',
  };

  const colors = [
    'bg-blue-50 border-blue-200',
    'bg-green-50 border-green-200',
    'bg-yellow-50 border-yellow-200',
    'bg-red-50 border-red-200',
    'bg-purple-50 border-purple-200',
    'bg-gray-50 border-gray-200',
  ];

  return (
    <TouchableOpacity
      className={`flex-row items-center p-4 rounded-xl mb-3 border ${colors[index % colors.length]}`}
      onPress={onPress}>
      <Text className="text-2xl mr-3">{icons[category] || '📌'}</Text>
      <View className="flex-1">
        <Text className="font-semibold text-gray-900">{category}</Text>
        <Text className="text-gray-500 text-sm">Tap to practice</Text>
      </View>
      <Text className="text-gray-400">→</Text>
    </TouchableOpacity>
  );
}
