import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useProgress} from '../contexts/ProgressContext';
import type {RootStackParamList, Category} from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type CategoryRouteProp = RouteProp<RootStackParamList, 'CategoryDetail'>;

const CATEGORY_INFO: Record<
  Category,
  {icon: string; description: string; tips: string[]}
> = {
  'Road Signs & Signals': {
    icon: '🚦',
    description:
      'Learn to recognize and understand all road signs, traffic signals, and pavement markings used in Ontario.',
    tips: [
      'Pay attention to sign shapes - they indicate the type of sign',
      'Colors have meaning: red = stop/prohibition, yellow = warning, green = direction',
      'Diamond shapes are always warning signs',
    ],
  },
  'Rules of the Road': {
    icon: '📜',
    description:
      'Understand the rules and regulations that govern driving in Ontario, including right-of-way and traffic laws.',
    tips: [
      'Always yield to pedestrians in crosswalks',
      'Know the difference between solid and broken lane lines',
      'Understand school zone and playground rules',
    ],
  },
  'Safe Driving & Vehicle Handling': {
    icon: '🚗',
    description:
      'Learn proper driving techniques, vehicle control, and how to handle various road conditions safely.',
    tips: [
      'Maintain proper following distance (3+ seconds)',
      'Check mirrors regularly while driving',
      'Adjust driving for weather conditions',
    ],
  },
  'Alcohol/Drugs & Penalties': {
    icon: '⚠️',
    description:
      'Understand the laws regarding impaired driving, penalties for violations, and the effects of substances on driving.',
    tips: [
      'Zero tolerance for novice drivers (G1/G2)',
      'Know the BAC limits for different license classes',
      'Understand the consequences of distracted driving',
    ],
  },
  'Licensing & Documents': {
    icon: '📋',
    description:
      'Learn about the graduated licensing system, required documents, and vehicle registration requirements.',
    tips: [
      'Know the G1, G2, and full G license requirements',
      'Understand demerit point system',
      'Always carry required documents while driving',
    ],
  },
  Miscellaneous: {
    icon: '📌',
    description:
      'Various other topics related to driving in Ontario, including emergency procedures and special situations.',
    tips: [
      'Know what to do in case of an accident',
      'Understand winter driving requirements',
      'Learn about sharing the road with cyclists',
    ],
  },
};

export function CategoryDetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<CategoryRouteProp>();
  const {progress} = useProgress();

  const category = route.params.category;
  const info = CATEGORY_INFO[category];
  const categoryProgress = progress?.categoryProgress[category];

  const questionsAnswered = categoryProgress?.questionsAnswered || 0;
  const correctAnswers = categoryProgress?.correctAnswers || 0;
  const accuracy = categoryProgress?.accuracy || 0;
  const mastery = categoryProgress?.mastery || 0;

  // Update header title
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: category,
    });
  }, [navigation, category]);

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-primary-600 px-6 pt-6 pb-12 rounded-b-3xl">
          <View className="items-center">
            <View className="w-24 h-24 bg-white/20 rounded-full items-center justify-center mb-4">
              <Text className="text-5xl">{info.icon}</Text>
            </View>
            <Text className="text-white text-xl font-bold text-center mb-2">
              {category}
            </Text>
            <Text className="text-white/80 text-center">{info.description}</Text>
          </View>
        </View>

        {/* Stats */}
        <View className="px-6 -mt-8">
          <View className="bg-white rounded-xl p-4 shadow-lg">
            <View className="flex-row justify-between">
              <StatItem label="Answered" value={questionsAnswered.toString()} />
              <StatItem label="Correct" value={correctAnswers.toString()} />
              <StatItem label="Accuracy" value={`${Math.round(accuracy)}%`} />
              <StatItem label="Mastery" value={`${Math.round(mastery)}%`} />
            </View>

            {/* Mastery Progress */}
            <View className="mt-4">
              <View className="flex-row justify-between mb-1">
                <Text className="text-xs text-gray-500">Mastery Progress</Text>
                <Text className="text-xs text-gray-500">{Math.round(mastery)}%</Text>
              </View>
              <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <View
                  className={`h-full rounded-full ${
                    mastery >= 80
                      ? 'bg-success-500'
                      : mastery >= 50
                        ? 'bg-warning-500'
                        : 'bg-primary-500'
                  }`}
                  style={{width: `${mastery}%`}}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Study Tips */}
        <View className="px-6 mt-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Study Tips
          </Text>
          <View className="bg-white rounded-xl p-4 shadow-sm">
            {info.tips.map((tip, index) => (
              <View
                key={index}
                className={`flex-row items-start ${
                  index < info.tips.length - 1 ? 'mb-4' : ''
                }`}>
                <View className="w-6 h-6 bg-primary-100 rounded-full items-center justify-center mr-3">
                  <Text className="text-primary-600 text-xs font-bold">
                    {index + 1}
                  </Text>
                </View>
                <Text className="flex-1 text-gray-700">{tip}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Action Button */}
        <View className="px-6 mt-8 pb-8">
          <TouchableOpacity
            className="w-full py-4 bg-primary-600 rounded-xl"
            onPress={() => navigation.navigate('Practice', {category})}>
            <Text className="text-white text-center font-semibold text-lg">
              Start Practicing
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatItem({label, value}: {label: string; value: string}) {
  return (
    <View className="items-center flex-1">
      <Text className="text-xl font-bold text-gray-900">{value}</Text>
      <Text className="text-xs text-gray-500">{label}</Text>
    </View>
  );
}
