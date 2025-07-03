// /context/NavigationContext.tsx

import { createContext, useContext } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { NavigationContextType, NavigationProviderProps } from '@/types';

/**
 * NavigationContext provides global state for navigation menu position
 * Manages the visibility state of the top-right navigation menu
 * Uses localStorage to persist state across page navigation
 */
const NavigationContext = createContext<NavigationContextType | null>(null);

/**
 * NavigationProvider component that wraps the app to provide navigation state
 * Now uses localStorage to persist menu state across page navigation
 * @param children - React children components
 */
export function NavigationProvider({ children }: NavigationProviderProps): JSX.Element {
  // Use localStorage to persist navigation state across page changes
  // This ensures the menu stays expanded when navigating between pages
  const { value: showNavTopRight, setValue: setShowNavTopRight } = useLocalStorage<boolean>(
    'navigation-expanded', 
    false
  );

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
