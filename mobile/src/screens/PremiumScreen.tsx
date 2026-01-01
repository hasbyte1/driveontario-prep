import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../contexts/AuthContext';
import {PREMIUM_PLANS} from '../lib/config';

type PlanKey = 'monthly' | 'yearly' | 'lifetime';

export function PremiumScreen() {
  const navigation = useNavigation();
  const {isPremium, refreshUser} = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>('yearly');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    setIsLoading(true);
    // TODO: Implement in-app purchase with react-native-iap
    await new Promise((resolve: (v?: any) => void) => setTimeout(resolve, 1500));
    setIsLoading(false);

    Alert.alert(
      'Coming Soon',
      'In-app purchases will be available in the next update.',
      [{text: 'OK'}],
    );
  };

  const handleRestorePurchases = async () => {
    setIsLoading(true);
    await new Promise((resolve: (v?: any) => void) => setTimeout(resolve, 1000));
    setIsLoading(false);
    await refreshUser();
    Alert.alert('Restore', 'No previous purchases found.');
  };

  if (isPremium) {
    return (
      <SafeAreaView className="flex-1 bg-white" edges={['bottom']}>
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-6xl mb-4">👑</Text>
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            You're Premium!
          </Text>
          <Text className="text-gray-600 text-center mb-8">
            You have access to all premium features.
          </Text>
          <TouchableOpacity
            className="px-6 py-3 bg-primary-600 rounded-xl"
            onPress={() => navigation.goBack()}>
            <Text className="text-white font-medium">Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['bottom']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="items-center pt-8 pb-6 px-6">
          <Text className="text-5xl mb-4">👑</Text>
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            Upgrade to Premium
          </Text>
          <Text className="text-gray-600 text-center">
            Get unlimited access to all questions and features
          </Text>
        </View>

        {/* Features */}
        <View className="px-6 mb-8">
          <FeatureItem
            icon="✅"
            title="All 135+ Questions"
            description="Access every question in our database"
          />
          <FeatureItem
            icon="📊"
            title="Detailed Analytics"
            description="Track your progress with advanced insights"
          />
          <FeatureItem
            icon="📱"
            title="Offline Mode"
            description="Study anywhere, even without internet"
          />
          <FeatureItem
            icon="🔔"
            title="Smart Reminders"
            description="Never miss a study session"
          />
          <FeatureItem
            icon="🚫"
            title="No Ads"
            description="Focus on learning without distractions"
          />
        </View>

        {/* Plans */}
        <View className="px-6 mb-8">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Choose Your Plan
          </Text>

          {(Object.keys(PREMIUM_PLANS) as PlanKey[]).map(key => {
            const plan = PREMIUM_PLANS[key];
            const isSelected = selectedPlan === key;

            return (
              <TouchableOpacity
                key={key}
                className={`p-4 rounded-xl border-2 mb-3 ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 bg-white'
                }`}
                onPress={() => setSelectedPlan(key)}>
                <View className="flex-row justify-between items-center">
                  <View>
                    <View className="flex-row items-center">
                      <Text className="font-bold text-gray-900 text-lg">
                        {plan.name}
                      </Text>
                      {'savings' in plan && (
                        <View className="ml-2 bg-success-500 px-2 py-0.5 rounded">
                          <Text className="text-white text-xs font-bold">
                            Save {plan.savings}
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text className="text-gray-500">{plan.duration}</Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-xl font-bold text-gray-900">
                      {plan.price}
                    </Text>
                    {key !== 'lifetime' && (
                      <Text className="text-gray-500 text-xs">
                        /{key === 'monthly' ? 'month' : 'year'}
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Subscribe Button */}
        <View className="px-6 mb-4">
          <TouchableOpacity
            className={`w-full py-4 rounded-xl ${
              isLoading ? 'bg-primary-400' : 'bg-primary-600'
            }`}
            onPress={handleSubscribe}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-center font-bold text-lg">
                Subscribe - {PREMIUM_PLANS[selectedPlan].price}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Restore */}
        <TouchableOpacity
          className="py-4 items-center"
          onPress={handleRestorePurchases}
          disabled={isLoading}>
          <Text className="text-primary-600">Restore Purchases</Text>
        </TouchableOpacity>

        {/* Terms */}
        <View className="px-6 pb-8">
          <Text className="text-xs text-gray-400 text-center">
            Payment will be charged to your App Store account at confirmation
            of purchase. Subscription automatically renews unless auto-renew is
            turned off at least 24 hours before the end of the current period.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <View className="flex-row items-start mb-4">
      <Text className="text-xl mr-3">{icon}</Text>
      <View className="flex-1">
        <Text className="font-semibold text-gray-900">{title}</Text>
        <Text className="text-gray-600 text-sm">{description}</Text>
      </View>
    </View>
  );
}
