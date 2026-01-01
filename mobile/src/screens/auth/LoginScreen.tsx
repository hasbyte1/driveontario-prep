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

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export function LoginScreen() {
  const navigation = useNavigation<NavigationProp>();
  const {login} = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setIsLoading(true);
    const result = await login({email: email.trim(), password});
    setIsLoading(false);

    if (!result.success) {
      Alert.alert('Login Failed', result.error || 'Please check your credentials');
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
          <View className="flex-1 px-6 pt-12">
            {/* Header */}
            <View className="mb-12">
              <Text className="text-4xl font-bold text-gray-900 mb-2">
                Welcome Back
              </Text>
              <Text className="text-lg text-gray-600">
                Sign in to continue your G1 prep journey
              </Text>
            </View>

            {/* Form */}
            <View className="space-y-4">
              <View>
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
                    placeholder="Enter your password"
                    placeholderTextColor="#9ca3af"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="password"
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

              <TouchableOpacity
                className="self-end mt-2"
                onPress={() => navigation.navigate('ForgotPassword')}>
                <Text className="text-primary-600 font-medium">
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity
                className={`w-full py-4 rounded-xl mt-6 ${
                  isLoading ? 'bg-primary-400' : 'bg-primary-600'
                }`}
                onPress={handleLogin}
                disabled={isLoading}>
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white text-center font-semibold text-lg">
                    Sign In
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Register Link */}
            <View className="flex-row justify-center mt-8">
              <Text className="text-gray-600">Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text className="text-primary-600 font-semibold">Sign Up</Text>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View className="flex-row items-center my-8">
              <View className="flex-1 h-px bg-gray-200" />
              <Text className="mx-4 text-gray-500">or continue with</Text>
              <View className="flex-1 h-px bg-gray-200" />
            </View>

            {/* Social Login */}
            <View className="flex-row justify-center space-x-4">
              <TouchableOpacity className="w-14 h-14 bg-gray-100 rounded-full items-center justify-center">
                <Text className="text-2xl">G</Text>
              </TouchableOpacity>
              <TouchableOpacity className="w-14 h-14 bg-gray-100 rounded-full items-center justify-center ml-4">
                <Text className="text-2xl"></Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
