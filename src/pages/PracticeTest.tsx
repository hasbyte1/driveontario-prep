import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { getRandomQuestions, CATEGORIES } from "@/data/questions";
import { getStoredProgress, saveProgress, type TestResult } from "@/utils/storage";
import { ArrowRight, ArrowLeft, Clock, CheckCircle, XCircle, RotateCcw, Home } from "lucide-react";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const PracticeTest = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || undefined;
  
  const [questions] = useState(() => getRandomQuestions(40, category));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(40).fill(null));
  const [startTime] = useState(Date.now());
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes in seconds

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleFinishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showExplanation) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) {
      toast.error("Please select an answer");
      return;
    }

    const newAnswers = [...answers];
    newAnswers[currentIndex] = selectedAnswer;
    setAnswers(newAnswers);
    setShowExplanation(true);

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      toast.success("Correct! 🎉");
    } else {
      toast.error("Incorrect");
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(answers[currentIndex + 1]);
      setShowExplanation(answers[currentIndex + 1] !== null);
    } else {
      handleFinishTest();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedAnswer(answers[currentIndex - 1]);
      setShowExplanation(answers[currentIndex - 1] !== null);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnswers(Array(40).fill(null));
    setTimeLeft(45 * 60);
    toast.success("Test reset successfully");
  };

  const handleFinishTest = () => {
    const score = answers.reduce((acc, answer, idx) => 
      answer === questions[idx].correctAnswer ? acc + 1 : acc, 0
    );
    
    const passed = score >= 32; // 80% pass rate
    const timeSpent = Math.round((Date.now() - startTime) / 1000);

    // Calculate category breakdown
    const categoryBreakdown: Record<string, { correct: number; total: number }> = {};
    questions.forEach((q, idx) => {
      if (!categoryBreakdown[q.category]) {
        categoryBreakdown[q.category] = { correct: 0, total: 0 };
      }
      categoryBreakdown[q.category].total++;
      if (answers[idx] === q.correctAnswer) {
        categoryBreakdown[q.category].correct++;
      }
    });

    const testResult: TestResult = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      score,
      totalQuestions: questions.length,
      categoryBreakdown,
      timeSpent,
      passed,
    };

    const progress = getStoredProgress();
    progress.questionsCompleted += questions.length;
    progress.questionsCorrect += score;
    progress.testHistory.unshift(testResult);
    
    // Update category progress
    Object.entries(categoryBreakdown).forEach(([category, stats]) => {
      if (!progress.categoryProgress[category]) {
        progress.categoryProgress[category] = { correct: 0, total: 0 };
      }
      progress.categoryProgress[category].correct += stats.correct;
      progress.categoryProgress[category].total += stats.total;
    });

    saveProgress(progress);

    navigate("/test-results", { state: { testResult } });
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-2xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1 sm:gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/practice-selection")}
                className="h-8 w-8 sm:h-9 sm:w-9 p-0"
              >
                <Home className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
              <span className="text-xs sm:text-sm font-medium">
                Q {currentIndex + 1}/{questions.length}
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 sm:h-9 sm:w-9 p-0">
                    <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-[90vw] sm:max-w-md">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-lg sm:text-xl">Reset Test?</AlertDialogTitle>
                    <AlertDialogDescription className="text-sm">
                      This will clear all your answers and restart the test. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                    <AlertDialogCancel className="m-0">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleReset}>
                      Reset Test
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className={timeLeft < 300 ? "text-destructive font-bold" : "font-medium"}>
                  {minutes}:{seconds.toString().padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
          {category && (
            <div className="text-[10px] sm:text-xs text-muted-foreground mb-2">
              Category: {category}
            </div>
          )}
          <Progress value={((currentIndex + 1) / questions.length) * 100} className="h-1.5 sm:h-2" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <Card>
          <CardContent className="p-4 sm:p-6">
            {/* Question */}
            <div className="mb-6">
              <div className="text-xs text-muted-foreground mb-2">
                {currentQuestion.category}
              </div>
              <h2 className="text-xl font-semibold mb-4">
                {currentQuestion.question}
              </h2>
              {currentQuestion.imageUrl && (
                <div className="mb-4 flex justify-center">
                  <img 
                    src={currentQuestion.imageUrl} 
                    alt="Road sign" 
                    className="w-32 h-32 object-contain"
                  />
                </div>
              )}
            </div>

            {/* Options */}
            <RadioGroup value={selectedAnswer?.toString()} onValueChange={(val) => handleAnswerSelect(parseInt(val))}>
              <div className="space-y-2 sm:space-y-3">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedAnswer === idx;
                  const isCorrect = idx === currentQuestion.correctAnswer;
                  const showCorrect = showExplanation && isCorrect;
                  const showIncorrect = showExplanation && isSelected && !isCorrect;

                  return (
                    <div
                      key={idx}
                      className={`flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        showCorrect ? "border-success bg-success/5" :
                        showIncorrect ? "border-destructive bg-destructive/5" :
                        isSelected ? "border-primary bg-primary/5" :
                        "border-border hover:border-primary/50"
                      }`}
                      onClick={() => handleAnswerSelect(idx)}
                    >
                      <RadioGroupItem value={idx.toString()} id={`option-${idx}`} disabled={showExplanation} className="shrink-0" />
                      <Label 
                        htmlFor={`option-${idx}`}
                        className="flex-1 cursor-pointer font-normal text-sm sm:text-base"
                      >
                        {option}
                      </Label>
                      {showCorrect && <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-success flex-shrink-0" />}
                      {showIncorrect && <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-destructive flex-shrink-0" />}
                    </div>
                  );
                })}
              </div>
            </RadioGroup>

            {/* Explanation */}
            {showExplanation && (
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg bg-muted animate-slide-up">
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Explanation</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="mt-4 sm:mt-6 flex gap-2 sm:gap-3">
              {!showExplanation ? (
                <>
                  <Button 
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className="h-10 sm:h-11 text-sm sm:text-base"
                  >
                    <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Back
                  </Button>
                  <Button 
                    className="flex-1 h-10 sm:h-11 text-sm sm:text-base" 
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                  >
                    Submit
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className="h-10 sm:h-11 text-sm sm:text-base"
                  >
                    <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Back
                  </Button>
                  <Button 
                    className="flex-1 gap-2 h-10 sm:h-11 text-sm sm:text-base" 
                    onClick={handleNext}
                  >
                    {currentIndex < questions.length - 1 ? (
                      <>Next <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" /></>
                    ) : (
                      "Finish"
                    )}
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Score Preview */}
        <div className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-muted-foreground">
          {answers.filter((a, i) => a === questions[i]?.correctAnswer).length} correct • 
          {" "}{answers.filter(a => a !== null).length} answered
        </div>
      </div>
    </div>
  );
};

export default PracticeTest;
