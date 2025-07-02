// /hooks/useLocalStorage.ts

import { useState, useEffect, useCallback } from 'react';
import type { UseLocalStorageReturn, LocalStorageValue } from '@/types';

/**
 * Custom hook for persistent state management using localStorage
 * Provides type-safe localStorage operations with SSR compatibility
 * 
 * @template T - The type of the value to store
 * @param key - The localStorage key to store the value under
 * @param initialValue - The initial value to use if nothing is stored
 * @returns Object containing the stored value, setter function, and remove function
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): UseLocalStorageReturn<T> {
  // State to store our value with proper typing
  const [storedValue, setStoredValue] = useState<LocalStorageValue<T>>(initialValue);

  // Initialize from localStorage after component mounts (SSR-safe)
  useEffect(() => {
    try {
      // Check if we're in the browser environment
      if (typeof window === 'undefined') {
        return;
      }

      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      
      // Only parse if item exists and is not null
      if (item !== null && item !== undefined && item !== '') {
        try {
          const parsedValue = JSON.parse(item) as T;
          setStoredValue(parsedValue);
        } catch (parseError) {
          // If parsing fails, log error and use initial value
          console.error(`Failed to parse localStorage value for key "${key}":`, parseError);
          setStoredValue(initialValue);
        }
      }
    } catch (error) {
      // If error accessing localStorage, keep initial value
      console.error(`Error accessing localStorage for key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Memoized setter function that persists the new value to localStorage
  const setValue = useCallback((value: T | ((prev: LocalStorageValue<T>) => T)): void => {
    try {
      // Check if we're in the browser environment
      if (typeof window === 'undefined') {
        return;
      }

      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save to state
      setStoredValue(valueToStore);
      
      // Save to localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // Handle localStorage errors (quota exceeded, etc.)
      console.error(`Error setting localStorage for key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Memoized remove function to clear the value from localStorage
  const removeValue = useCallback((): void => {
    try {
      // Check if we're in the browser environment
      if (typeof window === 'undefined') {
        return;
      }

      // Remove from localStorage
      window.localStorage.removeItem(key);
      
      // Reset to initial value
      setStoredValue(initialValue);
    } catch (error) {
      // Handle localStorage errors
      console.error(`Error removing localStorage value for key "${key}":`, error);
    }
  }, [key, initialValue]);

  return {
    value: storedValue,
    setValue,
    removeValue,
  };
}
