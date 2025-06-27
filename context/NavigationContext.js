// personal-website-eng-guild-template/context/NavigationContext.js

import { createContext, useContext, useState } from 'react'

/**
 * NavigationContext provides global state for navigation menu position.
 * Use NavigationProvider to wrap your app and useNavigation to access state.
 */
export const NavigationContext = createContext({
  showNavTopRight: false,
  setShowNavTopRight: () => {},
})

export function NavigationProvider({ children }) {
  const [showNavTopRight, setShowNavTopRight] = useState(false)
  return (
    <NavigationContext.Provider value={{ showNavTopRight, setShowNavTopRight }}>
      {children}
    </NavigationContext.Provider>
  )
}

// Custom hook for easy access to navigation context
export function useNavigation() {
  return useContext(NavigationContext)
} 