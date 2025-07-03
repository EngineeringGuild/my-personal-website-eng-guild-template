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
import { NavigationProvider } from '@/context/NavigationContext';

/**
 * Main layout component that wraps all pages
 * Provides consistent layout structure with dark mode functionality
 * Features responsive design and theme persistence
 * 
 * @param children - Child components to render within layout
 * @param title - Optional page title for meta tags
 * @param description - Optional page description for meta tags
 */
const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = "Personal Website",
  description = "Welcome to my personal website" 
}) => {
  // Theme management using local storage with proper typing
  const { value: theme, setValue: setTheme } = useLocalStorage<ThemeMode>('theme', 'light');

  // Initialize theme based on system preferences and stored value
  useEffect(() => {
    const html = document.documentElement!;
    const storedTheme = localStorage.getItem('theme');
    const isDarkPreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (html) {
      if (
        storedTheme === 'dark' ||
        (!storedTheme && isDarkPreferred)
      ) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    }
  }, []);

  // Update theme when it changes
  useEffect(() => {
    const html = document.documentElement!;
    
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
    <NavigationProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-blueGray-900 transition-colors duration-200">
        <MetaTags title={title} description={description} />
        
        <Script
          defer
          data-domain="caiocastilho.com"
          src="https://plausible.io/js/plausible.js"
          strategy="afterInteractive"
        />

        {/* Fixed Dark Mode Toggle */}
        <div className="fixed top-4 right-4 z-40">
          <DarkModeToggle
            isDark={theme === 'dark'}
            onClick={toggleDarkMode}
          />
        </div>

        {/* Main Content Container - Properly Centered */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            {/* Navigation Component */}
            <Navigation />

                    {/* Main Content Area with Enhanced Border */}
        <motion.main
          layoutId="border-div"
          className="flex flex-col items-center justify-center w-full py-8 my-6 mt-16"
          style={{
            borderTop: '1px solid rgb(var(--color-border))',
            borderBottom: '1px solid rgb(var(--color-border))',
          }}
        >
              <AnimatePresence mode="wait">
                {children}
              </AnimatePresence>
            </motion.main>

            {/* Social Icons Section */}
            <div className="flex justify-center py-6">
              <SocialIcons />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white dark:bg-blueGray-800 border-t border-gray-200 dark:border-blueGray-600 mt-12">
          <div className="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-300">
            <p>&copy; 2024 Personal Website. Built with Next.js and TypeScript.</p>
          </div>
        </footer>
      </div>
    </NavigationProvider>
  );
};

export default Layout;
