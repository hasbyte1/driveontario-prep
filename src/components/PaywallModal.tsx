import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePremium, PRICING, PREMIUM_FEATURES, type PlanType } from '@/contexts/PremiumContext';
import { Check, Crown, Zap, X, Star } from 'lucide-react';
import { toast } from 'sonner';

export const PaywallModal = () => {
  const { showPaywall, setShowPaywall, paywallFeature, upgradeToPremium } = usePremium();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly' | 'lifetime'>('lifetime');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchase = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In production, this would integrate with Stripe/RevenueCat
    upgradeToPremium(selectedPlan);

    toast.success('Welcome to Premium!', {
      description: 'You now have access to all features.',
    });

    setIsProcessing(false);
  };

  const getPaywallMessage = () => {
    switch (paywallFeature) {
      case 'questions':
        return "You've reached your daily question limit";
      case 'tests':
        return "You've used all your free tests today";
      case 'flashcards':
        return 'Unlock all flashcards with Premium';
      case 'analytics':
        return 'Get detailed analytics with Premium';
      case 'history':
        return 'Access your full test history';
      case 'offline':
        return 'Study offline with Premium';
      default:
        return 'Unlock all features with Premium';
    }
  };

  return (
    <Dialog open={showPaywall} onOpenChange={setShowPaywall}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-3">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl">Upgrade to Premium</DialogTitle>
          <DialogDescription className="text-base">
            {getPaywallMessage()}
          </DialogDescription>
        </DialogHeader>

        {/* Plan Selection */}
        <div className="space-y-3 my-4">
          {/* Lifetime - Best Value */}
          <Card
            className={`cursor-pointer transition-all ${
              selectedPlan === 'lifetime'
                ? 'ring-2 ring-primary border-primary bg-primary/5'
                : 'hover:border-primary/50'
            }`}
            onClick={() => setSelectedPlan('lifetime')}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === 'lifetime' ? 'border-primary bg-primary' : 'border-muted-foreground'
                    }`}
                  >
                    {selectedPlan === 'lifetime' && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Lifetime</span>
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-[10px]">
                        BEST VALUE
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Pay once, own forever</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">${PRICING.lifetime.price}</div>
                  <div className="text-xs text-muted-foreground">one-time</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Yearly */}
          <Card
            className={`cursor-pointer transition-all ${
              selectedPlan === 'yearly'
                ? 'ring-2 ring-primary border-primary bg-primary/5'
                : 'hover:border-primary/50'
            }`}
            onClick={() => setSelectedPlan('yearly')}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === 'yearly' ? 'border-primary bg-primary' : 'border-muted-foreground'
                    }`}
                  >
                    {selectedPlan === 'yearly' && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Yearly</span>
                      <Badge variant="secondary" className="text-[10px]">
                        SAVE 50%
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      ${PRICING.yearly.monthlyEquivalent}/month
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">${PRICING.yearly.price}</div>
                  <div className="text-xs text-muted-foreground">/year</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly */}
          <Card
            className={`cursor-pointer transition-all ${
              selectedPlan === 'monthly'
                ? 'ring-2 ring-primary border-primary bg-primary/5'
                : 'hover:border-primary/50'
            }`}
            onClick={() => setSelectedPlan('monthly')}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === 'monthly' ? 'border-primary bg-primary' : 'border-muted-foreground'
                    }`}
                  >
                    {selectedPlan === 'monthly' && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <div>
                    <span className="font-semibold">Monthly</span>
                    <p className="text-sm text-muted-foreground">Cancel anytime</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">${PRICING.monthly.price}</div>
                  <div className="text-xs text-muted-foreground">/month</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features List */}
        <div className="bg-muted/50 rounded-lg p-4 mb-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" />
            Premium includes:
          </h4>
          <ul className="space-y-2">
            {PREMIUM_FEATURES.slice(0, 6).map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-success flex-shrink-0" />
                <span>{feature.title}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <Button
          size="lg"
          className="w-full h-12 text-base bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
          onClick={handlePurchase}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Unlock Premium - $
              {selectedPlan === 'lifetime'
                ? PRICING.lifetime.price
                : selectedPlan === 'yearly'
                  ? PRICING.yearly.price
                  : PRICING.monthly.price}
            </span>
          )}
        </Button>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-4 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3" /> Secure payment
          </span>
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3" /> Cancel anytime
          </span>
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3" /> Instant access
          </span>
        </div>

        {/* Skip for now */}
        <button
          className="w-full text-center text-sm text-muted-foreground hover:text-foreground mt-2 py-2"
          onClick={() => setShowPaywall(false)}
        >
          Maybe later
        </button>
      </DialogContent>
    </Dialog>
  );
};

// Smaller inline paywall banner for use within pages
export const PaywallBanner = ({ feature, message }: { feature: string; message?: string }) => {
  const { triggerPaywall } = usePremium();

  return (
    <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
          <Crown className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-semibold text-sm">
            {message || 'Upgrade to Premium'}
          </p>
          <p className="text-xs text-muted-foreground">
            Unlock unlimited access and all features
          </p>
        </div>
      </div>
      <Button
        size="sm"
        className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 flex-shrink-0"
        onClick={() => triggerPaywall(feature)}
      >
        Upgrade
      </Button>
    </div>
  );
};

// Premium badge component
export const PremiumBadge = ({ className = '' }: { className?: string }) => {
  return (
    <Badge
      className={`bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-[10px] ${className}`}
    >
      <Crown className="w-3 h-3 mr-1" />
      PRO
    </Badge>
  );
};

// Lock overlay for premium features
export const PremiumLock = ({
  feature,
  children,
}: {
  feature: string;
  children: React.ReactNode;
}) => {
  const { isPremium, triggerPaywall } = usePremium();

  if (isPremium) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <div className="opacity-50 pointer-events-none blur-[2px]">{children}</div>
      <div
        className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm cursor-pointer"
        onClick={() => triggerPaywall(feature)}
      >
        <div className="text-center p-4">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <p className="font-semibold text-sm">Premium Feature</p>
          <p className="text-xs text-muted-foreground">Tap to unlock</p>
        </div>
      </div>
    </div>
  );
};
