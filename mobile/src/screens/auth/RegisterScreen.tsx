import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAuth} from '../../contexts/AuthContext';
import type {AuthStackParamList} from '../../types';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

export function RegisterScreen() {
  const navigation = useNavigation<NavigationProp>();
  const {register} = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);
    const result = await register({
      name: name.trim(),
      email: email.trim(),
      password,
    });
    setIsLoading(false);

    if (!result.success) {
      Alert.alert('Registration Failed', result.error || 'Please try again');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled">
          <View className="flex-1 px-6 pt-8">
            {/* Back Button */}
            <TouchableOpacity
              className="mb-4"
              onPress={() => navigation.goBack()}>
              <Text className="text-primary-600 text-lg">← Back</Text>
            </TouchableOpacity>

            {/* Header */}
            <View className="mb-8">
              <Text className="text-3xl font-bold text-gray-900 mb-2">
                Create Account
              </Text>
              <Text className="text-base text-gray-600">
                Start your journey to passing the G1 test
              </Text>
            </View>

            {/* Form */}
            <View className="space-y-4">
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </Text>
                <TextInput
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900"
                  placeholder="Enter your name"
                  placeholderTextColor="#9ca3af"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  autoComplete="name"
                />
              </View>

              <View className="mt-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Email
                </Text>
                <TextInput
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900"
                  placeholder="Enter your email"
                  placeholderTextColor="#9ca3af"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                />
              </View>

              <View className="mt-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Password
                </Text>
                <View className="relative">
                  <TextInput
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 pr-12"
                    placeholder="Create a password (8+ characters)"
                    placeholderTextColor="#9ca3af"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    className="absolute right-4 top-3"
                    onPress={() => setShowPassword(!showPassword)}>
                    <Text className="text-primary-600 font-medium">
                      {showPassword ? 'Hide' : 'Show'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View className="mt-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </Text>
                <TextInput
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900"
                  placeholder="Confirm your password"
                  placeholderTextColor="#9ca3af"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Register Button */}
              <TouchableOpacity
                className={`w-full py-4 rounded-xl mt-6 ${
                  isLoading ? 'bg-primary-400' : 'bg-primary-600'
                }`}
                onPress={handleRegister}
                disabled={isLoading}>
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white text-center font-semibold text-lg">
                    Create Account
                  </Text>
                )}
              </TouchableOpacity>

              {/* Terms */}
              <Text className="text-center text-sm text-gray-500 mt-4">
                By signing up, you agree to our{' '}
                <Text className="text-primary-600">Terms of Service</Text> and{' '}
                <Text className="text-primary-600">Privacy Policy</Text>
              </Text>
            </View>

            {/* Login Link */}
            <View className="flex-row justify-center mt-8">
              <Text className="text-gray-600">Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text className="text-primary-600 font-semibold">Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
