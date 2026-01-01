import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useProgress} from '../contexts/ProgressContext';
import {CATEGORIES} from '../lib/config';
import type {RootStackParamList, Category} from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function PracticeTabScreen() {
  const navigation = useNavigation<NavigationProp>();
  const {progress} = useProgress();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <Text className="text-2xl font-bold text-gray-900">Practice</Text>
          <Text className="text-gray-600 mt-1">
            Choose a category to study
          </Text>
        </View>

        {/* Quick Practice */}
        <View className="px-6 mb-6">
          <TouchableOpacity
            className="bg-primary-600 p-5 rounded-xl shadow-sm"
            onPress={() => navigation.navigate('Practice', {})}>
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-white font-bold text-xl">
                  Quick Practice
                </Text>
                <Text className="text-white/80 mt-1">
                  Random questions from all categories
                </Text>
              </View>
              <Text className="text-4xl">🎲</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Categories Grid */}
        <View className="px-6 pb-8">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            By Category
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {CATEGORIES.map((category, index) => (
              <CategoryPracticeCard
                key={category}
                category={category}
                progress={
                  progress?.categoryProgress[category]?.mastery || 0
                }
                questionsAnswered={
                  progress?.categoryProgress[category]?.questionsAnswered || 0
                }
                onPress={() =>
                  navigation.navigate('Practice', {category})
                }
              />
            ))}
          </View>
        </View>

        {/* Tips Section */}
        <View className="px-6 pb-8">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Study Tips
          </Text>
          <View className="bg-white rounded-xl p-4 shadow-sm">
            <TipItem
              icon="💡"
              title="Focus on weak areas"
              description="Practice categories where you score lowest"
            />
            <TipItem
              icon="🔁"
              title="Spaced repetition"
              description="Review questions you got wrong more often"
            />
            <TipItem
              icon="⏰"
              title="Daily practice"
              description="Even 10 minutes a day helps retention"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function CategoryPracticeCard({
  category,
  progress,
  questionsAnswered,
  onPress,
}: {
  category: Category;
  progress: number;
  questionsAnswered: number;
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

  const getProgressColor = (p: number) => {
    if (p >= 80) return 'bg-success-500';
    if (p >= 50) return 'bg-warning-500';
    return 'bg-primary-500';
  };

  return (
    <TouchableOpacity
      className="bg-white rounded-xl p-4 shadow-sm mb-4"
      style={{width: '48%'}}
      onPress={onPress}>
      <Text className="text-3xl mb-2">{icons[category] || '📌'}</Text>
      <Text className="font-semibold text-gray-900 text-sm" numberOfLines={2}>
        {category}
      </Text>
      <Text className="text-gray-500 text-xs mt-1">
        {questionsAnswered} answered
      </Text>

      {/* Progress Bar */}
      <View className="mt-3">
        <View className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <View
            className={`h-full rounded-full ${getProgressColor(progress)}`}
            style={{width: `${progress}%`}}
          />
        </View>
        <Text className="text-xs text-gray-500 mt-1">{progress}% mastery</Text>
      </View>
    </TouchableOpacity>
  );
}

function TipItem({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <View className="flex-row items-start mb-4 last:mb-0">
      <Text className="text-xl mr-3">{icon}</Text>
      <View className="flex-1">
        <Text className="font-semibold text-gray-900">{title}</Text>
        <Text className="text-gray-600 text-sm">{description}</Text>
      </View>
    </View>
  );
}
