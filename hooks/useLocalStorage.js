// /Users/user/Desktop/Core Guild Project/projects/colabs/eng-teams/core/personal-website/personal-website-eng-guild-template/hooks/useLocalStorage.js

import { useState, useEffect } from 'react'

/**
 * useLocalStorage hook for persistent state using localStorage.
 * @param {string} key - The key to store the value under in localStorage
 * @param {*} initialValue - The initial value to use if nothing is stored
 * @returns {[any, function]} - The stored value and a setter function
 */
export function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(initialValue)
  
  // Initialize from localStorage after component mounts (SSR-safe)
  useEffect(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Only parse if item is not null, undefined, or empty string
      if (item !== null && item !== undefined && item !== '') {
        try {
          setStoredValue(JSON.parse(item))
        } catch (parseError) {
          // If parsing fails, log and use initial value
          console.error('Failed to parse localStorage value for key:', key, parseError)
          setStoredValue(initialValue)
        }
      }
    } catch (error) {
      // If error, keep initial value
      console.error('Error accessing localStorage for key:', key, error)
    }
  }, [key])

  // Return a wrapped version of useState's setter function that persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      // Handle the error case
      console.error('Error setting localStorage for key:', key, error)
    }
  }

  return [storedValue, setValue]
}
