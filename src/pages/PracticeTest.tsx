import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  startTestSession,
  submitTestAnswer,
  completeTestSession,
  getLocalQuestionWithAnswer,
  type Question
} from "@/lib/questions-api";
import {
  getStoredProgress,
  saveProgress,
  updateDailyChallengeProgress,
  XP_REWARDS,
  type TestResult,
} from "@/utils/storage";
import { ArrowRight, ArrowLeft, Clock, CheckCircle, XCircle, RotateCcw, Home, SkipForward, Eye, Zap } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

// Extended question type for local data with answers
interface QuestionWithAnswer extends Question {
  correctAnswer: number;
  explanation: string;
}

const PracticeTest = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || undefined;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionAnswers, setQuestionAnswers] = useState<Map<string, { correctAnswer: number; explanation: string }>>(new Map());
  const [sessionId, setSessionId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentExplanation, setCurrentExplanation] = useState<string>("");
  const [currentCorrectAnswer, setCurrentCorrectAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [skippedQuestions, setSkippedQuestions] = useState<Set<number>>(new Set());
  const [startTime] = useState(Date.now());
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes in seconds
  const [xpEarned, setXpEarned] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const hasAnsweredRef = useRef<Set<number>>(new Set());
  const questionStartTimeRef = useRef<number>(Date.now());

  const currentQuestion = questions[currentIndex];

  // Load questions on mount using test session API
  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true);
      try {
        // Start a new test session (uses server API with anti-cheat)
        const result = await startTestSession(category);
        if (!result) {
          throw new Error('Failed to start test session');
        }

        setQuestions(result.questions);
        setSessionId(result.sessionId);
        setAnswers(Array(result.questions.length).fill(null));

        // Set time limit from server (or default 45 min)
        const timeLimitSeconds = Math.floor(result.timeLimit / 1000);
        setTimeLeft(Math.min(timeLimitSeconds, 45 * 60));

        // Pre-load local answers for fallback (only used if backend unavailable)
        const answersMap = new Map<string, { correctAnswer: number; explanation: string }>();
        for (const q of result.questions) {
          const localQ = getLocalQuestionWithAnswer(q.id);
          if (localQ) {
            answersMap.set(q.id, {
              correctAnswer: localQ.correctAnswer,
              explanation: localQ.explanation,
            });
          }
        }
        setQuestionAnswers(answersMap);
      } catch (error) {
        console.error('Error loading questions:', error);
        toast.error('Failed to load questions');
        navigate('/practice-selection');
      } finally {
        setIsLoading(false);
      }
    };
    loadQuestions();
  }, [navigate, category]);

  // Timer - only run after questions are loaded
  useEffect(() => {
    if (isLoading || questions.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleFinishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isLoading, questions.length]);

  // Reset question start time when moving to a new question
  useEffect(() => {
    questionStartTimeRef.current = Date.now();
  }, [currentIndex]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showExplanation) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleSubmitAnswer = async () => {
    if (selectedAnswer === null) {
      toast.error("Please select an answer");
      return;
    }

    const newAnswers = [...answers];
    newAnswers[currentIndex] = selectedAnswer;
    setAnswers(newAnswers);

    const isFirstAnswer = !hasAnsweredRef.current.has(currentIndex);
    hasAnsweredRef.current.add(currentIndex);

    // Calculate time spent on this question
    const timeSpent = Date.now() - questionStartTimeRef.current;

    // Submit answer to test session API (server-authoritative XP)
    const validation = await submitTestAnswer(
      sessionId || '',
      currentQuestion.id,
      currentIndex,
      selectedAnswer,
      timeSpent
    );

    // Store the correct answer and explanation for display
    setCurrentCorrectAnswer(validation.correctAnswer);
    setCurrentExplanation(validation.explanation);

    // Also store in the map for later reference (finish test)
    const updatedAnswersMap = new Map(questionAnswers);
    updatedAnswersMap.set(currentQuestion.id, {
      correctAnswer: validation.correctAnswer,
      explanation: validation.explanation,
    });
    setQuestionAnswers(updatedAnswersMap);

    setShowExplanation(true);

    const isCorrect = validation.correct;

    // XP is now calculated server-side
    const answerXp = validation.xpEarned;

    if (isFirstAnswer) {
      if (isCorrect) {
        setCurrentStreak(prev => prev + 1);
      } else {
        setCurrentStreak(0);
      }
    }

    if (answerXp > 0) {
      setXpEarned(prev => prev + answerXp);
    }

    if (isCorrect) {
      toast.success(
        <div className="flex items-center gap-2">
          <span>Correct! 🎉</span>
          {answerXp > 0 && (
            <span className="flex items-center gap-1 text-xs bg-primary/20 px-2 py-0.5 rounded-full">
              <Zap className="w-3 h-3" />+{answerXp} XP
            </span>
          )}
          {validation.flagged && (
            <span className="text-xs text-amber-500">(timing flagged)</span>
          )}
        </div>
      );
    } else {
      toast.error("Incorrect");
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setSelectedAnswer(answers[nextIndex]);
      setShowExplanation(answers[nextIndex] !== null);
      // Restore explanation if already answered
      if (answers[nextIndex] !== null) {
        const storedAnswer = questionAnswers.get(questions[nextIndex].id);
        if (storedAnswer) {
          setCurrentCorrectAnswer(storedAnswer.correctAnswer);
          setCurrentExplanation(storedAnswer.explanation);
        }
      } else {
        setCurrentCorrectAnswer(null);
        setCurrentExplanation("");
      }
    } else {
      handleFinishTest();
    }
  };

  const handleSkip = () => {
    setSkippedQuestions((prev) => new Set(prev).add(currentIndex));
    toast.info("Question marked for review");
    handleNext();
  };

  const jumpToQuestion = (index: number) => {
    setCurrentIndex(index);
    setSelectedAnswer(answers[index]);
    setShowExplanation(answers[index] !== null);
    // Restore explanation if already answered
    if (answers[index] !== null && questions[index]) {
      const storedAnswer = questionAnswers.get(questions[index].id);
      if (storedAnswer) {
        setCurrentCorrectAnswer(storedAnswer.correctAnswer);
        setCurrentExplanation(storedAnswer.explanation);
      }
    } else {
      setCurrentCorrectAnswer(null);
      setCurrentExplanation("");
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setSelectedAnswer(answers[prevIndex]);
      setShowExplanation(answers[prevIndex] !== null);
      // Restore explanation if already answered
      if (answers[prevIndex] !== null && questions[prevIndex]) {
        const storedAnswer = questionAnswers.get(questions[prevIndex].id);
        if (storedAnswer) {
          setCurrentCorrectAnswer(storedAnswer.correctAnswer);
          setCurrentExplanation(storedAnswer.explanation);
        }
      } else {
        setCurrentCorrectAnswer(null);
        setCurrentExplanation("");
      }
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCurrentExplanation("");
    setCurrentCorrectAnswer(null);
    setAnswers(Array(questions.length).fill(null));
    setSkippedQuestions(new Set());
    setTimeLeft(45 * 60);
    setXpEarned(0);
    setCurrentStreak(0);
    hasAnsweredRef.current = new Set();
    toast.success("Test reset successfully");
  };

  // Helper to check if an answer is correct using stored answers
  const isAnswerCorrect = (questionIndex: number, answer: number | null): boolean => {
    if (answer === null) return false;
    const question = questions[questionIndex];
    if (!question) return false;
    const storedAnswer = questionAnswers.get(question.id);
    return storedAnswer?.correctAnswer === answer;
  };

  const handleFinishTest = async () => {
    // Try to complete test via server API first
    const serverResults = sessionId ? await completeTestSession(sessionId) : null;

    let score: number;
    let passed: boolean;
    let timeSpent: number;
    let totalTestXp: number;
    let categoryBreakdown: Record<string, { correct: number; total: number }>;
    let isPerfect: boolean;

    if (serverResults) {
      // Use server-authoritative results
      score = serverResults.score;
      passed = serverResults.passed;
      timeSpent = serverResults.timeSpent;
      totalTestXp = serverResults.xpEarned;
      categoryBreakdown = serverResults.categoryBreakdown;
      isPerfect = score === serverResults.totalQuestions;

      if (serverResults.flagged) {
        toast.warning(`Test completed with reduced XP: ${serverResults.flagReason || 'Suspicious activity detected'}`);
      }
    } else {
      // Fallback to local calculation (for offline mode)
      score = answers.reduce((acc, answer, idx) => {
        return isAnswerCorrect(idx, answer) ? acc + 1 : acc;
      }, 0);

      passed = score >= 32; // 80% pass rate
      timeSpent = Math.round((Date.now() - startTime) / 1000);
      isPerfect = score === questions.length;

      // Calculate category breakdown locally
      categoryBreakdown = {};
      questions.forEach((q, idx) => {
        if (!categoryBreakdown[q.category]) {
          categoryBreakdown[q.category] = { correct: 0, total: 0 };
        }
        categoryBreakdown[q.category].total++;
        if (isAnswerCorrect(idx, answers[idx])) {
          categoryBreakdown[q.category].correct++;
        }
      });

      // Calculate total XP locally (fallback)
      totalTestXp = xpEarned;
      totalTestXp += XP_REWARDS.TEST_COMPLETE;
      if (passed) totalTestXp += XP_REWARDS.TEST_PASS;
      if (isPerfect) totalTestXp += XP_REWARDS.PERFECT_SCORE;
    }

    const testResult: TestResult = {
      id: sessionId || Date.now().toString(),
      date: new Date().toISOString(),
      score,
      totalQuestions: questions.length,
      categoryBreakdown,
      timeSpent,
      passed,
      xpEarned: totalTestXp,
    };

    // Update local progress cache
    // Note: When using server, XP is already updated there, but we still track locally for offline access
    let progress = getStoredProgress();
    progress.questionsCompleted += questions.length;
    progress.questionsCorrect += score;
    progress.testHistory.unshift(testResult);

    // Update category progress
    Object.entries(categoryBreakdown).forEach(([cat, stats]) => {
      if (!progress.categoryProgress[cat]) {
        progress.categoryProgress[cat] = { correct: 0, total: 0 };
      }
      progress.categoryProgress[cat].correct += stats.correct;
      progress.categoryProgress[cat].total += stats.total;
    });

    // Only update XP locally if we're in offline/local mode (no server results)
    if (!serverResults) {
      progress.xp += totalTestXp;
      progress.totalXpEarned += totalTestXp;
    }

    // Update correct streak tracking
    progress.bestCorrectStreak = Math.max(progress.bestCorrectStreak, currentStreak);

    // Update fastest test time
    if (passed && (progress.fastestTestTime === null || timeSpent < progress.fastestTestTime)) {
      progress.fastestTestTime = timeSpent;
    }

    // Update daily challenges (local tracking)
    const questionsResult = updateDailyChallengeProgress(progress, 'questions', questions.length);
    progress = questionsResult.progress;

    const correctResult = updateDailyChallengeProgress(progress, 'correct', score);
    progress = correctResult.progress;

    const testChallengeResult = updateDailyChallengeProgress(progress, 'test', 1);
    progress = testChallengeResult.progress;

    // Show challenge completion toasts
    [...questionsResult.completedChallenges, ...correctResult.completedChallenges, ...testChallengeResult.completedChallenges]
      .forEach(challenge => {
        toast.success(`🎯 Challenge Complete: ${challenge.description}`, {
          description: `+${challenge.xpReward} XP`,
        });
      });

    saveProgress(progress);

    navigate("/test-results", { state: { testResult, totalXpEarned: totalTestXp } });
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const getQuestionStatus = (index: number) => {
    if (answers[index] === null) return skippedQuestions.has(index) ? "skipped" : "unanswered";
    return isAnswerCorrect(index, answers[index]) ? "correct" : "incorrect";
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pb-6">
        <div className="bg-card border-b sticky top-0 z-10 shadow-sm">
          <div className="max-w-2xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
            <div className="flex items-center justify-between mb-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-32" />
            </div>
            <Skeleton className="h-2 w-full" />
          </div>
        </div>
        <div className="max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-8 w-full mb-4" />
              <div className="space-y-3">
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // No questions loaded
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-6 text-center">
          <p className="text-muted-foreground mb-4">No questions available</p>
          <Button onClick={() => navigate('/practice-selection')}>
            Go Back
          </Button>
        </Card>
      </div>
    );
  }

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
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 px-2 sm:h-9 sm:px-3">
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span className="text-xs sm:text-sm">Review</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Question Overview</SheetTitle>
                    <SheetDescription>Click on any question to jump to it</SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 grid grid-cols-5 gap-2">
                    {questions.map((_, idx) => {
                      const status = getQuestionStatus(idx);
                      return (
                        <button
                          key={idx}
                          onClick={() => jumpToQuestion(idx)}
                          className={cn(
                            "h-10 w-full rounded-md flex items-center justify-center text-xs font-medium transition-all",
                            currentIndex === idx && "ring-2 ring-primary ring-offset-2",
                            status === "correct" && "bg-success/20 text-success hover:bg-success/30",
                            status === "incorrect" && "bg-destructive/20 text-destructive hover:bg-destructive/30",
                            status === "skipped" && "bg-amber-500/20 text-amber-600 hover:bg-amber-500/30",
                            status === "unanswered" && "bg-muted text-muted-foreground hover:bg-muted/80",
                          )}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-6 space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded bg-success/20" />
                      <span>Correct</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded bg-destructive/20" />
                      <span>Incorrect</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded bg-amber-500/20" />
                      <span>Skipped</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded bg-muted" />
                      <span>Unanswered</span>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
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
                    <AlertDialogAction onClick={handleReset}>Reset Test</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <div className="flex items-center gap-1.5 sm:gap-2 px-2 py-1 rounded-md bg-muted/50">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className={cn("font-mono font-semibold tabular-nums", timeLeft < 300 && "text-destructive")}>
                  {minutes}:{seconds.toString().padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* Progress Dots */}
          <div className="mb-2 flex gap-1 overflow-x-auto py-1 scrollbar-hide">
            {questions.map((_, idx) => {
              const status = getQuestionStatus(idx);
              return (
                <button
                  key={idx}
                  onClick={() => jumpToQuestion(idx)}
                  className={cn(
                    "h-2 rounded-full transition-all flex-shrink-0",
                    currentIndex === idx ? "w-8" : "w-2",
                    status === "correct" && "bg-success",
                    status === "incorrect" && "bg-destructive",
                    status === "skipped" && "bg-amber-500",
                    status === "unanswered" && "bg-muted-foreground/30",
                  )}
                  title={`Question ${idx + 1}`}
                />
              );
            })}
          </div>
          {category && <div className="text-[10px] sm:text-xs text-muted-foreground mb-2">Category: {category}</div>}
          <Progress value={((currentIndex + 1) / questions.length) * 100} className="h-1.5 sm:h-2" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <Card>
          <CardContent className="p-4 sm:p-6">
            {/* Question */}
            <div className="mb-6">
              <div className="text-xs text-muted-foreground mb-2">{currentQuestion.category}</div>
              <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
              {currentQuestion.imageUrl && (
                <div className="mb-4 flex justify-center">
                  <img src={currentQuestion.imageUrl} alt="Road sign" className="w-32 h-32 object-contain" />
                </div>
              )}
            </div>

            {/* Options */}
            <RadioGroup value={selectedAnswer?.toString()} onValueChange={(val) => handleAnswerSelect(parseInt(val))}>
              <div className="space-y-2 sm:space-y-3">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedAnswer === idx;
                  const isCorrect = currentCorrectAnswer !== null && idx === currentCorrectAnswer;
                  const showCorrect = showExplanation && isCorrect;
                  const showIncorrect = showExplanation && isSelected && !isCorrect;

                  return (
                    <div
                      key={idx}
                      className={`flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        showCorrect
                          ? "border-success bg-success/5"
                          : showIncorrect
                            ? "border-destructive bg-destructive/5"
                            : isSelected
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => handleAnswerSelect(idx)}
                    >
                      <RadioGroupItem
                        value={idx.toString()}
                        id={`option-${idx}`}
                        disabled={showExplanation}
                        className="shrink-0"
                      />
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
            {showExplanation && currentExplanation && (
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg bg-muted animate-slide-up">
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Explanation</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{currentExplanation}</p>
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
                  <Button variant="secondary" onClick={handleSkip} className="h-10 sm:h-11 text-sm sm:text-base">
                    <SkipForward className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Skip
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
                  <Button className="flex-1 gap-2 h-10 sm:h-11 text-sm sm:text-base" onClick={handleNext}>
                    {currentIndex < questions.length - 1 ? (
                      <>
                        Next <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </>
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
        <div className="mt-3 sm:mt-4 text-center">
          <div className="inline-flex items-center gap-3 text-xs sm:text-sm px-4 py-2 rounded-lg bg-muted/50">
            <span className="font-medium">
              {answers.filter((a, i) => isAnswerCorrect(i, a)).length} correct
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="font-medium">{answers.filter((a) => a !== null).length} answered</span>
            {answers.filter((a) => a !== null).length > 0 && (
              <>
                <span className="text-muted-foreground">•</span>
                <span
                  className={cn(
                    "font-semibold",
                    answers.filter((a, i) => isAnswerCorrect(i, a)).length /
                      answers.filter((a) => a !== null).length >=
                      0.8
                      ? "text-success"
                      : "text-muted-foreground",
                  )}
                >
                  {Math.round(
                    (answers.filter((a, i) => isAnswerCorrect(i, a)).length /
                      answers.filter((a) => a !== null).length) *
                      100,
                  )}
                  % accuracy
                </span>
              </>
            )}
            <span className="text-muted-foreground">•</span>
            <span className="flex items-center gap-1 font-semibold text-primary">
              <Zap className="w-3 h-3" />
              {xpEarned} XP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeTest;
