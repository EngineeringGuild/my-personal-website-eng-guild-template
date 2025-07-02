// /components/Navigation.tsx

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useNavigation } from '@/context/NavigationContext';
import type { NavigationButton, NavigationProps } from '@/types';

/**
 * Navigation component for the main site navigation
 * Features dynamic navigation states with smooth animations
 * 
 * States:
 * - Initial: HOME, ABOUT, + (centered)
 * - Expanded: HOME, ABOUT, BIOGRAPHY, PROJECTS, X (top right)
 * - On X: return to initial state
 * 
 * @param className - Optional additional CSS classes
 */
export default function Navigation({ className = '' }: NavigationProps = {}): JSX.Element {
  const { showNavTopRight, setShowNavTopRight } = useNavigation();

  // Initial navigation buttons configuration
  const initialNavButtons: readonly NavigationButton[] = [
    { href: '/', label: 'HOME' },
    { href: '/about', label: 'ABOUT' },
  ] as const;

  // Expanded navigation buttons configuration
  const expandedNavButtons: readonly NavigationButton[] = [
    { href: '/', label: 'HOME' },
    { href: '/about', label: 'ABOUT' },
    { href: '/biography', label: 'BIOGRAPHY' },
    { href: '/projects', label: 'PROJECTS' },
  ] as const;

  /**
   * Renders navigation group with optional close button
   * @param buttons - Array of navigation buttons to render
   * @param showClose - Whether to show the close (X) button
   */
  const renderNavigationGroup = (
    buttons: readonly NavigationButton[], 
    showClose: boolean
  ): JSX.Element => (
    <div className="flex flex-wrap items-center space-x-2">
      {buttons.map(({ href, label }) => (
        <Link key={label} href={href}>
          <button 
            className="w-24 py-1 text-xs leading-6 tracking-widest border border-gray-300 rounded-full dark:hover:border-pink-500 dark:border-white focus:outline-none hover:text-lightBlue-600 hover:border-lightBlue-600 dark:hover:text-pink-500 transition-colors duration-200"
            type="button"
            aria-label={`Navigate to ${label.toLowerCase()} page`}
          >
            {label}
          </button>
        </Link>
      ))}
      
      {/* Close button for expanded navigation */}
      {showClose && (
        <button
          className="w-8 py-1 text-xl leading-6 tracking-widest border border-gray-300 rounded-full dark:hover:border-pink-500 dark:border-white focus:outline-none hover:text-lightBlue-600 hover:border-lightBlue-600 dark:hover:text-pink-500 flex items-center justify-center ml-2 transition-colors duration-200"
          onClick={() => setShowNavTopRight(false)}
          type="button"
          aria-label="Close navigation menu"
        >
          ×
        </button>
      )}
    </div>
  );

  return (
    <div className={className}>
      {/* Top-centered floating navigation group (expanded state) */}
      {showNavTopRight && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
          {renderNavigationGroup(expandedNavButtons, true)}
        </div>
      )}
      
      {/* Centered navigation group with expand button (initial state) */}
      {!showNavTopRight && (
        <motion.div 
          layoutId="nav" 
          className="flex flex-wrap justify-center leading-6 items-center mt-8"
        >
          {renderNavigationGroup(initialNavButtons, false)}
          
          {/* Plus button to open expanded navigation */}
          <button
            className="w-8 py-1 text-xl leading-6 tracking-widest border border-gray-300 rounded-full dark:hover:border-pink-500 dark:border-white focus:outline-none hover:text-lightBlue-600 hover:border-lightBlue-600 dark:hover:text-pink-500 flex items-center justify-center ml-2 transition-colors duration-200"
            onClick={() => setShowNavTopRight(true)}
            type="button"
            aria-label="Open navigation menu"
          >
            +
          </button>
        </motion.div>
      )}
    </div>
  );
}
