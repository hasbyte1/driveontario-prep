import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useProgress} from '../contexts/ProgressContext';
import type {Badge} from '../types';

// All available badges
const ALL_BADGES: Badge[] = [
  {
    id: 'first_test',
    name: 'First Test',
    description: 'Complete your first practice test',
    icon: '🎯',
    requirement: {type: 'tests_completed', value: 1},
  },
  {
    id: 'test_veteran',
    name: 'Test Veteran',
    description: 'Complete 10 practice tests',
    icon: '🏅',
    requirement: {type: 'tests_completed', value: 10},
  },
  {
    id: 'test_master',
    name: 'Test Master',
    description: 'Complete 50 practice tests',
    icon: '🎖️',
    requirement: {type: 'tests_completed', value: 50},
  },
  {
    id: 'perfect_score',
    name: 'Perfect Score',
    description: 'Get 100% on a practice test',
    icon: '⭐',
    requirement: {type: 'perfect_tests', value: 1},
  },
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Get 5 perfect scores',
    icon: '💎',
    requirement: {type: 'perfect_tests', value: 5},
  },
  {
    id: 'streak_3',
    name: 'On Fire',
    description: 'Maintain a 3-day study streak',
    icon: '🔥',
    requirement: {type: 'streak', value: 3},
  },
  {
    id: 'streak_7',
    name: 'Week Warrior',
    description: 'Maintain a 7-day study streak',
    icon: '💪',
    requirement: {type: 'streak', value: 7},
  },
  {
    id: 'streak_30',
    name: 'Dedicated Learner',
    description: 'Maintain a 30-day study streak',
    icon: '🏆',
    requirement: {type: 'streak', value: 30},
  },
  {
    id: 'xp_100',
    name: 'Getting Started',
    description: 'Earn 100 XP',
    icon: '✨',
    requirement: {type: 'xp', value: 100},
  },
  {
    id: 'xp_1000',
    name: 'Rising Star',
    description: 'Earn 1,000 XP',
    icon: '🌟',
    requirement: {type: 'xp', value: 1000},
  },
  {
    id: 'xp_5000',
    name: 'XP Master',
    description: 'Earn 5,000 XP',
    icon: '👑',
    requirement: {type: 'xp', value: 5000},
  },
  {
    id: 'signs_master',
    name: 'Signs Expert',
    description: 'Master Road Signs & Signals',
    icon: '🚦',
    requirement: {type: 'category_mastery', value: 80, category: 'Road Signs & Signals'},
  },
  {
    id: 'rules_master',
    name: 'Rules Expert',
    description: 'Master Rules of the Road',
    icon: '📜',
    requirement: {type: 'category_mastery', value: 80, category: 'Rules of the Road'},
  },
  {
    id: 'driving_master',
    name: 'Driving Expert',
    description: 'Master Safe Driving & Vehicle Handling',
    icon: '🚗',
    requirement: {type: 'category_mastery', value: 80, category: 'Safe Driving & Vehicle Handling'},
  },
];

export function AchievementsScreen() {
  const {badges, progress} = useProgress();

  const unlockedBadgeIds = new Set(badges.map(b => b.id));

  const getBadgeProgress = (badge: Badge): number => {
    if (!progress) return 0;

    switch (badge.requirement.type) {
      case 'tests_completed':
        return Math.min(100, (progress.testsCompleted / badge.requirement.value) * 100);
      case 'perfect_tests':
        return Math.min(100, (progress.perfectTests / badge.requirement.value) * 100);
      case 'streak':
        return Math.min(100, (progress.currentStreak / badge.requirement.value) * 100);
      case 'xp':
        return Math.min(100, (progress.xp / badge.requirement.value) * 100);
      case 'category_mastery':
        const categoryProgress = progress.categoryProgress[badge.requirement.category!];
        return categoryProgress ? Math.min(100, categoryProgress.mastery) : 0;
      default:
        return 0;
    }
  };

  const unlockedBadges = ALL_BADGES.filter(b => unlockedBadgeIds.has(b.id));
  const lockedBadges = ALL_BADGES.filter(b => !unlockedBadgeIds.has(b.id));

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <View className="px-6 pt-6 pb-4">
          <View className="bg-white rounded-xl p-4 shadow-sm">
            <View className="flex-row justify-between items-center">
              <View className="items-center flex-1">
                <Text className="text-3xl font-bold text-primary-600">
                  {unlockedBadges.length}
                </Text>
                <Text className="text-gray-500 text-sm">Unlocked</Text>
              </View>
              <View className="w-px h-12 bg-gray-200" />
              <View className="items-center flex-1">
                <Text className="text-3xl font-bold text-gray-400">
                  {lockedBadges.length}
                </Text>
                <Text className="text-gray-500 text-sm">Locked</Text>
              </View>
              <View className="w-px h-12 bg-gray-200" />
              <View className="items-center flex-1">
                <Text className="text-3xl font-bold text-success-500">
                  {Math.round((unlockedBadges.length / ALL_BADGES.length) * 100)}%
                </Text>
                <Text className="text-gray-500 text-sm">Complete</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Unlocked Badges */}
        {unlockedBadges.length > 0 && (
          <View className="px-6 mb-6">
            <Text className="text-lg font-bold text-gray-900 mb-4">
              Unlocked ({unlockedBadges.length})
            </Text>
            <View className="flex-row flex-wrap justify-between">
              {unlockedBadges.map(badge => (
                <BadgeCard
                  key={badge.id}
                  badge={badge}
                  isUnlocked
                  progress={100}
                />
              ))}
            </View>
          </View>
        )}

        {/* Locked Badges */}
        <View className="px-6 pb-8">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            In Progress ({lockedBadges.length})
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {lockedBadges.map(badge => (
              <BadgeCard
                key={badge.id}
                badge={badge}
                isUnlocked={false}
                progress={getBadgeProgress(badge)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function BadgeCard({
  badge,
  isUnlocked,
  progress,
}: {
  badge: Badge;
  isUnlocked: boolean;
  progress: number;
}) {
  return (
    <View
      className={`rounded-xl p-4 mb-4 ${
        isUnlocked ? 'bg-white shadow-sm' : 'bg-gray-100'
      }`}
      style={{width: '48%'}}>
      <View className="items-center">
        <View
          className={`w-16 h-16 rounded-full items-center justify-center mb-3 ${
            isUnlocked ? 'bg-primary-100' : 'bg-gray-200'
          }`}>
          <Text className={`text-3xl ${isUnlocked ? '' : 'opacity-40'}`}>
            {badge.icon}
          </Text>
        </View>
        <Text
          className={`font-bold text-center ${
            isUnlocked ? 'text-gray-900' : 'text-gray-500'
          }`}>
          {badge.name}
        </Text>
        <Text
          className={`text-xs text-center mt-1 ${
            isUnlocked ? 'text-gray-600' : 'text-gray-400'
          }`}>
          {badge.description}
        </Text>

        {/* Progress Bar (for locked badges) */}
        {!isUnlocked && (
          <View className="w-full mt-3">
            <View className="h-1.5 bg-gray-300 rounded-full overflow-hidden">
              <View
                className="h-full bg-primary-500 rounded-full"
                style={{width: `${progress}%`}}
              />
            </View>
            <Text className="text-xs text-gray-400 text-center mt-1">
              {Math.round(progress)}%
            </Text>
          </View>
        )}

        {/* Unlocked indicator */}
        {isUnlocked && (
          <View className="mt-2">
            <Text className="text-success-500 text-xs font-medium">
              ✓ Unlocked
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
