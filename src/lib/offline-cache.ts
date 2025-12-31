/**
 * Offline Cache Service
 *
 * This module provides encrypted offline storage for questions using:
 * - IndexedDB for persistent storage
 * - Web Crypto API for AES-256-GCM encryption
 * - Automatic expiration of cached data
 */

import { pb } from './pocketbase';

// ============================================
// Types
// ============================================

export interface CachedQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
  image?: string;
  difficulty: number;
}

export interface OfflineToken {
  token: string;
  encryptionKey: string;
  expiresAt: number;
  maxQuestions: number;
  categories: string[];
}

interface CacheMetadata {
  version: number;
  encryptedAt: number;
  expiresAt: number;
  questionCount: number;
  categories: string[];
  userId: string;
}

interface EncryptedData {
  iv: string; // Base64 encoded IV
  data: string; // Base64 encoded ciphertext
  metadata: CacheMetadata;
}

// ============================================
// Constants
// ============================================

const DB_NAME = 'DriveOntarioOffline';
const DB_VERSION = 1;
const STORE_QUESTIONS = 'questions';
const STORE_METADATA = 'metadata';
const STORE_TOKEN = 'token';

const CACHE_VERSION = 1;
const DEFAULT_EXPIRY_DAYS = 7;

// ============================================
// IndexedDB Setup
// ============================================

let db: IDBDatabase | null = null;

async function openDatabase(): Promise<IDBDatabase> {
  if (db) return db;

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;

      // Create stores if they don't exist
      if (!database.objectStoreNames.contains(STORE_QUESTIONS)) {
        database.createObjectStore(STORE_QUESTIONS, { keyPath: 'id' });
      }
      if (!database.objectStoreNames.contains(STORE_METADATA)) {
        database.createObjectStore(STORE_METADATA, { keyPath: 'id' });
      }
      if (!database.objectStoreNames.contains(STORE_TOKEN)) {
        database.createObjectStore(STORE_TOKEN, { keyPath: 'id' });
      }
    };
  });
}

// ============================================
// Web Crypto API Encryption
// ============================================

/**
 * Derive an AES-256 key from the server-provided encryption key
 */
async function deriveKey(keyString: string): Promise<CryptoKey> {
  // Decode base64 key
  const keyBytes = Uint8Array.from(atob(keyString), c => c.charCodeAt(0));

  // Import as raw key material
  return crypto.subtle.importKey(
    'raw',
    keyBytes,
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Encrypt data using AES-256-GCM
 */
async function encryptData(data: unknown, keyString: string): Promise<{ iv: string; ciphertext: string }> {
  const key = await deriveKey(keyString);

  // Generate random IV
  const iv = crypto.getRandomValues(new Uint8Array(12));

  // Encrypt
  const encoded = new TextEncoder().encode(JSON.stringify(data));
  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoded
  );

  return {
    iv: btoa(String.fromCharCode(...iv)),
    ciphertext: btoa(String.fromCharCode(...new Uint8Array(ciphertext))),
  };
}

/**
 * Decrypt data using AES-256-GCM
 */
async function decryptData<T>(iv: string, ciphertext: string, keyString: string): Promise<T> {
  const key = await deriveKey(keyString);

  // Decode base64
  const ivBytes = Uint8Array.from(atob(iv), c => c.charCodeAt(0));
  const ciphertextBytes = Uint8Array.from(atob(ciphertext), c => c.charCodeAt(0));

  // Decrypt
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: ivBytes },
    key,
    ciphertextBytes
  );

  const decoded = new TextDecoder().decode(decrypted);
  return JSON.parse(decoded);
}

// ============================================
// Offline Token Management
// ============================================

/**
 * Request an offline token from the server
 */
