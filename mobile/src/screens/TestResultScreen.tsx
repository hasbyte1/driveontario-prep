import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from 'react-native-reanimated';
import {api} from '../lib/api';
import {TEST_CONFIG} from '../lib/config';
import type {RootStackParamList, TestResult} from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type ResultRouteProp = RouteProp<RootStackParamList, 'TestResult'>;

export function TestResultScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ResultRouteProp>();
  const [result, setResult] = useState<TestResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const scoreScale = useSharedValue(0);
  const detailsOpacity = useSharedValue(0);

  const scoreAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scoreScale.value}],
  }));

  const detailsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: detailsOpacity.value,
  }));

  useEffect(() => {
    loadResult();
  }, []);

  useEffect(() => {
    if (result) {
      scoreScale.value = withSpring(1, {damping: 10});
      detailsOpacity.value = withDelay(300, withSpring(1));
    }
  }, [result]);

  const loadResult = async () => {
    try {
      const response = await api.getTestResult(route.params.resultId);
      if (response.success && response.data) {
        setResult(response.data);
      }
    } catch (error) {
      console.error('Failed to load result:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#2563eb" />
      </SafeAreaView>
    );
  }

  if (!result) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center px-6">
        <Text className="text-gray-600 text-center">
          Failed to load results
        </Text>
        <TouchableOpacity
          className="mt-4 px-6 py-3 bg-primary-600 rounded-xl"
          onPress={() => navigation.goBack()}>
          <Text className="text-white font-medium">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const passed = result.score >= TEST_CONFIG.passingScore;
  const isPerfect = result.score === 100;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Result Header */}
        <View
          className={`px-6 pt-8 pb-12 rounded-b-3xl ${
            passed ? 'bg-success-500' : 'bg-danger-500'
          }`}>
          <Animated.View className="items-center" style={scoreAnimatedStyle}>
            <Text className="text-6xl mb-4">
              {isPerfect ? '🏆' : passed ? '🎉' : '📚'}
            </Text>
            <Text className="text-white text-3xl font-bold mb-2">
              {isPerfect
                ? 'Perfect Score!'
                : passed
                  ? 'You Passed!'
                  : 'Keep Practicing'}
            </Text>
            <View className="flex-row items-baseline">
              <Text className="text-white text-6xl font-bold">
                {result.score}
              </Text>
              <Text className="text-white/80 text-2xl">%</Text>
            </View>
            <Text className="text-white/80 mt-2">
              {result.correctAnswers} of {result.totalQuestions} correct
            </Text>
          </Animated.View>
        </View>

        {/* Stats */}
        <Animated.View
          className="px-6 -mt-8"
          style={detailsAnimatedStyle}>
          <View className="bg-white rounded-xl p-4 shadow-lg">
            <View className="flex-row justify-between">
              <StatItem
                label="XP Earned"
                value={`+${result.xpEarned}`}
                icon="✨"
              />
              <StatItem
                label="Time"
                value={formatDuration(result.duration)}
                icon="⏱️"
              />
              <StatItem
                label="Accuracy"
                value={`${result.score}%`}
                icon="🎯"
              />
            </View>
          </View>
        </Animated.View>

        {/* Section Breakdown */}
        <Animated.View className="px-6 mt-6" style={detailsAnimatedStyle}>
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Section Breakdown
          </Text>

          <View className="bg-white rounded-xl overflow-hidden shadow-sm">
            <SectionResult
              title="Section 1: Road Signs"
              correct={Math.min(result.correctAnswers, 20)}
              total={20}
              required={16}
            />
            <View className="h-px bg-gray-100" />
            <SectionResult
              title="Section 2: Rules of the Road"
              correct={Math.max(0, result.correctAnswers - 20)}
              total={20}
              required={16}
            />
          </View>
        </Animated.View>

        {/* Message */}
        <View className="px-6 mt-6">
          <View
            className={`p-4 rounded-xl ${
              passed ? 'bg-success-50' : 'bg-warning-50'
            }`}>
            <Text
              className={`${passed ? 'text-success-700' : 'text-warning-700'}`}>
              {passed
                ? "Great job! You're well prepared for the actual G1 test. Keep practicing to maintain your knowledge."
                : "Don't worry! Review the questions you got wrong and try again. You'll get there!"}
            </Text>
          </View>
        </View>

        {/* Actions */}
        <View className="px-6 mt-8 pb-8">
          <TouchableOpacity
            className="w-full py-4 bg-primary-600 rounded-xl mb-3"
            onPress={() => navigation.replace('Test', {})}>
            <Text className="text-white text-center font-semibold text-lg">
              Take Another Test
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-full py-4 bg-gray-100 rounded-xl"
            onPress={() => navigation.navigate('Main')}>
            <Text className="text-gray-700 text-center font-semibold text-lg">
              Back to Home
            </Text>
          </TouchableOpacity>
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

function SectionResult({
  title,
  correct,
  total,
  required,
}: {
  title: string;
  correct: number;
  total: number;
  required: number;
}) {
  const passed = correct >= required;

  return (
    <View className="p-4">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="font-medium text-gray-900">{title}</Text>
        <View className="flex-row items-center">
          <Text className={passed ? 'text-success-500' : 'text-danger-500'}>
            {passed ? '✓' : '✗'}
          </Text>
          <Text className="ml-2 font-bold">
            {correct}/{total}
          </Text>
        </View>
      </View>
      <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <View
          className={`h-full rounded-full ${
            passed ? 'bg-success-500' : 'bg-danger-500'
          }`}
          style={{width: `${(correct / total) * 100}%`}}
        />
      </View>
      <Text className="text-xs text-gray-500 mt-1">
        Required: {required}/{total} to pass
      </Text>
    </View>
  );
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
