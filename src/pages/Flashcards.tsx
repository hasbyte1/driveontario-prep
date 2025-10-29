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
        <div className="max-w-2xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="h-8 sm:h-9 text-xs sm:text-sm">
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Back
            </Button>
            <span className="text-xs sm:text-sm font-medium">
              {currentIndex + 1} / {questions.length}
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex-1 h-1.5 sm:h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-success transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs sm:text-sm font-medium whitespace-nowrap">{progress}% mastered</span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Flashcard */}
        <div 
          className="mb-4 sm:mb-6 cursor-pointer perspective-1000"
          onClick={handleFlip}
        >
          <Card className={`min-h-[300px] sm:min-h-[400px] transition-all duration-500 ${showAnswer ? 'rotate-y-180' : ''}`}>
            <CardContent className="p-6 sm:p-8 flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px]">
              {!showAnswer ? (
                <div className="text-center">
                  <div className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                    {currentCard.category}
                  </div>
                  {currentCard.imageUrl && (
                    <div className="mb-4 sm:mb-6 flex justify-center">
                      <img 
                        src={currentCard.imageUrl} 
                        alt="Road sign" 
                        className="w-28 h-28 sm:w-40 sm:h-40 object-contain"
                      />
                    </div>
                  )}
                  <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6">
                    {currentCard.question}
                  </h2>
                  <p className="text-xs sm:text-base text-muted-foreground">
                    Tap to reveal answer
                  </p>
                </div>
              ) : (
                <div className="text-center w-full">
                  <div className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-success">
                    {currentCard.options[currentCard.correctAnswer]}
                  </div>
                  <div className="p-3 sm:p-4 bg-muted rounded-lg text-left">
                    <p className="text-xs sm:text-sm">{currentCard.explanation}</p>
                  </div>
                  <p className="text-muted-foreground mt-3 sm:mt-4 text-xs sm:text-sm">
                    Tap to flip back
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        {showAnswer && (
          <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6 animate-slide-up">
            <Button 
              variant="outline" 
              size="lg"
              className="h-14 sm:h-16 gap-2 border-destructive/50 hover:bg-destructive/10 text-sm sm:text-base"
              onClick={handleDontKnow}
            >
              <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-destructive" />
              Need Practice
            </Button>
            <Button 
              size="lg"
              className="h-14 sm:h-16 gap-2 bg-success hover:bg-success/90 text-sm sm:text-base"
              onClick={handleKnowIt}
            >
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
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
            className="h-10 sm:h-11 text-sm sm:text-base"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Previous
          </Button>
          
          <Button 
            variant="ghost"
            size="sm"
            onClick={handleFlip}
            className="h-10 sm:h-11 text-sm sm:text-base"
          >
            <RotateCw className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Flip
          </Button>

          <Button 
            variant="outline" 
            onClick={handleNext}
            className="h-10 sm:h-11 text-sm sm:text-base"
          >
            Next
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-muted-foreground">
          <p>Cards mastered: {knownCards.size} / {questions.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcards;
