import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ProgressBar";
import { getStoredProgress, getBadgeInfo } from "@/utils/storage";
import { CATEGORIES } from "@/data/questions";
import { ArrowLeft, Award, Trophy, Calendar } from "lucide-react";

const Progress = () => {
  const navigate = useNavigate();
  const progress = getStoredProgress();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-secondary p-6 text-primary-foreground">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/")}
            className="mb-4 text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Your Progress</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Badges */}
        {progress.badges.length > 0 && (
          <Card className="mb-6 animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Badges Earned ({progress.badges.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {progress.badges.map(badgeId => {
                  const badge = getBadgeInfo(badgeId);
                  return (
                    <div 
                      key={badgeId}
                      className="p-4 rounded-lg bg-gradient-to-br from-accent/10 to-transparent border border-accent/20"
                    >
                      <div className="text-3xl mb-2">{badge.icon}</div>
                      <div className="font-semibold">{badge.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {badge.description}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Category Progress */}
        <Card className="mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <CardHeader>
            <CardTitle>Category Mastery</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.values(CATEGORIES).map(category => {
              const stats = progress.categoryProgress[category] || { correct: 0, total: 0 };
              const percentage = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
              
              return (
                <div key={category}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">{category}</span>
                    <span className="text-muted-foreground">
                      {stats.correct}/{stats.total} ({percentage}%)
                    </span>
                  </div>
                  <ProgressBar 
                    current={stats.correct} 
                    total={Math.max(stats.total, 1)}
                    variant={percentage >= 80 ? "success" : percentage >= 60 ? "primary" : "warning"}
                    showLabel={false}
                  />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Test History */}
        {progress.testHistory.length > 0 && (
          <Card className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Test History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {progress.testHistory.slice(0, 10).map((test, idx) => {
                  const percentage = Math.round((test.score / test.totalQuestions) * 100);
                  return (
                    <div 
                      key={test.id}
                      className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">
                            {new Date(test.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          test.passed 
                            ? "bg-success/10 text-success" 
                            : "bg-warning/10 text-warning"
                        }`}>
                          {percentage}%
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Score: {test.score}/{test.totalQuestions}
                        </span>
                        <span className="text-muted-foreground">
                          {Math.floor(test.timeSpent / 60)}:{(test.timeSpent % 60).toString().padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Progress;
