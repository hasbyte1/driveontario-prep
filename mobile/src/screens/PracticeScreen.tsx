import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import {api} from '../lib/api';
import {useProgress} from '../contexts/ProgressContext';
import {QuestionCard} from '../components/QuestionCard';
import type {RootStackParamList, Question} from '../types';

type PracticeRouteProp = RouteProp<RootStackParamList, 'Practice'>;

export function PracticeScreen() {
  const navigation = useNavigation();
  const route = useRoute<PracticeRouteProp>();
  const {recordCorrectAnswer, recordIncorrectAnswer} = useProgress();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [correctCount, setCorrectCount] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());

  const category = route.params?.category;

  // Animation values
  const shakeValue = useSharedValue(0);
  const pulseValue = useSharedValue(1);

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{translateX: shakeValue.value}],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{scale: pulseValue.value}],
  }));

  useEffect(() => {
    loadQuestions();
  }, [category]);

  const loadQuestions = async () => {
    setIsLoading(true);
    try {
      const response = await api.getQuestions({
        category,
        limit: 20,
        isPractice: true,
      });

      if (response.success && response.data) {
        setQuestions(response.data);
      } else {
        Alert.alert('Error', 'Failed to load questions');
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load questions');
      navigation.goBack();
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectAnswer = async (index: number) => {
    if (isAnswered) return;

    setSelectedAnswer(index);
    setIsAnswered(true);

    const question = questions[currentIndex];
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    try {
      const response = await api.validateAnswer(
        question.id,
        index,
        timeSpent,
      );

      if (response.success && response.data) {
        const isCorrect = response.data.correct;

        if (isCorrect) {
          setCorrectCount(prev => prev + 1);
          recordCorrectAnswer(question.category, response.data.xpEarned);
          pulseValue.value = withSequence(
            withSpring(1.1),
            withSpring(1),
          );
        } else {
          recordIncorrectAnswer(question.category);
          shakeValue.value = withSequence(
            withSpring(-10),
            withSpring(10),
            withSpring(-10),
            withSpring(0),
          );
        }
      }
    } catch (error) {
      // Handle offline - use local validation
      const isCorrect = index === question.correctIndex;
      if (isCorrect) {
        setCorrectCount(prev => prev + 1);
        recordCorrectAnswer(question.category);
      } else {
        recordIncorrectAnswer(question.category);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setStartTime(Date.now());
    } else {
      // Practice complete
      Alert.alert(
        'Practice Complete!',
        `You got ${correctCount} out of ${questions.length} correct.`,
        [
          {
            text: 'Practice Again',
            onPress: () => {
              setCurrentIndex(0);
              setCorrectCount(0);
              setSelectedAnswer(null);
              setIsAnswered(false);
              loadQuestions();
            },
          },
          {
            text: 'Done',
            onPress: () => navigation.goBack(),
          },
        ],
      );
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#2563eb" />
        <Text className="mt-4 text-gray-600">Loading questions...</Text>
      </SafeAreaView>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Progress Header */}
      <View className="px-6 py-4 border-b border-gray-100">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-gray-500">
            Question {currentIndex + 1} of {questions.length}
          </Text>
          <View className="flex-row items-center">
            <Text className="text-success-500 font-bold">{correctCount}</Text>
            <Text className="text-gray-400"> / </Text>
            <Text className="text-gray-500">{currentIndex + (isAnswered ? 1 : 0)}</Text>
          </View>
        </View>
        <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <View
            className="h-full bg-primary-500 rounded-full"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </View>
      </View>

      {/* Question */}
      <Animated.View className="flex-1 px-6 py-4" style={shakeStyle}>
        <QuestionCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          isAnswered={isAnswered}
          onSelectAnswer={handleSelectAnswer}
        />
      </Animated.View>

      {/* Action Button */}
      <View className="px-6 pb-6">
        {isAnswered && (
          <Animated.View style={pulseStyle}>
            <TouchableOpacity
              className="w-full py-4 bg-primary-600 rounded-xl"
              onPress={handleNext}>
              <Text className="text-white text-center font-semibold text-lg">
                {currentIndex < questions.length - 1 ? 'Next Question' : 'Finish'}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
}
