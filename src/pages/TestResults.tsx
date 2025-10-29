import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ProgressBar";
import { type TestResult } from "@/utils/storage";
import { Trophy, RotateCcw, Home, TrendingUp } from "lucide-react";

const TestResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const testResult = location.state?.testResult as TestResult;

  if (!testResult) {
    navigate("/");
    return null;
  }

  const percentage = Math.round((testResult.score / testResult.totalQuestions) * 100);
  const passed = testResult.passed;

  return (
    <div className="min-h-screen bg-background p-3 sm:p-4">
      <div className="max-w-2xl mx-auto py-4 sm:py-8">
        {/* Result Header */}
        <div className="text-center mb-6 sm:mb-8 animate-scale-in">
          <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-3 sm:mb-4 ${
            passed ? "bg-success/10" : "bg-warning/10"
          }`}>
            <Trophy className={`w-8 h-8 sm:w-10 sm:h-10 ${passed ? "text-success" : "text-warning"}`} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            {passed ? "Congratulations! 🎉" : "Keep Practicing!"}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {passed 
              ? "You passed the practice test!" 
              : "You need 80% (32/40) to pass the G1 test"}
          </p>
        </div>

        {/* Score Card */}
        <Card className="mb-4 sm:mb-6 animate-slide-up">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">Your Score</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="text-center mb-4 sm:mb-6">
              <div className="text-4xl sm:text-6xl font-bold mb-2">
                {testResult.score}/{testResult.totalQuestions}
              </div>
              <div className="text-xl sm:text-2xl text-muted-foreground">
                {percentage}% correct
              </div>
            </div>
            <ProgressBar 
              current={testResult.score} 
              total={testResult.totalQuestions}
              variant={passed ? "success" : "warning"}
              showLabel={false}
            />
            <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-center text-muted-foreground">
              Time: {Math.floor(testResult.timeSpent / 60)}:{(testResult.timeSpent % 60).toString().padStart(2, "0")}
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card className="mb-4 sm:mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
              Category Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
            {Object.entries(testResult.categoryBreakdown).map(([category, stats]) => {
              const categoryPercent = Math.round((stats.correct / stats.total) * 100);
              return (
                <div key={category}>
                  <div className="flex justify-between text-xs sm:text-sm mb-2">
                    <span className="font-medium">{category}</span>
                    <span className="text-muted-foreground">
                      {stats.correct}/{stats.total} ({categoryPercent}%)
                    </span>
                  </div>
                  <ProgressBar 
                    current={stats.correct} 
                    total={stats.total}
                    variant={categoryPercent >= 80 ? "success" : categoryPercent >= 60 ? "primary" : "warning"}
                    showLabel={false}
                  />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Feedback */}
        <Card className="mb-4 sm:mb-6 bg-gradient-to-br from-primary/5 to-transparent border-primary/20 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <CardContent className="p-4 sm:p-6">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">
              {passed ? "You're ready for the real test!" : "Areas to improve:"}
            </h3>
            <ul className="text-xs sm:text-sm space-y-1 text-muted-foreground">
              {!passed && (
                Object.entries(testResult.categoryBreakdown)
                  .filter(([_, stats]) => (stats.correct / stats.total) < 0.8)
                  .map(([category]) => (
                    <li key={category}>• Review {category}</li>
                  ))
              )}
              {passed && (
                <>
                  <li>• Review the official Ontario Driver's Handbook</li>
                  <li>• Book your G1 test at a DriveTest Centre</li>
                  <li>• Bring required documents (ID, payment)</li>
                </>
              )}
            </ul>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-2 sm:space-y-3 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <Button 
            className="w-full h-11 sm:h-12 gap-2 text-sm sm:text-base" 
            onClick={() => navigate("/practice")}
          >
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
            Take Another Test
          </Button>
          <Button 
            variant="outline" 
            className="w-full h-11 sm:h-12 gap-2 text-sm sm:text-base"
            onClick={() => navigate("/")}
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestResults;
