import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {api} from '../lib/api';
import {useAuth} from '../contexts/AuthContext';
import type {LeaderboardEntry} from '../types';

type Period = 'daily' | 'weekly' | 'allTime';

export function LeaderboardScreen() {
  const {user} = useAuth();
  const [period, setPeriod] = useState<Period>('weekly');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<{
    rank: number;
    xp: number;
    percentile: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadLeaderboard();
  }, [period]);

  const loadLeaderboard = async (refresh = false) => {
    if (refresh) setIsRefreshing(true);
    else setIsLoading(true);

    try {
      const [leaderboardRes, rankRes] = await Promise.all([
        api.getLeaderboard(period),
        api.getUserRank(),
      ]);

      if (leaderboardRes.success && leaderboardRes.data) {
        const items = leaderboardRes.data.items.map((item, index) => ({
          ...item,
          rank: index + 1,
          isCurrentUser: item.userId === user?.id,
        }));
        setEntries(items);
      }

      if (rankRes.success && rankRes.data) {
        setUserRank(rankRes.data);
      }
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const renderHeader = () => (
    <>
      {/* Period Selector */}
      <View className="flex-row px-4 py-3 bg-gray-100 rounded-xl mb-4">
        {(['daily', 'weekly', 'allTime'] as Period[]).map(p => (
          <TouchableOpacity
            key={p}
            className={`flex-1 py-2 rounded-lg ${
              period === p ? 'bg-white shadow-sm' : ''
            }`}
            onPress={() => setPeriod(p)}>
            <Text
              className={`text-center font-medium ${
                period === p ? 'text-primary-600' : 'text-gray-500'
              }`}>
              {p === 'allTime' ? 'All Time' : p.charAt(0).toUpperCase() + p.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Your Rank */}
      {userRank && (
        <View className="bg-primary-50 rounded-xl p-4 mb-4 border border-primary-200">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-primary-500 rounded-full items-center justify-center mr-3">
                <Text className="text-white font-bold text-lg">
                  #{userRank.rank}
                </Text>
              </View>
              <View>
                <Text className="font-bold text-gray-900">Your Rank</Text>
                <Text className="text-gray-500 text-sm">
                  Top {userRank.percentile}%
                </Text>
              </View>
            </View>
            <View className="items-end">
              <Text className="font-bold text-primary-600 text-lg">
                {userRank.xp.toLocaleString()}
              </Text>
              <Text className="text-gray-500 text-sm">XP</Text>
            </View>
          </View>
        </View>
      )}

      {/* Top 3 Podium */}
      {entries.length >= 3 && (
        <View className="flex-row justify-center items-end mb-6 px-4">
          {/* 2nd Place */}
          <View className="items-center flex-1">
            <View className="w-16 h-16 bg-gray-300 rounded-full items-center justify-center mb-2">
              <Text className="text-2xl">🥈</Text>
            </View>
            <Text className="font-medium text-gray-900 text-sm" numberOfLines={1}>
              {entries[1].name}
            </Text>
            <Text className="text-gray-500 text-xs">
              {entries[1].xp.toLocaleString()} XP
            </Text>
          </View>

          {/* 1st Place */}
          <View className="items-center flex-1 -mt-4">
            <View className="w-20 h-20 bg-yellow-400 rounded-full items-center justify-center mb-2 shadow-lg">
              <Text className="text-3xl">🥇</Text>
            </View>
            <Text className="font-bold text-gray-900" numberOfLines={1}>
              {entries[0].name}
            </Text>
            <Text className="text-gray-500 text-sm">
              {entries[0].xp.toLocaleString()} XP
            </Text>
          </View>

          {/* 3rd Place */}
          <View className="items-center flex-1">
            <View className="w-16 h-16 bg-orange-300 rounded-full items-center justify-center mb-2">
              <Text className="text-2xl">🥉</Text>
            </View>
            <Text className="font-medium text-gray-900 text-sm" numberOfLines={1}>
              {entries[2].name}
            </Text>
            <Text className="text-gray-500 text-xs">
              {entries[2].xp.toLocaleString()} XP
            </Text>
          </View>
        </View>
      )}
    </>
  );

  const renderItem = ({item, index}: {item: LeaderboardEntry; index: number}) => {
    // Skip top 3 as they're shown in podium
    if (index < 3) return null;

    return (
      <View
        className={`flex-row items-center p-4 rounded-xl mb-2 ${
          item.isCurrentUser ? 'bg-primary-50 border border-primary-200' : 'bg-white'
        }`}>
        <Text className="w-8 font-bold text-gray-500">#{item.rank}</Text>
        <View className="w-10 h-10 bg-gray-200 rounded-full items-center justify-center mr-3">
          <Text>{item.avatar || item.name?.charAt(0)?.toUpperCase() || '?'}</Text>
        </View>
        <View className="flex-1">
          <Text
            className={`font-medium ${
              item.isCurrentUser ? 'text-primary-700' : 'text-gray-900'
            }`}>
            {item.name}
            {item.isCurrentUser && ' (You)'}
          </Text>
          <Text className="text-gray-500 text-sm">Level {item.level}</Text>
        </View>
        <Text className="font-bold text-gray-900">
          {item.xp.toLocaleString()} XP
        </Text>
      </View>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" color="#2563eb" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom']}>
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={item => item.userId}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{padding: 16}}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => loadLeaderboard(true)}
            tintColor="#2563eb"
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
