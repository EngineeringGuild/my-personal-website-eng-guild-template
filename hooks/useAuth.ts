import { useState, useEffect } from 'react';
import { getCurrentUser, signIn, signOut } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

interface UseAuthReturn {
  readonly user: User | null;
  readonly loading: boolean;
  readonly signIn: (email: string, password: string) => Promise<{ user: User | null; error: string | null }>;
  readonly signOut: () => Promise<{ success: boolean; error: string | null }>;
  readonly isAuthenticated: boolean;
}

/**
 * Custom hook for authentication state management
 * Provides user state, loading state, and auth functions
 * @returns Authentication state and functions
 */
export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Get initial user state
    getCurrentUser().then((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    user,
    loading,
    signIn,
    signOut,
    isAuthenticated: user !== null,
  };
} 