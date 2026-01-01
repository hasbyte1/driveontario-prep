import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import type {Question} from '../types';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  isAnswered: boolean;
  onSelectAnswer: (index: number) => void;
  showExplanation?: boolean;
}

export function QuestionCard({
  question,
  selectedAnswer,
  isAnswered,
  onSelectAnswer,
  showExplanation = true,
}: QuestionCardProps) {
  const getOptionStyle = (index: number) => {
    if (!isAnswered) {
      return selectedAnswer === index
        ? 'bg-primary-50 border-primary-500'
        : 'bg-white border-gray-200';
    }

    if (index === question.correctIndex) {
      return 'bg-success-50 border-success-500';
    }

    if (selectedAnswer === index && index !== question.correctIndex) {
      return 'bg-danger-50 border-danger-500';
    }

    return 'bg-gray-50 border-gray-200';
  };

  const getOptionTextStyle = (index: number) => {
    if (!isAnswered) {
      return selectedAnswer === index ? 'text-primary-700' : 'text-gray-900';
    }

    if (index === question.correctIndex) {
      return 'text-success-700';
    }

    if (selectedAnswer === index && index !== question.correctIndex) {
      return 'text-danger-700';
    }

    return 'text-gray-500';
  };

  const getOptionIcon = (index: number) => {
    if (!isAnswered) return null;

    if (index === question.correctIndex) {
      return <Text className="text-success-500 text-lg ml-2">✓</Text>;
    }

    if (selectedAnswer === index && index !== question.correctIndex) {
      return <Text className="text-danger-500 text-lg ml-2">✗</Text>;
    }

    return null;
  };

  return (
    <View className="flex-1">
      {/* Category Badge */}
      <View className="flex-row items-center mb-4">
        <View className="bg-primary-100 px-3 py-1 rounded-full">
          <Text className="text-primary-700 text-sm font-medium">
            {question.category}
          </Text>
        </View>
        {question.difficulty && (
          <View className="ml-2 flex-row">
            {[1, 2, 3].map(d => (
              <Text
                key={d}
                className={`text-xs ${
                  d <= question.difficulty ? 'text-warning-500' : 'text-gray-300'
                }`}>
                ★
              </Text>
            ))}
          </View>
        )}
      </View>

      {/* Question Image */}
      {question.image && (
        <View className="mb-4 rounded-xl overflow-hidden bg-gray-100">
          <Image
            source={{uri: question.image}}
            className="w-full h-48"
            resizeMode="contain"
          />
        </View>
      )}

      {/* Question Text */}
      <Text className="text-lg font-semibold text-gray-900 mb-6">
        {question.question}
      </Text>

      {/* Options */}
      <View className="space-y-3">
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            className={`flex-row items-center p-4 rounded-xl border-2 ${getOptionStyle(
              index,
            )}`}
            style={{marginBottom: 12}}
            onPress={() => onSelectAnswer(index)}
            disabled={isAnswered}>
            <View
              className={`w-8 h-8 rounded-full items-center justify-center mr-3 ${
                isAnswered && index === question.correctIndex
                  ? 'bg-success-500'
                  : isAnswered &&
                      selectedAnswer === index &&
                      index !== question.correctIndex
                    ? 'bg-danger-500'
                    : selectedAnswer === index
                      ? 'bg-primary-500'
                      : 'bg-gray-200'
              }`}>
              <Text
                className={`font-semibold ${
                  selectedAnswer === index ||
                  (isAnswered && index === question.correctIndex)
                    ? 'text-white'
                    : 'text-gray-600'
                }`}>
                {String.fromCharCode(65 + index)}
              </Text>
            </View>
            <Text className={`flex-1 ${getOptionTextStyle(index)}`}>
              {option}
            </Text>
            {getOptionIcon(index)}
          </TouchableOpacity>
        ))}
      </View>

      {/* Explanation */}
      {isAnswered && showExplanation && question.explanation && (
        <View className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <View className="flex-row items-center mb-2">
            <Text className="text-lg mr-2">💡</Text>
            <Text className="font-semibold text-blue-900">Explanation</Text>
          </View>
          <Text className="text-blue-800">{question.explanation}</Text>
        </View>
      )}
    </View>
  );
}
