/**
 * License API Client
 *
 * This module provides functions to interact with the license key system.
 * It handles license redemption, validation, and status checking.
 */

import { pb } from './pocketbase';

// ============================================
// Types
// ============================================

export interface LicenseInfo {
  type: 'lifetime' | 'enterprise' | 'promo' | 'gift';
  plan: 'monthly' | 'yearly' | 'lifetime';
  expiresAt: string | null;
  isActive: boolean;
}

export interface RedeemResponse {
  success: boolean;
  message: string;
  plan?: string;
  type?: string;
  expiresAt?: string | null;
  error?: string;
}

export interface ValidateResponse {
  hasLicense: boolean;
  isPremium: boolean;
  license?: LicenseInfo;
}

export interface GenerateLicenseRequest {
  type: 'lifetime' | 'enterprise' | 'promo' | 'gift';
  plan: 'monthly' | 'yearly' | 'lifetime';
  count: number;
  maxActivations?: number;
  expiresAt?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface GenerateLicenseResponse {
  success: boolean;
  count: number;
  licenses: string[];
}

export interface LicenseListItem {
  id: string;
  key: string;
  type: string;
  plan: string;
  user: string;
  isActive: boolean;
  isRevoked: boolean;
  activations: number;
  maxActivations: number;
  expiresAt: string | null;
  redeemedAt: string | null;
  created: string;
}

// ============================================
// Helper Functions
// ============================================

/**
 * Check if backend is available
 */
const isBackendAvailable = (): boolean => {
  return !!pb.baseURL && !pb.baseURL.includes('localhost:8090');
};

/**
 * Normalize a license key (uppercase, remove spaces and dashes for validation)
 */
export function normalizeLicenseKey(key: string): string {
  return key.toUpperCase().replace(/\s/g, '').trim();
}

/**
 * Format a license key for display (add dashes if needed)
 */
export function formatLicenseKeyForDisplay(key: string): string {
  const normalized = normalizeLicenseKey(key);
  if (normalized.includes('-')) return normalized;

  // Add dashes: DPREP-XXXXX-XXXXX-XXXXX-XXXXX
  const parts = [];
  parts.push(normalized.slice(0, 5)); // DPREP
  parts.push(normalized.slice(5, 10));
  parts.push(normalized.slice(10, 15));
  parts.push(normalized.slice(15, 20));
  parts.push(normalized.slice(20, 25));

  return parts.filter(p => p.length > 0).join('-');
}

/**
 * Validate license key format locally (before sending to server)
 */
export function validateLicenseKeyFormat(key: string): boolean {
  const normalized = normalizeLicenseKey(key);

  // Remove dashes for validation
  const keyWithoutDashes = normalized.replace(/-/g, '');

  // Should be 25 characters: DPREP + 4 segments of 5 chars
  if (keyWithoutDashes.length !== 25) return false;

  // Should start with DPREP
  if (!keyWithoutDashes.startsWith('DPREP')) return false;

  // Should only contain valid characters (excluding confusing chars)
  const validChars = /^[ABCDEFGHJKMNPQRSTUVWXYZ23456789]+$/;
  if (!validChars.test(keyWithoutDashes.slice(5))) return false;

  return true;
}

// ============================================
// API Functions
// ============================================

/**
 * Redeem a license key
 */
export async function redeemLicenseKey(
  key: string,
  deviceFingerprint?: string
): Promise<RedeemResponse> {
  if (!isBackendAvailable() || !pb.authStore.isValid) {
    return {
      success: false,
      message: 'Authentication required',
      error: 'Please log in to redeem a license key',
    };
  }

  // Validate format locally first
  if (!validateLicenseKeyFormat(key)) {
    return {
      success: false,
      message: 'Invalid license key format',
      error: 'Please check your license key and try again',
    };
  }

  try {
    const response = await fetch(`${pb.baseURL}/api/license/redeem`, {
      method: 'POST',
      headers: {
        'Authorization': pb.authStore.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: normalizeLicenseKey(key),
        deviceFingerprint: deviceFingerprint || getDeviceFingerprint(),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.error || 'Failed to redeem license',
        error: data.error,
      };
    }

    return {
      success: data.success,
      message: data.message,
      plan: data.plan,
      type: data.type,
      expiresAt: data.expiresAt,
    };
  } catch (error) {
    console.error('Error redeeming license:', error);
    return {
      success: false,
      message: 'Network error',
      error: 'Please check your connection and try again',
    };
  }
}

/**
 * Validate current license status
 */
export async function validateLicense(): Promise<ValidateResponse> {
  if (!isBackendAvailable() || !pb.authStore.isValid) {
    return {
      hasLicense: false,
      isPremium: false,
    };
  }

  try {
    const response = await fetch(`${pb.baseURL}/api/license/validate`, {
      headers: {
        'Authorization': pb.authStore.token,
      },
    });

    if (!response.ok) {
      return {
        hasLicense: false,
        isPremium: false,
      };
    }

    return await response.json();
  } catch (error) {
    console.error('Error validating license:', error);
    return {
      hasLicense: false,
      isPremium: false,
    };
  }
}

/**
 * Generate a simple device fingerprint for activation tracking
 */
function getDeviceFingerprint(): string {
  const components = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
  ];

  // Simple hash
  const str = components.join('|');
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }

  return hash.toString(16);
}

// ============================================
// Admin Functions
// ============================================

/**
 * Generate new license keys (admin only)
 */
export async function generateLicenses(
  request: GenerateLicenseRequest
): Promise<GenerateLicenseResponse | null> {
  if (!isBackendAvailable() || !pb.authStore.isValid) {
    return null;
  }

  try {
    const response = await fetch(`${pb.baseURL}/api/license/generate`, {
      method: 'POST',
      headers: {
        'Authorization': pb.authStore.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: request.type,
        plan: request.plan,
        count: request.count,
        maxActivations: request.maxActivations || 1,
        expiresAt: request.expiresAt,
        notes: request.notes,
        metadata: request.metadata,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Failed to generate licenses:', error);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error generating licenses:', error);
    return null;
  }
}

/**
 * List licenses (admin only)
 */
export async function listLicenses(options?: {
  filter?: 'all' | 'active' | 'unused' | 'revoked';
  type?: string;
  limit?: number;
}): Promise<LicenseListItem[]> {
  if (!isBackendAvailable() || !pb.authStore.isValid) {
    return [];
  }

  try {
    const params = new URLSearchParams();
    if (options?.filter) params.set('filter', options.filter);
    if (options?.type) params.set('type', options.type);
    if (options?.limit) params.set('limit', options.limit.toString());

    const response = await fetch(
      `${pb.baseURL}/api/license/list?${params.toString()}`,
      {
        headers: {
          'Authorization': pb.authStore.token,
        },
      }
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.licenses || [];
  } catch (error) {
    console.error('Error listing licenses:', error);
    return [];
  }
}

/**
 * Revoke a license (admin only)
 */
export async function revokeLicense(
  licenseId: string,
  reason?: string
): Promise<boolean> {
  if (!isBackendAvailable() || !pb.authStore.isValid) {
    return false;
  }

  try {
    const response = await fetch(`${pb.baseURL}/api/license/revoke`, {
      method: 'POST',
      headers: {
        'Authorization': pb.authStore.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        licenseId,
        reason,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error revoking license:', error);
    return false;
  }
}
