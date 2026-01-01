import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  type ViewToken,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import {useAuth} from '../contexts/AuthContext';

const {width} = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Welcome to Drive Ontario Prep',
    description:
      'Your complete preparation guide for the Ontario G1 written test. Practice with real exam questions.',
    icon: '🚗',
    color: '#3b82f6',
  },
  {
    id: '2',
    title: 'Practice Makes Perfect',
    description:
      'Over 135 questions covering all topics: road signs, rules of the road, safe driving, and more.',
    icon: '📚',
    color: '#22c55e',
  },
  {
    id: '3',
    title: 'Track Your Progress',
    description:
      'Earn XP, unlock badges, and climb the leaderboard. See your improvement over time.',
    icon: '📊',
    color: '#f59e0b',
  },
  {
    id: '4',
    title: 'Ready to Pass?',
    description:
      'Take full practice tests with the same format as the real G1 exam. Get instant feedback.',
    icon: '✅',
    color: '#8b5cf6',
  },
];

export function OnboardingScreen() {
  const {completeOnboarding} = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useSharedValue(0);

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index);
      }
    },
  ).current;

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      completeOnboarding();
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const renderItem = ({item, index}: {item: typeof slides[0]; index: number}) => {
    return (
      <View className="items-center justify-center px-8" style={{width}}>
        <View
          className="w-32 h-32 rounded-full items-center justify-center mb-8"
          style={{backgroundColor: `${item.color}20`}}>
          <Text className="text-6xl">{item.icon}</Text>
        </View>
        <Text className="text-2xl font-bold text-gray-900 text-center mb-4">
          {item.title}
        </Text>
        <Text className="text-base text-gray-600 text-center leading-6">
          {item.description}
        </Text>
      </View>
    );
  };

  const renderDots = () => {
    return (
      <View className="flex-row justify-center items-center space-x-2">
        {slides.map((_, index) => {
          const isActive = index === currentIndex;
          return (
            <View
              key={index}
              className={`h-2 rounded-full ${
                isActive ? 'w-8 bg-primary-600' : 'w-2 bg-gray-300'
              }`}
              style={{marginHorizontal: 4}}
            />
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Skip Button */}
      <View className="flex-row justify-end px-6 pt-4">
        <TouchableOpacity onPress={handleSkip}>
          <Text className="text-gray-500 text-base">Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Slides */}
      <View className="flex-1 justify-center">
        <FlatList
          ref={flatListRef}
          data={slides}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          keyExtractor={item => item.id}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          onScroll={e => {
            scrollX.value = e.nativeEvent.contentOffset.x;
          }}
        />
      </View>

      {/* Bottom Section */}
      <View className="px-6 pb-8">
        {/* Dots */}
        <View className="mb-8">{renderDots()}</View>

        {/* Button */}
        <TouchableOpacity
          className="w-full py-4 bg-primary-600 rounded-xl"
          onPress={handleNext}>
          <Text className="text-white text-center font-semibold text-lg">
            {currentIndex === slides.length - 1 ? "Let's Get Started" : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
