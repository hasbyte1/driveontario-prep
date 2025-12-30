/**
 * Questions API Client
 *
 * This module provides functions to interact with the questions API.
 * It falls back to local questions when the backend is not available.
 */

import { pb } from './pocketbase';
import { questions as localQuestions, CATEGORIES } from '@/data/questions';

export interface Question {
  id: string;
  question: string;
  options: string[];
  category: string;
  imageUrl?: string;
  isPremium: boolean;
  difficulty: number;
}

export interface QuestionWithAnswer extends Question {
  correctAnswer: number;
  explanation: string;
}

export interface CategoryCount {
  category: string;
  count: number;
  premium: number;
}

export interface ValidateResponse {
  correct: boolean;
  correctAnswer: number;
  explanation: string;
  xpEarned: number;
  flagged?: boolean;
}

export interface TestStartResponse {
  sessionId: string;
  questions: Question[];
  count: number;
  timeLimit: number;
}

export interface TestAnswerResponse {
  correct: boolean;
  correctAnswer: number;
  explanation: string;
  xpEarned: number;
  flagged?: boolean;
}

export interface CategoryScore {
  correct: number;
  total: number;
}

export interface TestCompleteResponse {
  score: number;
  totalQuestions: number;
  passed: boolean;
  timeSpent: number;
  xpEarned: number;
  categoryBreakdown: Record<string, CategoryScore>;
  flagged?: boolean;
  flagReason?: string;
}

// Check if backend is configured and available
const isBackendAvailable = (): boolean => {
  return !!pb.baseURL && !pb.baseURL.includes('localhost:8090');
};

/**
 * Get category counts
 */
