// /components/Navigation.tsx

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useNavigation } from '@/context/NavigationContext';
import type { NavigationButton, NavigationProps } from '@/types';

/**
 * Navigation component for the main site navigation
 * Features dynamic navigation states with smooth animations
 * Uses the new design system for consistent styling
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
        className="flex flex-wrap justify-center items-center mt-8 gap-2"
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
                  className="nav-link transition-smooth hover:shadow-md active:scale-95"
                  type="button"
                  aria-label={`Navigate to ${label.toLowerCase()} page`}
                >
                  {label}
                </button>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Toggle button (+ or ×) with enhanced styling */}
        <motion.button
          layout
          className="inline-flex items-center justify-center w-10 h-10 text-lg font-medium border rounded-full transition-smooth hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2"
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
