import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useProgress} from '../contexts/ProgressContext';
import {TEST_CONFIG} from '../lib/config';
import type {RootStackParamList} from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function TestTabScreen() {
  const navigation = useNavigation<NavigationProp>();
  const {progress} = useProgress();

  const testsCompleted = progress?.testsCompleted || 0;
  const perfectTests = progress?.perfectTests || 0;
  const passRate =
    testsCompleted > 0
      ? Math.round((perfectTests / testsCompleted) * 100)
      : 0;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <Text className="text-2xl font-bold text-gray-900">Practice Test</Text>
          <Text className="text-gray-600 mt-1">
            Prepare for the real G1 exam
          </Text>
        </View>

        {/* Stats */}
        <View className="px-6 mb-6">
          <View className="bg-white rounded-xl p-4 shadow-sm">
            <View className="flex-row justify-between">
              <View className="items-center flex-1">
                <Text className="text-2xl font-bold text-primary-600">
                  {testsCompleted}
                </Text>
                <Text className="text-gray-500 text-sm">Tests Taken</Text>
              </View>
              <View className="w-px bg-gray-200" />
              <View className="items-center flex-1">
                <Text className="text-2xl font-bold text-success-500">
                  {perfectTests}
                </Text>
                <Text className="text-gray-500 text-sm">Perfect Scores</Text>
              </View>
              <View className="w-px bg-gray-200" />
              <View className="items-center flex-1">
                <Text className="text-2xl font-bold text-warning-500">
                  {passRate}%
                </Text>
                <Text className="text-gray-500 text-sm">Pass Rate</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Start Test Button */}
        <View className="px-6 mb-6">
          <TouchableOpacity
            className="bg-primary-600 p-6 rounded-xl shadow-lg"
            onPress={() => navigation.navigate('Test', {})}>
            <View className="items-center">
              <Text className="text-5xl mb-3">📝</Text>
              <Text className="text-white font-bold text-xl mb-2">
                Start Practice Test
              </Text>
              <Text className="text-white/80 text-center">
                {TEST_CONFIG.questionsPerTest} questions • {TEST_CONFIG.passingScore}% to pass
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Test Info */}
        <View className="px-6 mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            About the G1 Test
          </Text>
          <View className="bg-white rounded-xl p-4 shadow-sm">
            <InfoItem
              icon="📋"
              title="40 Questions"
              description="Split into two sections of 20 questions each"
            />
            <InfoItem
              icon="✅"
              title="80% to Pass"
              description="You need at least 16/20 correct in each section"
            />
            <InfoItem
              icon="⏱️"
              title="No Time Limit"
              description="Take your time to read each question carefully"
            />
            <InfoItem
              icon="🔄"
              title="Unlimited Retakes"
              description="Practice as many times as you need"
            />
          </View>
        </View>

        {/* Tips */}
        <View className="px-6 pb-8">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Test Day Tips
          </Text>
          <View className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <View className="flex-row items-start mb-3">
              <Text className="text-xl mr-2">💡</Text>
              <Text className="text-gray-700 flex-1">
                Read each question carefully before selecting an answer
              </Text>
            </View>
            <View className="flex-row items-start mb-3">
              <Text className="text-xl mr-2">💡</Text>
              <Text className="text-gray-700 flex-1">
                Eliminate obviously wrong answers first
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-xl mr-2">💡</Text>
              <Text className="text-gray-700 flex-1">
                Trust your first instinct unless you're sure you made a mistake
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoItem({
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
