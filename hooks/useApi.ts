import { useState, useEffect, useCallback, useRef } from 'react';
import type { 
  ApiResponse, 
  DatabaseProfile, 
  DatabaseProject, 
  DatabaseBiographyContent, 
  BiographyStageKey 
} from '@/types';

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get the base URL for API requests
 * Handles both development and production environments
 */
const getBaseUrl = (): string => {
  if (typeof window === 'undefined') {
    // Server-side: use localhost for development
    return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  }
  
  // Client-side: use current origin
  return window.location.origin;
};

/**
 * Build full URL from relative path
 */
const buildUrl = (path: string): string => {
  if (path.startsWith('http')) {
    return path; // Already absolute URL
  }
  
  const baseUrl = getBaseUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};

/**
 * Sleep utility for retry logic
 */
const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Robust fetch with retry logic
 */
const robustFetch = async (url: string, options?: RequestInit, maxRetries = 3): Promise<Response> => {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
      
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      return response;
      
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown fetch error');
      
      console.warn(`Fetch attempt ${attempt}/${maxRetries} failed for ${url}:`, lastError.message);
      
      // Don't retry on certain errors
      if (lastError.message.includes('aborted') || lastError.message.includes('404')) {
        break;
      }
      
      // Wait before retry (exponential backoff)
      if (attempt < maxRetries) {
        await sleep(Math.pow(2, attempt) * 100); // 200ms, 400ms, 800ms
      }
    }
  }
  
  throw lastError!;
};

// =============================================================================
// GENERIC API HOOK
// =============================================================================

interface UseApiState<T> {
  readonly data: T | null;
  readonly loading: boolean;
  readonly error: string | null;
  readonly refetch: () => Promise<void>;
}

/**
 * Generic hook for API data fetching with robust error handling
 * @param url - API endpoint URL
 * @param options - Fetch options
 * @returns API state and refetch function
 */
export function useApi<T>(
  url: string, 
  options?: RequestInit
): UseApiState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef<boolean>(true);

  const fetchData = useCallback(async (): Promise<void> => {
    // Skip fetch on server-side to prevent hydration issues
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    // Skip if component is unmounted
    if (!mountedRef.current) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const fullUrl = buildUrl(url);
      console.log(`🔄 Fetching: ${fullUrl}`);
      
      const response = await robustFetch(fullUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...options?.headers,
        },
        cache: 'no-cache',
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON');
      }

      const result: ApiResponse<T> = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'API request failed');
      }

      // Only update state if component is still mounted
      if (mountedRef.current) {
        setData(result.data);
        console.log(`✅ Success: ${fullUrl}`, result.data);
      }
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error(`❌ API Error for ${url}:`, errorMessage);
      
      // Only update state if component is still mounted
      if (mountedRef.current) {
        setError(errorMessage);
        setData(null);
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [url, options]);

  useEffect(() => {
    mountedRef.current = true;
    
    // Only fetch on client-side after a short delay to ensure DOM is ready
    if (typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        if (mountedRef.current) {
          fetchData();
        }
      }, 100); // Small delay to ensure component is fully mounted
      
      return () => {
        clearTimeout(timer);
      };
    }
    
    return () => {
      mountedRef.current = false;
    };
  }, [fetchData]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

// =============================================================================
// SPECIFIC API HOOKS
// =============================================================================

/**
 * Hook for fetching user profile data
 * @returns Profile data with loading and error states
 */
export function useProfile(): UseApiState<DatabaseProfile> {
  return useApi<DatabaseProfile>('/api/profile');
}

/**
 * Hook for fetching projects data
 * @param featured - Filter for featured projects only
 * @returns Projects data with loading and error states
 */
export function useProjects(featured?: boolean): UseApiState<DatabaseProject[]> {
  const url = featured ? '/api/projects?featured=true' : '/api/projects';
  return useApi<DatabaseProject[]>(url);
}

/**
 * Hook for fetching biography content for a specific stage
 * @param stage - Biography stage to fetch
 * @returns Biography content with loading and error states
 */
export function useBiographyContent(stage: BiographyStageKey): UseApiState<DatabaseBiographyContent[]> {
  return useApi<DatabaseBiographyContent[]>(`/api/biography/${stage}`);
}

// =============================================================================
// MUTATION HOOKS
// =============================================================================

interface UseMutationState<T, TData = unknown> {
  readonly loading: boolean;
  readonly error: string | null;
  readonly mutate: (data: TData) => Promise<T | null>;
}

/**
 * Hook for API mutations (POST, PUT, DELETE)
 * @param url - API endpoint URL
 * @param method - HTTP method
 * @returns Mutation state and function
 */
export function useMutation<T, TData = unknown>(
  url: string,
  method: 'POST' | 'PUT' | 'DELETE' = 'POST'
): UseMutationState<T, TData> {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (data: TData): Promise<T | null> => {
    // Skip on server-side
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      setLoading(true);
      setError(null);

      const fullUrl = buildUrl(url);

      const response = await robustFetch(fullUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result: ApiResponse<T> = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Mutation failed');
      }

      return result.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error(`Mutation Error for ${url}:`, errorMessage);
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [url, method]);

  return {
    loading,
    error,
    mutate,
  };
} 