// /components/Navigation.tsx

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useNavigation } from '@/context/NavigationContext';
import type { NavigationButton, NavigationProps } from '@/types';

/**
 * Navigation component for the main site navigation
 * Features dynamic navigation states with smooth animations
 * 
 * States:
 * - Initial: HOME, ABOUT, + (shows 2 options)
 * - Expanded: HOME, ABOUT, BIOGRAPHY, PROJECTS, X (shows all 4 options)
 * - Navigation bar remains in the same position, only content changes
 * 
 * @param className - Optional additional CSS classes
 */
export default function Navigation({ className = '' }: NavigationProps = {}): JSX.Element {
  const { showNavTopRight, setShowNavTopRight } = useNavigation();

  // All navigation buttons configuration
  const allNavButtons: readonly NavigationButton[] = [
    { href: '/', label: 'HOME' },
    { href: '/about', label: 'ABOUT' },
    { href: '/biography', label: 'BIOGRAPHY' },
    { href: '/projects', label: 'PROJECTS' },
  ] as const;

  // Determine which buttons to show based on state
  const visibleButtons = showNavTopRight 
    ? allNavButtons 
    : allNavButtons.slice(0, 2);

  return (
    <div className={className}>
      {/* Single navigation bar that expands/contracts */}
      <motion.div 
        layout
        className="flex flex-wrap justify-center leading-6 items-center mt-8"
      >
        <AnimatePresence mode="popLayout">
          {visibleButtons.map(({ href, label }) => (
            <motion.div
              key={label}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Link href={href}>
                <button 
                  className="w-24 py-1 text-xs leading-6 tracking-widest border border-gray-300 rounded-full dark:hover:border-pink-500 dark:border-white focus:outline-none hover:text-lightBlue-600 hover:border-lightBlue-600 dark:hover:text-pink-500 transition-colors duration-200 mx-1"
                  type="button"
                  aria-label={`Navigate to ${label.toLowerCase()} page`}
                >
                  {label}
                </button>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Toggle button (+ or ×) */}
        <motion.button
          layout
          className="w-8 py-1 text-xl leading-6 tracking-widest border border-gray-300 rounded-full dark:hover:border-pink-500 dark:border-white focus:outline-none hover:text-lightBlue-600 hover:border-lightBlue-600 dark:hover:text-pink-500 flex items-center justify-center ml-2 transition-colors duration-200"
          onClick={() => setShowNavTopRight(!showNavTopRight)}
          type="button"
          aria-label={showNavTopRight ? "Close navigation menu" : "Open navigation menu"}
        >
          {showNavTopRight ? '×' : '+'}
        </motion.button>
      </motion.div>
    </div>
  );
}
