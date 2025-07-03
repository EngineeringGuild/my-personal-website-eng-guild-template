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

  // Helper function to safely parse localStorage values
  const parseStoredValue = useCallback((item: string): T => {
    // Handle empty strings
    if (item === '') {
      return initialValue;
    }

    // If the stored value looks like JSON (starts with { [ " or is a number/boolean)
    if (
      item.startsWith('{') || 
      item.startsWith('[') || 
      item.startsWith('"') ||
      item === 'true' || 
      item === 'false' || 
      item === 'null' ||
      !isNaN(Number(item))
    ) {
      try {
        return JSON.parse(item) as T;
      } catch (parseError) {
        console.warn(`Failed to parse JSON for key "${key}":`, parseError);
        // If it's a quoted string that failed to parse, try removing quotes
        if (item.startsWith('"') && item.endsWith('"')) {
          return item.slice(1, -1) as T;
        }
        return initialValue;
      }
    }

    // For simple strings that are not JSON-encoded, return as-is
    return item as T;
  }, [key, initialValue]);

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
      if (item !== null && item !== undefined) {
        const parsedValue = parseStoredValue(item);
        setStoredValue(parsedValue);
      }
    } catch (error) {
      // If error accessing localStorage, keep initial value
      console.error(`Error accessing localStorage for key "${key}":`, error);
    }
  }, [key, initialValue, parseStoredValue]);

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
      
      // Determine how to store the value
      let stringValue: string;
      
      if (typeof valueToStore === 'string') {
        // Store simple strings as-is (no JSON encoding for simple strings)
        stringValue = valueToStore;
      } else {
        // JSON encode objects, arrays, numbers, booleans, etc.
        stringValue = JSON.stringify(valueToStore);
      }
      
      // Save to localStorage
      window.localStorage.setItem(key, stringValue);
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
