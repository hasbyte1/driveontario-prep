import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { ProgressBar } from "@/components/ProgressBar";
import { InstallPrompt } from "@/components/InstallPrompt";
import { getStoredProgress, updateStreak, saveProgress, checkAndAwardBadges, getBadgeInfo } from "@/utils/storage";
import { getTotalQuestions } from "@/data/questions";
import { BookOpen, Brain, Trophy, Flame, CheckCircle, ArrowRight, Award } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(getStoredProgress());
  const totalQuestions = getTotalQuestions();

  useEffect(() => {
    const updatedProgress = updateStreak(progress);
    const newBadges = checkAndAwardBadges(updatedProgress);
    
    if (newBadges.length > 0) {
      newBadges.forEach(badgeId => {
        const badge = getBadgeInfo(badgeId);
        toast.success(`🎉 New Badge Unlocked: ${badge.icon} ${badge.name}`, {
          description: badge.description,
        });
      });
      updatedProgress.badges = [...updatedProgress.badges, ...newBadges];
    }
    
    if (updatedProgress !== progress) {
      setProgress(updatedProgress);
      saveProgress(updatedProgress);
    }
  }, []);

  const accuracy = progress.questionsCompleted > 0 
    ? Math.round((progress.questionsCorrect / progress.questionsCompleted) * 100) 
    : 0;

  const recentTest = progress.testHistory[0];

  return (
    <div className="min-h-screen bg-background pb-20">
      <InstallPrompt />
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-secondary p-4 sm:p-6 text-primary-foreground">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Ontario DrivePrep</h1>
          <p className="text-sm sm:text-base text-primary-foreground/80">Master your G1 knowledge test</p>
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
            icon={<Flame className="w-5 h-5" />}
            label="Streak"
            value={`${progress.streak} days`}
            variant={progress.streak >= 3 ? "primary" : "default"}
          />
          <StatCard
            icon={<Award className="w-5 h-5" />}
            label="Badges"
            value={progress.badges.length}
            sublabel="earned"
            variant="success"
          />
        </div>

        {/* Overall Progress */}
        <Card className="mb-4 sm:mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">Overall Progress</CardTitle>
            <CardDescription className="text-sm">Keep practicing to master all topics</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <ProgressBar 
              current={progress.questionsCompleted} 
              total={totalQuestions}
              variant={progress.questionsCompleted >= totalQuestions * 0.8 ? "success" : "primary"}
            />
          </CardContent>
        </Card>

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
              💡 Daily Tip
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <p className="text-xs sm:text-sm">
              Always check your blind spots before changing lanes. Mirrors alone don't show the full picture. 
              A quick shoulder check can prevent accidents.
            </p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-2 sm:space-y-3 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <Button 
            className="w-full h-12 sm:h-14 text-base sm:text-lg gap-2" 
            size="lg"
            onClick={() => navigate("/practice-selection")}
          >
            <Brain className="w-4 h-4 sm:w-5 sm:h-5" />
            Start Practice Test
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-auto" />
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full h-12 sm:h-14 text-base sm:text-lg gap-2"
            onClick={() => navigate("/flashcards")}
          >
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            Study Flashcards
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-auto" />
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full h-12 sm:h-14 text-base sm:text-lg gap-2"
            onClick={() => navigate("/progress")}
          >
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
            View Progress
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-auto" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
