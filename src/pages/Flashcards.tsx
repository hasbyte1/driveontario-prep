import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { questions, CATEGORIES } from "@/data/questions";
import { ArrowLeft, ArrowRight, RotateCw, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Flashcards = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [knownCards, setKnownCards] = useState<Set<string>>(new Set());

  const currentCard = questions[currentIndex];

  const handleFlip = () => {
    setShowAnswer(!showAnswer);
  };

  const handleNext = () => {
    setShowAnswer(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrevious = () => {
    setShowAnswer(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleKnowIt = () => {
    setKnownCards(new Set([...knownCards, currentCard.id]));
    handleNext();
  };

  const handleDontKnow = () => {
    knownCards.delete(currentCard.id);
    setKnownCards(new Set(knownCards));
    handleNext();
  };

  const progress = Math.round((knownCards.size / questions.length) * 100);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <span className="text-sm font-medium">
              {currentIndex + 1} / {questions.length}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-success transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-medium">{progress}% mastered</span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Flashcard */}
        <div 
          className="mb-6 cursor-pointer perspective-1000"
          onClick={handleFlip}
        >
          <Card className={`min-h-[400px] transition-all duration-500 ${showAnswer ? 'rotate-y-180' : ''}`}>
            <CardContent className="p-8 flex flex-col items-center justify-center min-h-[400px]">
              {!showAnswer ? (
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-4">
                    {currentCard.category}
                  </div>
                  <h2 className="text-2xl font-bold mb-6">
                    {currentCard.question}
                  </h2>
                  <p className="text-muted-foreground">
                    Tap to reveal answer
                  </p>
                </div>
              ) : (
                <div className="text-center w-full">
                  <div className="text-lg font-semibold mb-4 text-success">
                    {currentCard.options[currentCard.correctAnswer]}
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-left">
                    <p className="text-sm">{currentCard.explanation}</p>
                  </div>
                  <p className="text-muted-foreground mt-4 text-sm">
                    Tap to flip back
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        {showAnswer && (
          <div className="grid grid-cols-2 gap-3 mb-6 animate-slide-up">
            <Button 
              variant="outline" 
              size="lg"
              className="h-16 gap-2 border-destructive/50 hover:bg-destructive/10"
              onClick={handleDontKnow}
            >
              <XCircle className="w-5 h-5 text-destructive" />
              Need Practice
            </Button>
            <Button 
              size="lg"
              className="h-16 gap-2 bg-success hover:bg-success/90"
              onClick={handleKnowIt}
            >
              <CheckCircle className="w-5 h-5" />
              I Know This
            </Button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <Button 
            variant="ghost"
            size="sm"
            onClick={handleFlip}
          >
            <RotateCw className="w-4 h-4 mr-2" />
            Flip
          </Button>

          <Button 
            variant="outline" 
            onClick={handleNext}
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Cards mastered: {knownCards.size} / {questions.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcards;
