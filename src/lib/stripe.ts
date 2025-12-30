import { pb } from './pocketbase';

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

// Check if backend is configured (has a real Pocketbase URL)
export const isBackendConfigured = (): boolean => {
  return !!pb.baseURL && !pb.baseURL.includes('localhost:8090');
};

/**
 * Create a Stripe checkout session
 * Backend handles all Stripe configuration - frontend only sends plan name
 */
export const createCheckoutSession = async (
  plan: PlanType,
  successUrl: string = `${window.location.origin}/premium?success=true`,
  cancelUrl: string = `${window.location.origin}/premium?cancelled=true`
): Promise<CheckoutSessionResponse | null> => {
  try {
    const response = await fetch(`${pb.baseURL}/api/stripe/create-checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': pb.authStore.token || '',
      },
      body: JSON.stringify({
        plan,
        successUrl,
        cancelUrl,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.error('Checkout error:', error);
      throw new Error(error.error || 'Failed to create checkout session');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return null;
  }
};

/**
 * Redirect to Stripe checkout
 * Returns true if redirect initiated, false on error
 */
export const redirectToCheckout = async (plan: PlanType): Promise<boolean> => {
  if (!pb.authStore.isValid) {
    console.error('User must be logged in to checkout');
    return false;
  }

  const session = await createCheckoutSession(plan);
  if (!session?.url) {
    console.error('Failed to create checkout session');
    return false;
  }

  // Redirect to Stripe-hosted checkout page
  window.location.href = session.url;
  return true;
};

/**
 * Get the current subscription status for the authenticated user
 */
export const getSubscriptionStatus = async (): Promise<SubscriptionStatus | null> => {
  if (!pb.authStore.isValid) {
    return null;
  }

  try {
    const response = await fetch(`${pb.baseURL}/api/stripe/subscription-status`, {
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
 * Cancel the current subscription
 */
export const cancelSubscription = async (): Promise<boolean> => {
  if (!pb.authStore.isValid) {
    return false;
  }

  try {
    const response = await fetch(`${pb.baseURL}/api/stripe/cancel-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': pb.authStore.token || '',
      },
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
export const resumeSubscription = async (): Promise<boolean> => {
  if (!pb.authStore.isValid) {
    return false;
  }

  try {
    const response = await fetch(`${pb.baseURL}/api/stripe/resume-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': pb.authStore.token || '',
      },
    });

    return response.ok;
  } catch (error) {
    console.error('Error resuming subscription:', error);
    return false;
  }
};

/**
 * Open Stripe customer portal for subscription management
 */
export const openCustomerPortal = async (): Promise<boolean> => {
  if (!pb.authStore.isValid) {
    return false;
  }

  try {
    const response = await fetch(`${pb.baseURL}/api/stripe/customer-portal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': pb.authStore.token || '',
      },
      body: JSON.stringify({
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

// Demo mode functions for testing without backend
export const demoCheckout = async (_plan: PlanType): Promise<boolean> => {
  // Simulate checkout delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  return true;
};

export const isDemoMode = (): boolean => {
  return !isBackendConfigured();
};