export async function requestOfflineToken(validDays: number = DEFAULT_EXPIRY_DAYS): Promise<OfflineToken | null> {
  if (!pb.authStore.isValid) {
    return null;
  }

  try {
    const response = await fetch(`${pb.baseURL}/api/offline/token`, {
      method: 'POST',
      headers: {
        'Authorization': pb.authStore.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        validDays,
        deviceFingerprint: getDeviceFingerprint(),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get offline token');
    }

    const data = await response.json();

    // Store token in IndexedDB
    const database = await openDatabase();
    const tx = database.transaction(STORE_TOKEN, 'readwrite');
    const store = tx.objectStore(STORE_TOKEN);

    await new Promise<void>((resolve, reject) => {
      const request = store.put({
        id: 'current',
        ...data,
        storedAt: Date.now(),
      });
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });

    return data;
  } catch (error) {
    console.error('Error requesting offline token:', error);
    return null;
  }
}

/**
 * Get stored offline token
 */
export async function getOfflineToken(): Promise<OfflineToken | null> {
  try {
    const database = await openDatabase();
    const tx = database.transaction(STORE_TOKEN, 'readonly');
    const store = tx.objectStore(STORE_TOKEN);

    return new Promise((resolve, reject) => {
      const request = store.get('current');
      request.onsuccess = () => {
        const result = request.result;
        if (result && result.expiresAt * 1000 > Date.now()) {
          resolve(result);
        } else {
          resolve(null);
        }
      };
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Error getting offline token:', error);
    return null;
  }
}

/**
 * Clear offline token
 */
export async function clearOfflineToken(): Promise<void> {
  try {
    const database = await openDatabase();
    const tx = database.transaction(STORE_TOKEN, 'readwrite');
    const store = tx.objectStore(STORE_TOKEN);

    await new Promise<void>((resolve, reject) => {
      const request = store.delete('current');
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Error clearing offline token:', error);
  }
}

// ============================================
// Question Caching
// ============================================

/**
 * Cache questions for offline use
 */
export async function cacheQuestionsForOffline(
  categories?: string[]
): Promise<{ success: boolean; count: number; expiresAt: number }> {
  if (!pb.authStore.isValid) {
    return { success: false, count: 0, expiresAt: 0 };
  }

  try {
    // Request questions from server
    const response = await fetch(`${pb.baseURL}/api/offline/questions`, {
      method: 'POST',
      headers: {
        'Authorization': pb.authStore.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        categories,
        deviceFingerprint: getDeviceFingerprint(),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch questions for offline');
    }

    const data = await response.json();
    const { questions, encryptionKey, expiresAt } = data;

    // Encrypt and store questions
    const encrypted = await encryptData(questions, encryptionKey);

    const metadata: CacheMetadata = {
      version: CACHE_VERSION,
      encryptedAt: Date.now(),
      expiresAt: expiresAt * 1000,
      questionCount: questions.length,
      categories: categories || [],
      userId: pb.authStore.record?.id || '',
    };

    const database = await openDatabase();

    // Store encrypted questions
    const tx1 = database.transaction(STORE_QUESTIONS, 'readwrite');
    const questionsStore = tx1.objectStore(STORE_QUESTIONS);

    await new Promise<void>((resolve, reject) => {
      const request = questionsStore.put({
        id: 'encrypted_questions',
        iv: encrypted.iv,
        data: encrypted.ciphertext,
        metadata,
      });
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });

    // Store metadata separately for quick access
    const tx2 = database.transaction(STORE_METADATA, 'readwrite');
    const metadataStore = tx2.objectStore(STORE_METADATA);

    await new Promise<void>((resolve, reject) => {
      const request = metadataStore.put({ id: 'cache_metadata', ...metadata });
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });

    return {
      success: true,
      count: questions.length,
      expiresAt: expiresAt * 1000,
    };
  } catch (error) {
    console.error('Error caching questions:', error);
    return { success: false, count: 0, expiresAt: 0 };
  }
}

/**
 * Get cached questions for offline use
 */
export async function getCachedQuestions(): Promise<CachedQuestion[] | null> {
  try {
    // Check if we have a valid token
    const token = await getOfflineToken();
    if (!token) {
      console.log('No valid offline token');
      return null;
    }

    // Get encrypted questions
    const database = await openDatabase();
    const tx = database.transaction(STORE_QUESTIONS, 'readonly');
    const store = tx.objectStore(STORE_QUESTIONS);

    const encryptedData: EncryptedData | undefined = await new Promise((resolve, reject) => {
      const request = store.get('encrypted_questions');
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    if (!encryptedData) {
      console.log('No cached questions found');
      return null;
    }

    // Check expiration
    if (encryptedData.metadata.expiresAt < Date.now()) {
      console.log('Cached questions expired');
      await clearCachedQuestions();
      return null;
    }

    // Decrypt questions
    const questions = await decryptData<CachedQuestion[]>(
      encryptedData.iv,
      encryptedData.data,
      token.encryptionKey
    );

    return questions;
  } catch (error) {
    console.error('Error getting cached questions:', error);
    return null;
  }
}

/**
 * Get cache metadata without decrypting questions
 */
export async function getCacheMetadata(): Promise<CacheMetadata | null> {
  try {
    const database = await openDatabase();
    const tx = database.transaction(STORE_METADATA, 'readonly');
    const store = tx.objectStore(STORE_METADATA);

    return new Promise((resolve, reject) => {
      const request = store.get('cache_metadata');
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Error getting cache metadata:', error);
    return null;
  }
}

/**
 * Clear cached questions
 */
export async function clearCachedQuestions(): Promise<void> {
  try {
    const database = await openDatabase();

    // Clear questions
    const tx1 = database.transaction(STORE_QUESTIONS, 'readwrite');
    const questionsStore = tx1.objectStore(STORE_QUESTIONS);
    await new Promise<void>((resolve, reject) => {
      const request = questionsStore.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });

    // Clear metadata
    const tx2 = database.transaction(STORE_METADATA, 'readwrite');
    const metadataStore = tx2.objectStore(STORE_METADATA);
    await new Promise<void>((resolve, reject) => {
      const request = metadataStore.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Error clearing cached questions:', error);
  }
}

/**
 * Clear all offline data (token + questions)
 */
export async function clearAllOfflineData(): Promise<void> {
  await clearOfflineToken();
  await clearCachedQuestions();
}

// ============================================
// Offline Status
// ============================================

/**
 * Check if we have valid offline data
 */
export async function hasValidOfflineData(): Promise<boolean> {
  const token = await getOfflineToken();
  if (!token) return false;

  const metadata = await getCacheMetadata();
  if (!metadata) return false;

  return metadata.expiresAt > Date.now();
}

/**
 * Get offline status information
 */
export async function getOfflineStatus(): Promise<{
  hasToken: boolean;
  hasQuestions: boolean;
  questionCount: number;
  categories: string[];
  expiresAt: number | null;
  isExpired: boolean;
}> {
  const token = await getOfflineToken();
  const metadata = await getCacheMetadata();

  const now = Date.now();

  return {
    hasToken: token !== null,
    hasQuestions: metadata !== null,
    questionCount: metadata?.questionCount || 0,
    categories: metadata?.categories || [],
    expiresAt: metadata?.expiresAt || null,
    isExpired: metadata ? metadata.expiresAt < now : true,
  };
}

// ============================================
// Helpers
// ============================================

/**
 * Generate a device fingerprint for key derivation
 */
function getDeviceFingerprint(): string {
  const components = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
    navigator.hardwareConcurrency || 0,
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

/**
 * Check if the browser is online
 */
export function isOnline(): boolean {
  return navigator.onLine;
}

/**
 * Listen for online/offline events
 */
export function onConnectivityChange(callback: (online: boolean) => void): () => void {
  const handleOnline = () => callback(true);
  const handleOffline = () => callback(false);

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}

// ============================================
// Auto-sync for Premium Users
// ============================================

/**
 * Initialize offline caching for premium users
 * Call this on app load for premium users
 */
export async function initializeOfflineCache(): Promise<void> {
  if (!pb.authStore.isValid) return;

  const user = pb.authStore.record;
  if (!user?.isPremium) return;

  // Check if we have valid cached data
  const status = await getOfflineStatus();

  // If no valid data or about to expire (less than 1 day), refresh
  const oneDayMs = 24 * 60 * 60 * 1000;
  const needsRefresh = !status.hasQuestions ||
    status.isExpired ||
    (status.expiresAt && status.expiresAt - Date.now() < oneDayMs);

  if (needsRefresh && isOnline()) {
    try {
      // Get new token
      await requestOfflineToken();
      // Cache questions
      await cacheQuestionsForOffline();
      console.log('Offline cache refreshed');
    } catch (error) {
      console.error('Failed to refresh offline cache:', error);
    }
  }
}
