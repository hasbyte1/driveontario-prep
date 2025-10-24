import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ProgressBar";
import { CATEGORIES, getQuestionsByCategory } from "@/data/questions";
import { getStoredProgress, saveProgress } from "@/utils/storage";
import { 
  ArrowLeft, 
  Play, 
  RotateCcw, 
  SignpostBig, 
  Car, 
  Shield, 
  Wine, 
  FileText, 
  MoreHorizontal 
} from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const categoryInfo = {
  [CATEGORIES.SIGNS]: {
    icon: SignpostBig,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    description: "Learn to recognize and understand all Ontario road signs and traffic signals"
  },
  [CATEGORIES.RULES]: {
    icon: Car,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    description: "Master the rules of the road including speed limits, right-of-way, and parking regulations"
  },
  [CATEGORIES.SAFETY]: {
    icon: Shield,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    description: "Understand safe driving practices, vehicle handling, and emergency procedures"
  },
  [CATEGORIES.ALCOHOL]: {
    icon: Wine,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    description: "Know the laws and penalties related to impaired driving and substance use"
  },
  [CATEGORIES.LICENSE]: {
    icon: FileText,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    description: "Learn about licensing requirements, documents, and G1/G2 restrictions"
  },
  [CATEGORIES.MISC]: {
    icon: MoreHorizontal,
    color: "text-gray-500",
    bgColor: "bg-gray-500/10",
    description: "Additional important topics including demerit points, collisions, and regulations"
  }
};

const PracticeSelection = () => {
  const navigate = useNavigate();
  const progress = getStoredProgress();

  const handleResetCategory = (category: string) => {
    const updatedProgress = { ...progress };
    if (updatedProgress.categoryProgress[category]) {
      delete updatedProgress.categoryProgress[category];
      saveProgress(updatedProgress);
      toast.success(`Reset progress for ${category}`);
    }
  };

  const handleStartPractice = (category?: string) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    navigate(`/practice?${params.toString()}`);
  };

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
          <h1 className="text-3xl font-bold mb-2">Practice Tests</h1>
          <p className="text-primary-foreground/80">Choose a category to practice or take a full G1 simulation</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Full Test Option */}
        <Card className="mb-6 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent animate-slide-up">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Play className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">Full G1 Simulation</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  40 random questions, 45-minute timer, 80% pass required
                </p>
                <Button onClick={() => handleStartPractice()}>
                  Start Full Test
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Practice by Category</h2>
          
          {Object.entries(CATEGORIES).map(([key, category], index) => {
            const info = categoryInfo[category];
            const Icon = info.icon;
            const categoryQuestions = getQuestionsByCategory(category);
            const categoryStats = progress.categoryProgress[category] || { correct: 0, total: 0 };
            const percentage = categoryStats.total > 0 
              ? Math.round((categoryStats.correct / categoryStats.total) * 100) 
              : 0;

            return (
              <Card 
                key={category} 
                className="animate-slide-up hover:shadow-md transition-shadow"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-lg ${info.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${info.color}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold mb-1">{category}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {info.description}
                      </p>
                      <p className="text-xs text-muted-foreground mb-3">
                        {categoryQuestions.length} questions available
                      </p>

                      {/* Progress */}
                      {categoryStats.total > 0 && (
                        <div className="mb-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Your Progress</span>
                            <span className="font-semibold">
                              {categoryStats.correct}/{categoryStats.total} ({percentage}%)
                            </span>
                          </div>
                          <ProgressBar 
                            current={categoryStats.correct} 
                            total={categoryStats.total}
                            variant={percentage >= 80 ? "success" : percentage >= 60 ? "primary" : "warning"}
                            showLabel={false}
                          />
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button 
                          size="sm"
                          onClick={() => handleStartPractice(category)}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Practice
                        </Button>
                        
                        {categoryStats.total > 0 && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Reset
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Reset Progress?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will clear all your progress for {category}. This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleResetCategory(category)}>
                                  Reset
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PracticeSelection;
