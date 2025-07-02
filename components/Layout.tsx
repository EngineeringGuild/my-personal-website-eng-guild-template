// /components/Layout.tsx

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import Script from 'next/script';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import DarkModeToggle from '@/components/DarkModeToggle';
import SocialIcons from '@/components/SocialIcons';
import Navigation from '@/components/Navigation';
import MetaTags from '@/components/MetaTags';
import type { LayoutProps, ThemeMode } from '@/types';

/**
 * Main layout component that wraps all pages
 * Provides consistent layout structure with dark mode functionality
 * Features responsive design and theme persistence
 * 
 * @param children - Child components to render within layout
 * @param title - Optional page title for meta tags
 * @param description - Optional page description for meta tags
 */
export default function Layout({ 
  children, 
  title,
  description 
}: LayoutProps): JSX.Element {
  // Theme management using local storage with proper typing
  const { value: theme, setValue: setTheme } = useLocalStorage<ThemeMode>('theme', 'light');

  // Initialize theme based on system preferences and stored value
  useEffect(() => {
    const html = document.getElementsByTagName('html')[0];
    const isDarkPreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme') as ThemeMode | null;
    
    if (
      storedTheme === 'dark' ||
      (!storedTheme && isDarkPreferred)
    ) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, []);

  // Update theme when it changes
  useEffect(() => {
    const html = document.getElementsByTagName('html')[0];
    
    if (theme === 'dark') {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  /**
   * Toggles between light and dark mode
   */
  const toggleDarkMode = (): void => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen text-gray-800 transition duration-1000 ease-in-out dark:text-white dark:bg-blueGray-700">
      {/* Meta tags with optional props */}
      <MetaTags title={title} description={description} />
      
      {/* Analytics Script - Plausible Analytics */}
      <Script
        defer
        data-domain="caiocastilho.com"
        src="https://plausible.io/js/plausible.js"
        strategy="afterInteractive"
      />

      <div
        style={{ minWidth: '24rem', maxWidth: '37rem' }}
        className="flex flex-col items-center justify-center w-2/3"
      >
        {/* Dark Mode Toggle - Fixed position */}
        <div className="fixed top-3 right-3 z-40">
          <DarkModeToggle
            isDark={theme === 'dark'}
            onClick={toggleDarkMode}
          />
        </div>

        {/* Navigation Component */}
        <Navigation />

        {/* Main Content Area with Animation */}
        <motion.div
          layoutId="border-div"
          className="flex flex-col items-center justify-center w-full py-8 my-6 mt-16 border-t border-b border-gray-300 dark:border-white"
        >
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </motion.div>

        {/* Social Media Icons */}
        <SocialIcons />
      </div>
    </div>
  );
}
