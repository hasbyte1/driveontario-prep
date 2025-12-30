import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  fetchLeaderboard,
  LeaderboardData,
  LeaderboardEntry,
  shareContent,
  generateShareText,
} from '@/lib/leaderboard';
import { getStoredProgress, getLevel } from '@/utils/storage';
import { useAuth } from '@/contexts/AuthContext';
import {
  ArrowLeft,
  Trophy,
  Medal,
  Award,
  Flame,
  Crown,
  Share2,
  Users,
  TrendingUp,
  Calendar,
  Zap,
} from 'lucide-react';
import { toast } from 'sonner';

const RankBadge = ({ rank }: { rank: number }) => {
  if (rank === 1) {
    return (
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg">
        <Crown className="w-4 h-4 text-white" />
      </div>
    );
  }
  if (rank === 2) {
    return (
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center shadow-lg">
        <Medal className="w-4 h-4 text-white" />
      </div>
    );
  }
  if (rank === 3) {
    return (
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center shadow-lg">
        <Award className="w-4 h-4 text-white" />
      </div>
    );
  }
  return (
    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
      <span className="text-sm font-bold text-muted-foreground">#{rank}</span>
    </div>
  );
};

const LeaderboardRow = ({ entry, highlight }: { entry: LeaderboardEntry; highlight?: boolean }) => {
  const level = getLevel(entry.xp);

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
        highlight
          ? 'bg-primary/10 border-2 border-primary'
          : entry.rank <= 3
          ? 'bg-gradient-to-r from-yellow-500/5 to-transparent'
          : 'hover:bg-muted/50'
      }`}
    >
      <RankBadge rank={entry.rank} />

      <Avatar className="h-10 w-10 border-2 border-background shadow">
        <AvatarImage src={entry.avatar} alt={entry.name} />
        <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
          {entry.name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className={`font-semibold truncate ${highlight ? 'text-primary' : ''}`}>
            {entry.name}
            {highlight && <span className="text-xs text-muted-foreground ml-1">(You)</span>}
          </p>
          <span className="text-xs">{level.icon}</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3" />
            {entry.xp.toLocaleString()} XP
          </span>
          {entry.streak > 0 && (
            <span className="flex items-center gap-1">
              <Flame className="w-3 h-3 text-orange-500" />
              {entry.streak}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Trophy className="w-3 h-3" />
            {entry.badges}
          </span>
        </div>
      </div>

      <div className="text-right">
        <p className="text-lg font-bold">{entry.xp.toLocaleString()}</p>
        <p className="text-xs text-muted-foreground">XP</p>
      </div>
    </div>
  );
};

const LeaderboardSkeleton = () => (
  <div className="space-y-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="flex items-center gap-3 p-3">
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-6 w-16" />
      </div>
    ))}
  </div>
);

const Leaderboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [period, setPeriod] = useState<'weekly' | 'allTime'>('weekly');
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const progress = getStoredProgress();
  const currentLevel = getLevel(progress.xp);

  useEffect(() => {
    const loadLeaderboard = async () => {
      setIsLoading(true);
      try {
        const leaderboardData = await fetchLeaderboard(period);
        setData(leaderboardData);
      } catch (error) {
        console.error('Failed to load leaderboard:', error);
        toast.error('Failed to load leaderboard');
      } finally {
        setIsLoading(false);
      }
    };

    loadLeaderboard();
  }, [period]);

  const handleShare = async () => {
    const shareData = generateShareText('progress', {
      questionsCompleted: progress.questionsCompleted,
      accuracy: progress.questionsCompleted > 0
        ? Math.round((progress.questionsCorrect / progress.questionsCompleted) * 100)
        : 0,
    });

    const success = await shareContent(shareData);
    if (success) {
      toast.success('Shared successfully!');
    } else {
      toast.info('Copied to clipboard!');
    }
  };

  const userRank = data?.userRank;
  const userEntry = data?.entries.find(e => e.isCurrentUser);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-secondary p-4 sm:p-6 text-primary-foreground">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-white/10"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
                <Trophy className="w-6 h-6" />
                Leaderboard
              </h1>
              <p className="text-sm text-primary-foreground/80">
                Compete with other learners
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-white/10"
              onClick={handleShare}
            >
              <Share2 className="w-5 h-5" />
            </Button>
          </div>

          {/* User Stats Card */}
          <Card className="bg-white/10 border-0 backdrop-blur-sm text-primary-foreground">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14 border-2 border-white/20">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-white/20 text-white text-lg font-bold">
                    {user?.name?.[0] || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-lg">{user?.name || 'You'}</p>
                  <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                    <span>{currentLevel.icon} Level {currentLevel.level}</span>
                    <span>|</span>
                    <span>{progress.xp.toLocaleString()} XP</span>
                  </div>
                </div>
                <div className="text-right">
                  {userRank ? (
                    <>
                      <p className="text-3xl font-bold">#{userRank}</p>
                      <p className="text-xs text-primary-foreground/80">Your Rank</p>
                    </>
                  ) : (
                    <>
                      <p className="text-lg font-semibold">Not Ranked</p>
                      <p className="text-xs text-primary-foreground/80">Start practicing!</p>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-4">
        {/* Period Tabs */}
        <Tabs
          value={period}
          onValueChange={(v) => setPeriod(v as 'weekly' | 'allTime')}
          className="w-full"
        >
          <Card className="mb-4">
            <CardContent className="p-2">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="weekly" className="gap-2">
                  <Calendar className="w-4 h-4" />
                  This Week
                </TabsTrigger>
                <TabsTrigger value="allTime" className="gap-2">
                  <TrendingUp className="w-4 h-4" />
                  All Time
                </TabsTrigger>
              </TabsList>
            </CardContent>
          </Card>

          <TabsContent value="weekly" className="mt-0">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Weekly Leaders
                  </span>
                  {data && (
                    <Badge variant="secondary" className="font-normal">
                      <Users className="w-3 h-3 mr-1" />
                      {data.totalUsers} learners
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Top performers this week. Resets every Monday.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {isLoading ? (
                  <LeaderboardSkeleton />
                ) : data?.entries.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Trophy className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No entries yet this week</p>
                    <p className="text-sm">Be the first to practice!</p>
                  </div>
                ) : (
                  data?.entries.map((entry) => (
                    <LeaderboardRow
                      key={entry.id}
                      entry={entry}
                      highlight={entry.isCurrentUser}
                    />
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="allTime" className="mt-0">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    All-Time Leaders
                  </span>
                  {data && (
                    <Badge variant="secondary" className="font-normal">
                      <Users className="w-3 h-3 mr-1" />
                      {data.totalUsers} learners
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  The best G1 learners of all time.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {isLoading ? (
                  <LeaderboardSkeleton />
                ) : data?.entries.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Trophy className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No entries yet</p>
                    <p className="text-sm">Start practicing to appear here!</p>
                  </div>
                ) : (
                  data?.entries.map((entry) => (
                    <LeaderboardRow
                      key={entry.id}
                      entry={entry}
                      highlight={entry.isCurrentUser}
                    />
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Motivational Card */}
        {userRank && userRank > 3 && (
          <Card className="mt-4 bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Keep climbing!</p>
                  <p className="text-sm text-muted-foreground">
                    You're {userRank - 3} spots away from the top 3. Practice more to level up!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Not on leaderboard message */}
        {!userRank && progress.xp === 0 && (
          <Card className="mt-4 bg-gradient-to-br from-amber-500/10 to-transparent border-amber-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-amber-500/10">
                  <Zap className="w-5 h-5 text-amber-500" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Get on the leaderboard!</p>
                  <p className="text-sm text-muted-foreground">
                    Start practicing to earn XP and compete with others.
                  </p>
                </div>
                <Button size="sm" onClick={() => navigate('/practice-selection')}>
                  Start
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
