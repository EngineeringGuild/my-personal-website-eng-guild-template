// /types/index.ts
/**
 * Global TypeScript definitions for Personal Website
 * Following market best practices for type safety and maintainability
 */

import { ReactNode } from 'react';

// =============================================================================
// NAVIGATION TYPES
// =============================================================================

export interface NavigationButton {
  readonly href: string;
  readonly label: string;
}

export interface NavigationContextType {
  readonly showNavTopRight: boolean;
  readonly setShowNavTopRight: (show: boolean) => void;
}

export interface NavigationProviderProps {
  readonly children: ReactNode;
}

// =============================================================================
// COMPONENT PROPS TYPES
// =============================================================================

export interface LayoutProps {
  readonly children: ReactNode;
  readonly title?: string;
  readonly description?: string;
}

export interface MetaTagsProps {
  readonly title?: string;
  readonly description?: string;
  readonly url?: string;
  readonly image?: string;
  readonly type?: 'website' | 'article' | 'profile';
}

export interface DarkModeToggleProps {
  readonly isDark: boolean;
  readonly onClick: () => void;
  readonly className?: string;
}

export interface NavigationProps {
  readonly className?: string;
}

export interface SocialIconsProps {
  readonly className?: string;
}

// =============================================================================
// PAGE PROPS TYPES
// =============================================================================

export interface PageProps {
  readonly [key: string]: unknown;
}

// =============================================================================
// HOOK TYPES
// =============================================================================

export type LocalStorageValue<T> = T | null;

export interface UseLocalStorageReturn<T> {
  readonly value: LocalStorageValue<T>;
  readonly setValue: (value: T | ((prev: LocalStorageValue<T>) => T)) => void;
  readonly removeValue: () => void;
}

// =============================================================================
// THEME TYPES
// =============================================================================

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  readonly theme: ThemeMode;
  readonly setTheme: (theme: ThemeMode) => void;
  readonly isDark: boolean;
}
