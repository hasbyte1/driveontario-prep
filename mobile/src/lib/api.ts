import {API_URL} from './config';
import {SecureStorageHelper, STORAGE_KEYS} from './storage';
import type {
  User,
  Question,
  TestResult,
  Progress,
  LeaderboardEntry,
  ApiResponse,
  PaginatedResponse,
  LoginCredentials,
  RegisterCredentials,
} from '../types';

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_URL;
  }

  private async getAuthToken(): Promise<string | null> {
    return SecureStorageHelper.getSecure(STORAGE_KEYS.AUTH_TOKEN);
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    const token = await this.getAuthToken();

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || data.error || 'Request failed',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  // Auth endpoints
  async login(
    credentials: LoginCredentials,
  ): Promise<ApiResponse<{token: string; record: User}>> {
    return this.request('/api/collections/users/auth-with-password', {
      method: 'POST',
      body: JSON.stringify({
        identity: credentials.email,
        password: credentials.password,
      }),
    });
  }

  async register(
    credentials: RegisterCredentials,
  ): Promise<ApiResponse<User>> {
    return this.request('/api/collections/users/records', {
      method: 'POST',
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        passwordConfirm: credentials.password,
        name: credentials.name,
      }),
    });
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.request('/api/collections/users/auth-refresh', {
      method: 'POST',
    });
  }

  async updateProfile(
    userId: string,
    data: Partial<User>,
  ): Promise<ApiResponse<User>> {
    return this.request(`/api/collections/users/records/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // Question endpoints
  async getQuestions(options?: {
    category?: string;
    limit?: number;
    isPractice?: boolean;
  }): Promise<ApiResponse<Question[]>> {
    const params = new URLSearchParams();
    if (options?.category) {
      params.append('category', options.category);
    }
    if (options?.limit) {
      params.append('limit', options.limit.toString());
    }

    const endpoint = options?.isPractice
      ? '/api/questions/practice'
      : '/api/questions/test';

    return this.request(`${endpoint}?${params.toString()}`);
  }

  async validateAnswer(
    questionId: string,
    selectedAnswer: number,
    timeSpent: number,
  ): Promise<
    ApiResponse<{
      correct: boolean;
      correctAnswer: number;
      explanation: string;
      xpEarned: number;
    }>
  > {
    return this.request('/api/questions/validate', {
      method: 'POST',
      body: JSON.stringify({
        questionId,
        selectedAnswer,
        timeSpent,
      }),
    });
  }

  // Test endpoints
  async startTest(): Promise<
    ApiResponse<{sessionId: string; questions: Question[]}>
  > {
    return this.request('/api/test/start', {
      method: 'POST',
    });
  }

  async submitTestAnswer(
    sessionId: string,
    questionId: string,
    selectedAnswer: number,
    timeSpent: number,
  ): Promise<
    ApiResponse<{correct: boolean; correctAnswer: number; xpEarned: number}>
  > {
    return this.request('/api/test/answer', {
      method: 'POST',
      body: JSON.stringify({
        sessionId,
        questionId,
        selectedAnswer,
        timeSpent,
      }),
    });
  }

  async completeTest(sessionId: string): Promise<ApiResponse<TestResult>> {
    return this.request('/api/test/complete', {
      method: 'POST',
      body: JSON.stringify({sessionId}),
    });
  }

  async getTestResults(
    page = 1,
    perPage = 10,
  ): Promise<ApiResponse<PaginatedResponse<TestResult>>> {
    return this.request(
      `/api/test/results?page=${page}&perPage=${perPage}`,
    );
  }

  async getTestResult(resultId: string): Promise<ApiResponse<TestResult>> {
    return this.request(`/api/test/results/${resultId}`);
  }

  // Progress endpoints
  async getProgress(): Promise<ApiResponse<Progress>> {
    return this.request('/api/progress');
  }

  async syncProgress(
    progress: Partial<Progress>,
  ): Promise<ApiResponse<Progress>> {
    return this.request('/api/progress/sync', {
      method: 'POST',
      body: JSON.stringify(progress),
    });
  }

  // Leaderboard endpoints
  async getLeaderboard(
    period: 'daily' | 'weekly' | 'allTime' = 'weekly',
    page = 1,
    perPage = 50,
  ): Promise<ApiResponse<PaginatedResponse<LeaderboardEntry>>> {
    return this.request(
      `/api/leaderboard?period=${period}&page=${page}&perPage=${perPage}`,
    );
  }

  async getUserRank(): Promise<
    ApiResponse<{rank: number; xp: number; percentile: number}>
  > {
    return this.request('/api/leaderboard/rank');
  }

  // Premium/License endpoints
  async redeemLicenseKey(
    key: string,
    deviceFingerprint?: string,
  ): Promise<
    ApiResponse<{
      success: boolean;
      plan: string;
      expiresAt?: string;
    }>
  > {
    return this.request('/api/license/redeem', {
      method: 'POST',
      body: JSON.stringify({key, deviceFingerprint}),
    });
  }

  async validateLicense(): Promise<
    ApiResponse<{
      valid: boolean;
      plan?: string;
      expiresAt?: string;
    }>
  > {
    return this.request('/api/license/validate');
  }

  // Offline endpoints
  async getOfflineToken(
    validDays?: number,
    deviceFingerprint?: string,
  ): Promise<
    ApiResponse<{
      token: string;
      encryptionKey: string;
      expiresAt: number;
      maxQuestions: number;
      categories: string[];
    }>
  > {
    return this.request('/api/offline/token', {
      method: 'POST',
      body: JSON.stringify({validDays, deviceFingerprint}),
    });
  }

  async getOfflineQuestions(
    categories?: string[],
    limit?: number,
    deviceFingerprint?: string,
  ): Promise<
    ApiResponse<{
      questions: Question[];
      count: number;
      encryptionKey: string;
      expiresAt: number;
    }>
  > {
    return this.request('/api/offline/questions', {
      method: 'POST',
      body: JSON.stringify({categories, limit, deviceFingerprint}),
    });
  }
}

export const api = new ApiClient();
