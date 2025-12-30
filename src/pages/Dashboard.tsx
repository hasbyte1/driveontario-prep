import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { ProgressBar } from "@/components/ProgressBar";
import { InstallPrompt } from "@/components/InstallPrompt";
import { Progress } from "@/components/ui/progress";
import { PaywallBanner, PremiumBadge } from "@/components/PaywallModal";
import { usePremium, FREE_LIMITS } from "@/contexts/PremiumContext";
import {
  getStoredProgress,
  updateStreak,
  saveProgress,
  checkAndAwardBadges,
  getBadgeInfo,
  getLevel,
  generateDailyChallenges,
  ALL_BADGES,
  TIER_COLORS,
} from "@/utils/storage";
import { getTotalQuestions } from "@/data/questions";
import { BookOpen, Brain, Trophy, Flame, CheckCircle, ArrowRight, Award, Target, Zap, Star, Calendar, Crown } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(getStoredProgress());
  const totalQuestions = getTotalQuestions();
  const { isPremium, getRemainingQuestions, getRemainingTests, triggerPaywall } = usePremium();
  const remainingQuestions = getRemainingQuestions();
  const remainingTests = getRemainingTests();

  useEffect(() => {
    let updatedProgress = updateStreak(progress);

    // Generate daily challenges if needed
    const today = new Date().toISOString().split("T")[0];
    if (updatedProgress.dailyChallengeDate !== today) {
      const challenges = generateDailyChallenges(updatedProgress);
      updatedProgress = {
        ...updatedProgress,
        dailyChallenges: challenges,
        dailyChallengeDate: today,
      };
    }

    // Check for new badges
    const newBadges = checkAndAwardBadges(updatedProgress);

    if (newBadges.length > 0) {
      let badgeXpBonus = 0;
      newBadges.forEach(badgeId => {
        const badge = getBadgeInfo(badgeId);
        badgeXpBonus += badge.xpReward;
        toast.success(`🎉 Badge Unlocked: ${badge.icon} ${badge.name}`, {
          description: `+${badge.xpReward} XP - ${badge.description}`,
        });
      });
      updatedProgress = {
        ...updatedProgress,
        badges: [...updatedProgress.badges, ...newBadges],
        xp: updatedProgress.xp + badgeXpBonus,
        totalXpEarned: updatedProgress.totalXpEarned + badgeXpBonus,
      };
    }

    // Check for level up
    const oldLevel = getLevel(progress.xp);
    const newLevel = getLevel(updatedProgress.xp);
    if (newLevel.level > oldLevel.level) {
      toast.success(`🎊 Level Up! You're now ${newLevel.icon} ${newLevel.name}!`, {
        description: `Keep going to reach ${newLevel.nextLevel?.name || "the top"}!`,
      });
    }

    if (JSON.stringify(updatedProgress) !== JSON.stringify(progress)) {
      setProgress(updatedProgress);
      saveProgress(updatedProgress);
    }
  }, []);

  const accuracy = progress.questionsCompleted > 0
    ? Math.round((progress.questionsCorrect / progress.questionsCompleted) * 100)
    : 0;

  const recentTest = progress.testHistory[0];
  const level = getLevel(progress.xp);

  // Calculate next badge progress with all badges
  const getNextBadges = () => {
    const badgeProgressData = [
      { id: "first_steps", progress: progress.questionsCompleted, target: 1 },
      { id: "quick_learner", progress: progress.questionsCompleted, target: 25 },
      { id: "road_scholar", progress: progress.questionsCompleted, target: 100 },
      { id: "dedicated_driver", progress: progress.questionsCompleted, target: 250 },
      { id: "consistent", progress: progress.streak, target: 7 },
      { id: "marathon_runner", progress: progress.streak, target: 14 },
      { id: "diamond_streak", progress: progress.streak, target: 30 },
      { id: "sign_master", progress: progress.categoryProgress["Road Signs & Signals"]?.correct || 0, target: 20 },
      { id: "sharpshooter", progress: progress.bestCorrectStreak, target: 10 },
      { id: "perfect_score", progress: progress.testHistory.some(t => t.score === t.totalQuestions) ? 1 : 0, target: 1 },
      { id: "test_master", progress: progress.testHistory.filter(t => t.passed).length, target: 10 },
    ];

    return badgeProgressData
      .filter(b => !progress.badges.includes(b.id))
      .map(b => ({ ...b, ...getBadgeInfo(b.id), unlocked: false }))
      .slice(0, 4);
  };

  const nextBadges = getNextBadges();
  const completedChallenges = progress.dailyChallenges.filter(c => c.completed).length;

  return (
    <div className="min-h-screen bg-background pb-20">
      <InstallPrompt />
      {/* Header with Level & XP */}
      <div className={`p-4 sm:p-6 text-primary-foreground ${isPremium ? 'bg-gradient-to-br from-yellow-500 to-orange-500' : 'bg-gradient-to-br from-primary to-secondary'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold">Ontario DrivePrep</h1>
                {isPremium && (
                  <span className="inline-flex items-center gap-1 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                    <Crown className="w-3 h-3" /> PRO
                  </span>
                )}
              </div>
              <p className="text-sm sm:text-base text-primary-foreground/80">Master your G1 knowledge test</p>
            </div>
            <div className="text-right">
              {isPremium ? (
                <div className="text-3xl sm:text-4xl mb-1">👑</div>
              ) : (
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-0"
                  onClick={() => navigate('/premium')}
                >
                  <Crown className="w-4 h-4 mr-1" />
                  Upgrade
                </Button>
              )}
              <div className="text-xs sm:text-sm font-semibold mt-1">{level.icon} Level {level.level}</div>
            </div>
          </div>

          {/* Level Progress Bar */}
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span className="font-semibold text-sm">{level.name}</span>
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-bold">{progress.xp.toLocaleString()}</span> XP
              </div>
            </div>
            <div className="relative h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-white rounded-full transition-all duration-500"
                style={{ width: `${level.progress}%` }}
              />
            </div>
            {level.nextLevel && (
              <div className="flex justify-between mt-1 text-[10px] sm:text-xs text-primary-foreground/70">
                <span>{level.xpForCurrentLevel} / {level.xpNeededForNext} XP</span>
                <span>Next: {level.nextLevel.icon} {level.nextLevel.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-3 sm:px-4 -mt-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6 animate-slide-up">
          <StatCard
            icon={<CheckCircle className="w-5 h-5" />}
            label="Completed"
            value={progress.questionsCompleted}
            sublabel={`of ${totalQuestions}`}
            variant="primary"
          />
          <StatCard
            icon={<Brain className="w-5 h-5" />}
            label="Accuracy"
            value={`${accuracy}%`}
            sublabel={`${progress.questionsCorrect} correct`}
            variant={accuracy >= 80 ? "success" : "default"}
          />
          <StatCard
            icon={
              <div className="relative">
                <Flame className={`w-5 h-5 ${progress.streak >= 7 ? "animate-pulse" : ""}`} />
                {progress.streak >= 7 && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-ping" />
                )}
              </div>
            }
            label="Streak"
            value={`${progress.streak} ${progress.streak >= 7 ? "🔥" : ""}`}
            sublabel={progress.streak >= 7 ? "On fire!" : progress.streak > 0 ? "Keep going!" : "Start today"}
            variant={progress.streak >= 7 ? "success" : progress.streak >= 3 ? "primary" : "default"}
          />
          <StatCard
            icon={<Award className="w-5 h-5" />}
            label="Badges"
            value={progress.badges.length}
            sublabel="earned"
            variant="success"
          />
        </div>

        {/* Daily Limits (Free Users) */}
        {!isPremium && (
          <Card className="mb-4 sm:mb-6 animate-slide-up" style={{ animationDelay: "0.05s" }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{remainingQuestions}</p>
                    <p className="text-[10px] text-muted-foreground">Questions left</p>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <div className="text-center">
                    <p className="text-2xl font-bold">{remainingTests}</p>
                    <p className="text-[10px] text-muted-foreground">Tests left</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                  onClick={() => navigate('/premium')}
                >
                  <Crown className="w-4 h-4 mr-1" />
                  Go Unlimited
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Daily Challenges */}
        {progress.dailyChallenges.length > 0 && (
          <Card className="mb-4 sm:mb-6 bg-gradient-to-br from-amber-500/10 to-orange-500/5 border-amber-500/20 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="p-4 sm:p-6 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-500" />
                  Daily Challenges
                </CardTitle>
                <div className="flex items-center gap-1 text-xs sm:text-sm">
                  <Star className="w-4 h-4 text-amber-500" />
                  <span className="font-semibold">{completedChallenges}/3</span>
                </div>
              </div>
              <CardDescription className="text-xs sm:text-sm">
                Complete challenges for bonus XP!
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-2 space-y-3">
              {progress.dailyChallenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                    challenge.completed
                      ? "bg-success/10 border-success/30"
                      : "bg-background/50 border-border/50"
                  }`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    challenge.completed ? "bg-success text-white" : "bg-muted"
                  }`}>
                    {challenge.completed ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="text-xs font-bold">{Math.min(challenge.progress, challenge.target)}/{challenge.target}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${challenge.completed ? "line-through text-muted-foreground" : ""}`}>
                      {challenge.description}
                    </p>
                    {!challenge.completed && (
                      <div className="mt-1.5">
                        <Progress
                          value={(challenge.progress / challenge.target) * 100}
                          className="h-1.5"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0 text-xs font-semibold text-amber-600">
                    +{challenge.xpReward} XP
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Start Practice Test - Primary CTA */}
        <div className="mb-4 sm:mb-6 animate-slide-up" style={{ animationDelay: "0.15s" }}>
          <Button
            className="w-full h-14 sm:h-16 text-base sm:text-lg gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all"
            size="lg"
            onClick={() => navigate("/practice-selection")}
          >
            <Brain className="w-5 h-5 sm:w-6 sm:h-6" />
            Start Practice Test
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-auto" />
          </Button>
        </div>

        {/* Overall Progress */}
        <Card className="mb-4 sm:mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
              <Target className="w-5 h-5" />
              Overall Progress
            </CardTitle>
            <CardDescription className="text-sm">
              {progress.questionsCompleted} of {totalQuestions} questions mastered
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <ProgressBar 
              current={progress.questionsCompleted} 
              total={totalQuestions}
              variant={progress.questionsCompleted >= totalQuestions * 0.8 ? "success" : "primary"}
            />
            <div className="mt-4 flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
              <span>{Math.round((progress.questionsCompleted / totalQuestions) * 100)}% Complete</span>
              <span>{totalQuestions - progress.questionsCompleted} remaining</span>
            </div>
          </CardContent>
        </Card>

        {/* Badges Section */}
        {nextBadges.length > 0 && (
          <Card className="mb-4 sm:mb-6 bg-gradient-to-br from-primary/5 to-transparent border-primary/20 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Next Badges
                </CardTitle>
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {progress.badges.length}/{Object.keys(ALL_BADGES).length} unlocked
                </span>
              </div>
              <CardDescription className="text-sm">Earn badges for bonus XP!</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 space-y-3">
              {nextBadges.map((badge) => (
                <div key={badge.id} className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/50">
                  <div className={`relative flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${TIER_COLORS[badge.tier]} flex items-center justify-center opacity-60`}>
                    <span className="text-xl">{badge.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold">{badge.name}</p>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full capitalize bg-gradient-to-r ${TIER_COLORS[badge.tier]} text-white`}>
                        {badge.tier}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={Math.min((badge.progress / badge.target) * 100, 100)}
                        className="h-2 flex-1"
                      />
                      <span className="text-xs font-medium whitespace-nowrap">
                        {Math.min(badge.progress, badge.target)}/{badge.target}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-xs font-semibold text-primary">
                    +{badge.xpReward} XP
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Recent Test Result */}
        {recentTest && (
          <Card className="mb-4 sm:mb-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
                Last Test Result
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold">
                    {recentTest.score}/{recentTest.totalQuestions}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {Math.round((recentTest.score / recentTest.totalQuestions) * 100)}% correct
                  </p>
                </div>
                <div className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ${
                  recentTest.passed 
                    ? "bg-success/10 text-success" 
                    : "bg-destructive/10 text-destructive"
                }`}>
                  {recentTest.passed ? "PASSED ✓" : "NEEDS WORK"}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {new Date(recentTest.date).toLocaleDateString()} • {Math.round(recentTest.timeSpent / 60)} minutes
              </p>
            </CardContent>
          </Card>
        )}

        {/* Daily Tip */}
        <Card className="mb-4 sm:mb-6 bg-gradient-to-br from-accent/5 to-transparent border-accent/20 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              💡 Daily Driving Tip
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <p className="text-xs sm:text-sm">
              Always check your blind spots before changing lanes. Mirrors alone don't show the full picture. 
              A quick shoulder check can prevent accidents.
            </p>
          </CardContent>
        </Card>

        {/* Secondary Action Buttons */}
        <div className="space-y-3 sm:space-y-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            <Button 
              variant="outline" 
              className="w-full h-12 sm:h-14 text-sm sm:text-base gap-2"
              onClick={() => navigate("/flashcards")}
            >
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              Study Flashcards
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-auto" />
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full h-12 sm:h-14 text-sm sm:text-base gap-2"
              onClick={() => navigate("/progress")}
            >
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
              View Detailed Progress
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-auto" />
            </Button>
          </div>

          <Button 
            variant="outline" 
            className="w-full h-12 sm:h-14 text-sm sm:text-base gap-2 border-primary/30 hover:bg-primary/5"
            onClick={() => navigate("/handbook")}
          >
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            Driver's Handbook Reference
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-auto" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
