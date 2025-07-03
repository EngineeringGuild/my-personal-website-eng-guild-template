import { supabase } from './supabase';
import type { User } from '@supabase/supabase-js';

// =============================================================================
// AUTHENTICATION UTILITIES
// =============================================================================

/**
 * Sign in with email and password
 * @param email - User email
 * @param password - User password
 * @returns Promise with user data or error
 */
export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      return { user: null, error: error.message };
    }

    return { user: data.user, error: null };
  } catch (error) {
    return { 
      user: null, 
      error: error instanceof Error ? error.message : 'Sign in failed' 
    };
  }
}

/**
 * Sign out current user
 * @returns Promise with success status
 */
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Sign out failed' 
    };
  }
}

/**
 * Get current user session
 * @returns Promise with current user or null
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

/**
 * Check if user is authenticated
 * @returns Promise<boolean> - True if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return user !== null;
}

/**
 * Subscribe to auth state changes
 * @param callback - Function to call when auth state changes
 * @returns Unsubscribe function
 */
export function onAuthStateChange(callback: (user: User | null) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user ?? null);
  }).data.subscription.unsubscribe;
} 