export async function getCategories(): Promise<{ categories: CategoryCount[]; total: number }> {
  if (!isBackendAvailable()) {
    // Use local questions
    const categoryCounts: Record<string, CategoryCount> = {};
    for (const q of localQuestions) {
      if (!categoryCounts[q.category]) {
        categoryCounts[q.category] = { category: q.category, count: 0, premium: 0 };
      }
      categoryCounts[q.category].count++;
    }
    return {
      categories: Object.values(categoryCounts),
      total: localQuestions.length,
    };
  }

  try {
    const response = await fetch(`${pb.baseURL}/api/questions/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Fallback to local
    return getCategories();
  }
}

/**
 * Get practice questions
 */
export async function getPracticeQuestions(options?: {
  category?: string;
  limit?: number;
}): Promise<Question[]> {
  const { category, limit = 20 } = options || {};

  if (!isBackendAvailable() || !pb.authStore.isValid) {
    // Use local questions
    let pool = [...localQuestions];
    if (category) {
      pool = pool.filter(q => q.category === category);
    }
    // Shuffle
    pool.sort(() => Math.random() - 0.5);
    // Limit
    pool = pool.slice(0, limit);
    // Convert to API format (without answer)
    return pool.map(q => ({
      id: q.id,
      question: q.question,
      options: q.options,
      category: q.category,
      imageUrl: q.imageUrl,
      isPremium: false,
      difficulty: 1,
    }));
  }

  try {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (limit) params.set('limit', limit.toString());

    const response = await fetch(`${pb.baseURL}/api/questions/practice?${params}`, {
      headers: {
        'Authorization': pb.authStore.token,
      },
    });

    if (!response.ok) throw new Error('Failed to fetch practice questions');
    const data = await response.json();
    return data.questions;
  } catch (error) {
    console.error('Error fetching practice questions:', error);
    // Fallback to local
    return getPracticeQuestions(options);
  }
}

/**
 * Get test questions (40 questions like real G1 test)
 */
export async function getTestQuestions(): Promise<{ questions: Question[]; sessionId?: string }> {
  if (!isBackendAvailable() || !pb.authStore.isValid) {
    // Use local questions
    const pool = [...localQuestions];
    // Shuffle
    pool.sort(() => Math.random() - 0.5);
    // Take 40 (or all if less)
    const testQuestions = pool.slice(0, Math.min(40, pool.length));
    return {
      questions: testQuestions.map(q => ({
        id: q.id,
        question: q.question,
        options: q.options,
        category: q.category,
        imageUrl: q.imageUrl,
        isPremium: false,
        difficulty: 1,
      })),
    };
  }

  try {
    const response = await fetch(`${pb.baseURL}/api/questions/test`, {
      headers: {
        'Authorization': pb.authStore.token,
      },
    });

    if (!response.ok) throw new Error('Failed to fetch test questions');
    const data = await response.json();
    return {
      questions: data.questions,
      sessionId: data.sessionId,
    };
  } catch (error) {
    console.error('Error fetching test questions:', error);
    // Fallback to local
    return getTestQuestions();
  }
}

/**
 * Validate an answer (server-side validation)
 */
export async function validateAnswer(
  questionId: string,
  selectedAnswer: number,
  timeSpent: number
): Promise<ValidateResponse> {
  // For local questions, validate client-side
  if (!isBackendAvailable() || !pb.authStore.isValid) {
    const question = localQuestions.find(q => q.id === questionId);
    if (!question) {
      return {
        correct: false,
        correctAnswer: 0,
        explanation: 'Question not found',
        xpEarned: 0,
      };
    }
    const correct = selectedAnswer === question.correctAnswer;
    return {
      correct,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      xpEarned: correct && timeSpent >= 2000 ? 10 : 0,
    };
  }

  try {
    const response = await fetch(`${pb.baseURL}/api/questions/validate`, {
      method: 'POST',
      headers: {
        'Authorization': pb.authStore.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        questionId,
        selectedAnswer,
        timeSpent,
      }),
    });

    if (!response.ok) throw new Error('Failed to validate answer');
    return await response.json();
  } catch (error) {
    console.error('Error validating answer:', error);
    // Fallback to local validation
    return validateAnswer(questionId, selectedAnswer, timeSpent);
  }
}

/**
 * Get a single question by ID (for review)
 */
export async function getQuestion(questionId: string): Promise<Question | null> {
  if (!isBackendAvailable() || !pb.authStore.isValid) {
    const question = localQuestions.find(q => q.id === questionId);
    if (!question) return null;
    return {
      id: question.id,
      question: question.question,
      options: question.options,
      category: question.category,
      imageUrl: question.imageUrl,
      isPremium: false,
      difficulty: 1,
    };
  }

  try {
    const response = await fetch(`${pb.baseURL}/api/questions/${questionId}`, {
      headers: {
        'Authorization': pb.authStore.token,
      },
    });

    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('Error fetching question:', error);
    return getQuestion(questionId);
  }
}

/**
 * Get the full question with answer (for local fallback only)
 * This should only be used when backend is not available
 */
export function getLocalQuestionWithAnswer(questionId: string): QuestionWithAnswer | null {
  const question = localQuestions.find(q => q.id === questionId);
  if (!question) return null;
  return {
    id: question.id,
    question: question.question,
    options: question.options,
    category: question.category,
    imageUrl: question.imageUrl,
    isPremium: false,
    difficulty: 1,
    correctAnswer: question.correctAnswer,
    explanation: question.explanation,
  };
}

// ============================================
// Test Session API (Server-Authoritative)
// ============================================

/**
 * Start a new test session
 */
export async function startTestSession(category?: string): Promise<TestStartResponse | null> {
  if (!isBackendAvailable() || !pb.authStore.isValid) {
    // Fallback to old method for offline/local mode
    const result = await getTestQuestions();
    return {
      sessionId: `local-${Date.now()}`,
      questions: result.questions,
      count: result.questions.length,
      timeLimit: 60 * 60 * 1000, // 60 minutes
    };
  }

  try {
    const response = await fetch(`${pb.baseURL}/api/test/start`, {
      method: 'POST',
      headers: {
        'Authorization': pb.authStore.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ category }),
    });

    if (!response.ok) throw new Error('Failed to start test session');
    return await response.json();
  } catch (error) {
    console.error('Error starting test session:', error);
    return null;
  }
}

/**
 * Submit an answer during a test session
 */
export async function submitTestAnswer(
  sessionId: string,
  questionId: string,
  questionIndex: number,
  selectedAnswer: number,
  timeSpent: number
): Promise<TestAnswerResponse> {
  // For local sessions, use local validation
  if (sessionId.startsWith('local-') || !isBackendAvailable() || !pb.authStore.isValid) {
    return validateAnswer(questionId, selectedAnswer, timeSpent);
  }

  try {
    const response = await fetch(`${pb.baseURL}/api/test/answer`, {
      method: 'POST',
      headers: {
        'Authorization': pb.authStore.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId,
        questionId,
        questionIndex,
        selectedAnswer,
        timeSpent,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to submit answer');
    }
    return await response.json();
  } catch (error) {
    console.error('Error submitting answer:', error);
    // Fallback to local validation
    return validateAnswer(questionId, selectedAnswer, timeSpent);
  }
}

/**
 * Complete a test session and get results
 */
export async function completeTestSession(sessionId: string): Promise<TestCompleteResponse | null> {
  // For local sessions, return null (handled by frontend)
  if (sessionId.startsWith('local-') || !isBackendAvailable() || !pb.authStore.isValid) {
    return null;
  }

  try {
    const response = await fetch(`${pb.baseURL}/api/test/complete`, {
      method: 'POST',
      headers: {
        'Authorization': pb.authStore.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to complete test');
    }
    return await response.json();
  } catch (error) {
    console.error('Error completing test:', error);
    return null;
  }
}

/**
 * Get test results by session ID
 */
export async function getTestResults(sessionId: string): Promise<TestCompleteResponse | null> {
  if (sessionId.startsWith('local-') || !isBackendAvailable() || !pb.authStore.isValid) {
    return null;
  }

  try {
    const response = await fetch(`${pb.baseURL}/api/test/results/${sessionId}`, {
      headers: {
        'Authorization': pb.authStore.token,
      },
    });

    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('Error fetching test results:', error);
    return null;
  }
}

// Re-export categories for convenience
export { CATEGORIES };
