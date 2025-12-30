import { loadStripe, Stripe } from '@stripe/stripe-js';
import { pb } from './pocketbase';

// Stripe public key from environment
const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY || '';

// Initialize Stripe
let stripePromise: Promise<Stripe | null> | null = null;

export const getStripe = (): Promise<Stripe | null> => {
  if (!STRIPE_PUBLIC_KEY) {
    console.warn('Stripe public key not configured');
    return Promise.resolve(null);
  }

  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
  }
  return stripePromise;
};

// Check if Stripe is configured
export const isStripeConfigured = (): boolean => {
  return !!STRIPE_PUBLIC_KEY;
};

// Pricing IDs (set these in your Stripe dashboard)
export const STRIPE_PRICES = {
  monthly: import.meta.env.VITE_STRIPE_PRICE_MONTHLY || 'price_monthly',
  yearly: import.meta.env.VITE_STRIPE_PRICE_YEARLY || 'price_yearly',
  lifetime: import.meta.env.VITE_STRIPE_PRICE_LIFETIME || 'price_lifetime',
} as const;

export type PlanType = 'monthly' | 'yearly' | 'lifetime';

interface CheckoutSessionResponse {
  sessionId: string;
  url: string;
}

interface SubscriptionStatus {
  active: boolean;
  plan: PlanType | 'free';
  expiresAt: string | null;
  cancelAtPeriodEnd: boolean;
}

/**
 * Create a Stripe checkout session for a subscription
 * This calls a Pocketbase function/webhook that creates the session
 */
export const createCheckoutSession = async (
  plan: PlanType,
  userId: string,
  successUrl: string = `${window.location.origin}/premium?success=true`,
  cancelUrl: string = `${window.location.origin}/premium?cancelled=true`
): Promise<CheckoutSessionResponse | null> => {
  try {
    // Call Pocketbase API to create checkout session
    // This should be a custom endpoint that creates the Stripe session server-side
    const response = await fetch(`${pb.baseURL}/api/stripe/create-checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': pb.authStore.token || '',
      },
      body: JSON.stringify({
        plan,
        userId,
        priceId: STRIPE_PRICES[plan],
        successUrl,
        cancelUrl,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const data = await response.json();
    return data as CheckoutSessionResponse;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return null;
  }
};

/**
 * Redirect to Stripe checkout
 */
export const redirectToCheckout = async (plan: PlanType, userId: string): Promise<boolean> => {
  const stripe = await getStripe();
  if (!stripe) {
    console.error('Stripe not initialized');
    return false;
  }

  const session = await createCheckoutSession(plan, userId);
  if (!session) {
    return false;
  }

  if (!session.url) {
    console.error('Stripe session url is invalid:', session);
    return false
  }

  // Redirect to Stripe checkout
  window.location.href = session.url;

  // https://docs.stripe.com/changelog/clover/2025-09-30/remove-redirect-to-checkout
  // Below code is commented because `redirectToCheckout` has been removed from the library
  // const { error } = await stripe.redirectToCheckout({
  //   sessionId: session.sessionId,
  // });

  // if (error) {
  //   console.error('Stripe redirect error:', error);
  //   return false;
  // }

  return true;
};

/**
 * Get the current subscription status for a user
 */
export const getSubscriptionStatus = async (userId: string): Promise<SubscriptionStatus | null> => {
  try {
    const response = await fetch(`${pb.baseURL}/api/stripe/subscription-status/${userId}`, {
      headers: {
        'Authorization': pb.authStore.token || '',
      },
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting subscription status:', error);
    return null;
  }
};

/**
 * Cancel a subscription
 */
export const cancelSubscription = async (userId: string): Promise<boolean> => {
  try {
    const response = await fetch(`${pb.baseURL}/api/stripe/cancel-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': pb.authStore.token || '',
      },
      body: JSON.stringify({ userId }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    return false;
  }
};

/**
 * Resume a cancelled subscription (before it expires)
 */
export const resumeSubscription = async (userId: string): Promise<boolean> => {
  try {
    const response = await fetch(`${pb.baseURL}/api/stripe/resume-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': pb.authStore.token || '',
      },
      body: JSON.stringify({ userId }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error resuming subscription:', error);
    return false;
  }
};

/**
 * Open customer portal for subscription management
 */
export const openCustomerPortal = async (userId: string): Promise<boolean> => {
  try {
    const response = await fetch(`${pb.baseURL}/api/stripe/customer-portal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': pb.authStore.token || '',
      },
      body: JSON.stringify({
        userId,
        returnUrl: window.location.href,
      }),
    });

    if (!response.ok) {
      return false;
    }

    const { url } = await response.json();
    window.location.href = url;
    return true;
  } catch (error) {
    console.error('Error opening customer portal:', error);
    return false;
  }
};

// Demo mode functions for testing without Stripe
export const demoCheckout = async (plan: PlanType): Promise<boolean> => {
  // Simulate checkout delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  return true;
};

export const isDemoMode = (): boolean => {
  return !isStripeConfigured();
};
