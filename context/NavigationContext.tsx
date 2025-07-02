// /context/NavigationContext.tsx

import { createContext, useContext, useState } from 'react';
import type { NavigationContextType, NavigationProviderProps } from '@/types';

/**
 * NavigationContext provides global state for navigation menu position
 * Manages the visibility state of the top-right navigation menu
 */
const NavigationContext = createContext<NavigationContextType | null>(null);

/**
 * NavigationProvider component that wraps the app to provide navigation state
 * @param children - React children components
 */
export function NavigationProvider({ children }: NavigationProviderProps): JSX.Element {
  // State to manage top-right navigation visibility
  const [showNavTopRight, setShowNavTopRight] = useState<boolean>(false);

  // Context value with proper typing
  const contextValue: NavigationContextType = {
    showNavTopRight,
    setShowNavTopRight,
  };

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
}

/**
 * Custom hook for accessing navigation context
 * Provides type-safe access to navigation state and actions
 * @throws Error if used outside of NavigationProvider
 * @returns NavigationContextType - The navigation context value
 */
export function useNavigation(): NavigationContextType {
  const context = useContext(NavigationContext);
  
  if (context === null) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  
  return context;
}

// Export the context for potential direct usage (not recommended)
export { NavigationContext };
