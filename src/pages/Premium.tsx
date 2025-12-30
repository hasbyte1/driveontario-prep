import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  usePremium,
  PRICING,
  PREMIUM_FEATURES,
  FREE_LIMITS,
} from '@/contexts/PremiumContext';
import {
  Crown,
  Check,
  X,
  ArrowLeft,
  Zap,
  Star,
  Shield,
  Gift,
} from 'lucide-react';
import { toast } from 'sonner';

const Premium = () => {
  const navigate = useNavigate();
  const { isPremium, state, upgradeToPremium, cancelPremium, isProcessing } = usePremium();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly' | 'lifetime'>('lifetime');

  const handlePurchase = async () => {
    const success = await upgradeToPremium(selectedPlan);
    if (success) {
      toast.success('Welcome to Premium!', {
        description: 'You now have access to all features.',
      });
    } else {
      toast.error('Purchase failed', {
        description: 'Please try again or contact support.',
      });
    }
  };

  const handleCancel = async () => {
    const success = await cancelPremium();
    if (success) {
      toast.info('Premium cancelled', {
        description: 'You can re-subscribe anytime.',
      });
    } else {
      toast.error('Failed to cancel', {
        description: 'Please try again or contact support.',
      });
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-6 text-white">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            className="mb-4 text-white/80 hover:text-white hover:bg-white/10"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {isPremium ? 'You\'re Premium!' : 'Upgrade to Premium'}
            </h1>
            <p className="text-white/80">
              {isPremium
                ? 'Enjoy unlimited access to all features'
                : 'Unlock your full potential with Premium'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 -mt-4">
        {/* Current Status (if premium) */}
        {isPremium && (
          <Card className="mb-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                      {state.plan.toUpperCase()}
                    </Badge>
                    <span className="text-sm text-muted-foreground">plan</span>
                  </div>
                  {state.expiresAt && state.plan !== 'lifetime' ? (
                    <p className="text-sm text-muted-foreground">
                      Renews on {formatDate(state.expiresAt)}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Lifetime access - no expiry
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">Active</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={handleCancel}
                  >
                    Cancel subscription
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Plan Selection (if not premium) */}
        {!isPremium && (
          <>
            <div className="space-y-3 mb-6">
              {/* Lifetime */}
              <Card
                className={`cursor-pointer transition-all ${
                  selectedPlan === 'lifetime'
                    ? 'ring-2 ring-yellow-500 border-yellow-500 bg-yellow-500/5'
                    : 'hover:border-yellow-500/50'
                }`}
                onClick={() => setSelectedPlan('lifetime')}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedPlan === 'lifetime'
                            ? 'border-yellow-500 bg-yellow-500'
                            : 'border-muted-foreground'
                        }`}
                      >
                        {selectedPlan === 'lifetime' && <Check className="w-4 h-4 text-white" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg">Lifetime</span>
                          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                            BEST VALUE
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Pay once, own forever</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">${PRICING.lifetime.price}</div>
                      <div className="text-sm text-muted-foreground">one-time payment</div>
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
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedPlan === 'yearly'
                            ? 'border-primary bg-primary'
                            : 'border-muted-foreground'
                        }`}
                      >
                        {selectedPlan === 'yearly' && <Check className="w-4 h-4 text-white" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg">Yearly</span>
                          <Badge variant="secondary">SAVE 50%</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Just ${PRICING.yearly.monthlyEquivalent}/month
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">${PRICING.yearly.price}</div>
                      <div className="text-sm text-muted-foreground">/year</div>
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
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedPlan === 'monthly'
                            ? 'border-primary bg-primary'
                            : 'border-muted-foreground'
                        }`}
                      >
                        {selectedPlan === 'monthly' && <Check className="w-4 h-4 text-white" />}
                      </div>
                      <div>
                        <span className="font-bold text-lg">Monthly</span>
                        <p className="text-sm text-muted-foreground">Cancel anytime</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">${PRICING.monthly.price}</div>
                      <div className="text-sm text-muted-foreground">/month</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CTA Button */}
            <Button
              size="lg"
              className="w-full h-14 text-lg bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 mb-6"
              onClick={handlePurchase}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Get Premium Now
                </span>
              )}
            </Button>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-6 mb-8 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4" /> Secure payment
              </span>
              <span className="flex items-center gap-1">
                <Gift className="w-4 h-4" /> 7-day guarantee
              </span>
            </div>
          </>
        )}

        {/* Feature Comparison */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Premium Features
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {PREMIUM_FEATURES.map((feature, idx) => (
                <div key={idx} className="p-4 flex items-start gap-4">
                  <div className="text-2xl">{feature.icon}</div>
                  <div className="flex-1">
                    <p className="font-semibold">{feature.title}</p>
                    <p className="text-sm text-muted-foreground mb-2">{feature.description}</p>
                    <div className="flex gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <X className="w-3 h-3 text-destructive" />
                        <span className="text-muted-foreground">Free: {feature.free}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Check className="w-3 h-3 text-success" />
                        <span className="text-success font-medium">Premium: {feature.premium}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Daily Limits Info (for free users) */}
        {!isPremium && (
          <Card className="mb-6 bg-muted/50">
            <CardHeader>
              <CardTitle className="text-base">Your Daily Limits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Questions per day</p>
                  <p className="font-bold">{FREE_LIMITS.questionsPerDay}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Tests per day</p>
                  <p className="font-bold">{FREE_LIMITS.testsPerDay}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Flashcard access</p>
                  <p className="font-bold">First {FREE_LIMITS.flashcardsAccess} only</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Test history</p>
                  <p className="font-bold">{FREE_LIMITS.testHistoryDays} days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold text-sm">Can I cancel anytime?</p>
              <p className="text-sm text-muted-foreground">
                Yes! Monthly and yearly plans can be cancelled anytime. Lifetime is a one-time
                purchase.
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm">Is there a refund policy?</p>
              <p className="text-sm text-muted-foreground">
                We offer a 7-day money-back guarantee if you're not satisfied.
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm">What payment methods are accepted?</p>
              <p className="text-sm text-muted-foreground">
                Credit/debit cards, Apple Pay, Google Pay, and PayPal.
              </p>
            </div>
            <div>
              <p className="font-semibold text-sm">Will I get access to future updates?</p>
              <p className="text-sm text-muted-foreground">
                Yes! All premium users get access to new features and question banks.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Premium;
