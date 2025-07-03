// /components/Navigation.tsx

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useNavigation } from '@/context/NavigationContext';
import type { NavigationButton, NavigationProps } from '@/types';

/**
 * Navigation component for the main site navigation
 * Features dynamic navigation states with smooth animations
 * Uses the Engineering Guild design system for consistent styling
 * Optimized for mobile devices with proper touch targets
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
      {/* Single navigation bar that expands/contracts with mobile optimization */}
      <motion.div 
        layout
        className="flex flex-wrap justify-center items-center mt-6 sm:mt-8 gap-2 sm:gap-3 px-4 sm:px-0"
      >
        <AnimatePresence mode="popLayout">
          {visibleButtons.map(({ href, label }) => (
            <motion.div
              key={label}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ 
                duration: 0.3,
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
            >
              <Link href={href}>
                <button 
                  className="nav-link transition-smooth hover:shadow-md active:scale-95 
                             text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-2 
                             min-w-[64px] sm:min-w-[80px] min-h-[44px] sm:min-h-[40px]
                             touch-manipulation"
                  type="button"
                  aria-label={`Navigate to ${label.toLowerCase()} page`}
                >
                  {label}
                </button>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Toggle button with mobile-optimized touch target */}
        <motion.button
          layout
          className="inline-flex items-center justify-center 
                     w-12 h-12 sm:w-10 sm:h-10 
                     text-xl sm:text-lg font-medium border rounded-full 
                     transition-smooth hover:shadow-md active:scale-95 
                     focus:outline-none focus:ring-2 focus:ring-offset-2
                     min-h-[44px] min-w-[44px] touch-manipulation"
          style={{
            borderColor: 'rgb(var(--color-border))',
            color: 'rgb(var(--color-text-secondary))',
            backgroundColor: 'rgb(var(--color-surface))',
          }}
          onClick={() => setShowNavTopRight(!showNavTopRight)}
          type="button"
          aria-label={showNavTopRight ? "Close navigation menu" : "Open navigation menu"}
          whileHover={{ 
            borderColor: 'rgb(var(--color-primary))',
            color: 'rgb(var(--color-primary))',
            scale: 1.05
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            key={showNavTopRight ? 'close' : 'open'}
            initial={{ rotate: 0, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 180, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {showNavTopRight ? '×' : '+'}
          </motion.span>
        </motion.button>
      </motion.div>
    </div>
  );
}
