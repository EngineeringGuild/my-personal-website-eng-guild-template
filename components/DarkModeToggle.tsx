// /components/DarkModeToggle.tsx

import { motion } from 'framer-motion';
import type { DarkModeToggleProps } from '@/types';

/**
 * DarkModeToggle component for toggling between light and dark themes
 * Features smooth animations using Framer Motion and the new design system
 * Enhanced with glass effect and improved accessibility
 * 
 * @param isDark - Whether dark mode is currently active
 * @param onClick - Handler function for toggling dark mode
 * @param className - Optional additional CSS classes
 */
export default function DarkModeToggle({ 
  isDark, 
  onClick, 
  className = '' 
}: DarkModeToggleProps): JSX.Element {
  return (
    <motion.button
      onClick={onClick}
      className={`relative w-12 h-12 flex items-center justify-center rounded-xl glass transition-smooth focus:outline-none focus:ring-2 focus:ring-offset-2 group ${className}`}
      style={{
        backgroundColor: 'rgb(var(--color-surface) / 0.8)',
        borderColor: 'rgb(var(--color-border) / 0.6)',
        color: 'rgb(var(--color-text-primary))',
      }}
      whileHover={{ 
        scale: 1.05,
        backgroundColor: 'rgb(var(--color-surface-hover))',
      }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      type="button"
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Icon container with enhanced animations */}
      <motion.div
        initial={false}
        animate={{ 
          rotate: isDark ? 180 : 0,
          scale: 1,
        }}
        whileHover={{ scale: 1.1 }}
        transition={{ 
          duration: 0.4,
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
        className="relative z-10"
      >
        <motion.div
          key={isDark ? 'sun' : 'moon'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? (
            // Sun icon for switching to light mode
            <svg
              className="w-6 h-6 text-yellow-500 drop-shadow-sm"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
            </svg>
          ) : (
            // Moon icon for switching to dark mode
            <svg
              className="w-6 h-6 text-slate-600 dark:text-slate-300 drop-shadow-sm"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" />
            </svg>
          )}
        </motion.div>
      </motion.div>

      {/* Tooltip */}
      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      </div>
    </motion.button>
  );
}
