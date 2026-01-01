import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  BackHandler,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {api} from '../lib/api';
import {useProgress} from '../contexts/ProgressContext';
import {QuestionCard} from '../components/QuestionCard';
import {TEST_CONFIG} from '../lib/config';
import type {RootStackParamList, Question} from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function TestScreen() {
  const navigation = useNavigation<NavigationProp>();
  const {recordTestCompletion} = useProgress();

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState<Map<string, {answer: number; correct: boolean}>>(
    new Map(),
  );
  const [startTime, setStartTime] = useState(Date.now());
  const [testStartTime] = useState(Date.now());

  // Handle back button press
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        confirmExit();
        return true;
      },
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    startTest();
  }, []);

  const confirmExit = () => {
    Alert.alert(
      'Exit Test?',
      'Your progress will be lost. Are you sure you want to exit?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Exit',
          style: 'destructive',
          onPress: () => navigation.goBack(),
        },
      ],
    );
  };

  const startTest = async () => {
    setIsLoading(true);
    try {
      const response = await api.startTest();

      if (response.success && response.data) {
        setSessionId(response.data.sessionId);
        setQuestions(response.data.questions);
      } else {
        Alert.alert('Error', 'Failed to start test');
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to start test');
      navigation.goBack();
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectAnswer = async (index: number) => {
    if (isAnswered || !sessionId) return;

    setSelectedAnswer(index);
    setIsAnswered(true);

    const question = questions[currentIndex];
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    try {
      const response = await api.submitTestAnswer(
        sessionId,
        question.id,
        index,
        timeSpent,
      );

      if (response.success && response.data) {
        setAnswers(prev => {
          const newAnswers = new Map(prev);
          newAnswers.set(question.id, {
            answer: index,
            correct: response.data!.correct,
          });
          return newAnswers;
        });
      }
    } catch (error) {
      // Handle offline
      const isCorrect = index === question.correctIndex;
      setAnswers(prev => {
        const newAnswers = new Map(prev);
        newAnswers.set(question.id, {answer: index, correct: isCorrect});
        return newAnswers;
      });
    }
  };

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setStartTime(Date.now());
    } else {
      // Complete test
      await completeTest();
    }
  };

  const completeTest = async () => {
    if (!sessionId) return;

    setIsLoading(true);
    try {
      const response = await api.completeTest(sessionId);

      if (response.success && response.data) {
        const result = response.data;
        const passed = result.passed;
        const isPerfect = result.score === 100;

        recordTestCompletion(passed, isPerfect, result.xpEarned);

        navigation.replace('TestResult', {resultId: result.id});
      } else {
        // Calculate locally
        const correctCount = Array.from(answers.values()).filter(
          a => a.correct,
        ).length;
        const score = Math.round((correctCount / questions.length) * 100);
        const passed = score >= TEST_CONFIG.passingScore;

        recordTestCompletion(passed, score === 100, passed ? 50 : 25);

        Alert.alert(
          passed ? 'Congratulations!' : 'Keep Practicing',
          `You scored ${score}% (${correctCount}/${questions.length})`,
          [{text: 'OK', onPress: () => navigation.goBack()}],
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to submit test');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#2563eb" />
        <Text className="mt-4 text-gray-600">
          {sessionId ? 'Submitting test...' : 'Loading test...'}
        </Text>
      </SafeAreaView>
    );
  }

  const currentQuestion = questions[currentIndex];
  const correctSoFar = Array.from(answers.values()).filter(a => a.correct).length;

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-100">
        <TouchableOpacity onPress={confirmExit}>
          <Text className="text-danger-500 font-medium">Exit</Text>
        </TouchableOpacity>
        <Text className="font-bold text-gray-900">
          {currentIndex + 1} / {questions.length}
        </Text>
        <View className="flex-row items-center">
          <Text className="text-success-500 font-bold">{correctSoFar}</Text>
          <Text className="text-gray-400">/</Text>
          <Text className="text-gray-500">{answers.size}</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View className="px-6 py-2">
        <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <View
            className="h-full bg-primary-500 rounded-full"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </View>
      </View>

      {/* Section Indicator */}
      {currentIndex === 0 && (
        <View className="mx-6 mb-4 bg-primary-50 p-3 rounded-xl">
          <Text className="text-primary-700 font-medium text-center">
            Section 1: Road Signs & Traffic Signals
          </Text>
        </View>
      )}
      {currentIndex === 20 && (
        <View className="mx-6 mb-4 bg-primary-50 p-3 rounded-xl">
          <Text className="text-primary-700 font-medium text-center">
            Section 2: Rules of the Road
          </Text>
        </View>
      )}

      {/* Question */}
      <View className="flex-1 px-6 py-4">
        <QuestionCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          isAnswered={isAnswered}
          onSelectAnswer={handleSelectAnswer}
          showExplanation={false}
        />
      </View>

      {/* Action Button */}
      <View className="px-6 pb-6">
        {isAnswered && (
          <TouchableOpacity
            className="w-full py-4 bg-primary-600 rounded-xl"
            onPress={handleNext}>
            <Text className="text-white text-center font-semibold text-lg">
              {currentIndex < questions.length - 1
                ? 'Next Question'
                : 'Submit Test'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
