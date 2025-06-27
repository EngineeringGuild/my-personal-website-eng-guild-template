// personal-website-eng-guild-template/components/layout.js

import { AnimatePresence, motion } from 'framer-motion'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import DarkModeToggle from './DarkModeToggle'
import SocialIcons from './SocialIcons'
import Script from 'next/script'
import Navigation from './Navigation'
import MetaTags from './MetaTags'

/**
 * Main layout component that wraps all pages
 * Handles dark mode functionality and provides consistent layout structure
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render within layout
 */
export default function Layout({ children }) {
  // Theme management using local storage
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  // Initialize theme based on system preferences
  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.getElementsByTagName('html')[0].classList.add('dark')
    } else {
      document.getElementsByTagName('html')[0].classList.remove('dark')
    }
  }, [])

  // Update theme when it changes
  useEffect(() => {
    const html = document.getElementsByTagName('html')[0]
    if (theme === 'dark') {
      html.classList.add('dark')
      localStorage.theme = 'dark'
    } else {
      html.classList.remove('dark')
      localStorage.theme = 'light'
    }
  }, [theme])

  // Toggle dark mode handler
  const toggleDarkMode = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen text-gray-800 transition duration-1000 ease-in-out dark:text-white dark:bg-blueGray-700">
      <MetaTags />
      
      {/* Analytics Script */}
      <Script
        defer
        data-domain="caiocastilho.com"
        src="https://plausible.io/js/plausible.js"
      />

      <div
        style={{ minWidth: '24rem', maxWidth: '37rem' }}
        className="flex flex-col items-center justify-center w-2/3"
      >
        {/* Dark Mode Toggle */}
        <div className="fixed top-3 right-3">
          <DarkModeToggle
            isDark={theme === 'dark'}
            onClick={toggleDarkMode}
          />
        </div>

        {/* Navigation */}
        <Navigation />

        {/* Main Content Area */}
        <motion.div
          layoutId="border-div"
          className="flex flex-col items-center justify-center w-full py-8 my-6 mt-16 border-t border-b border-gray-300 dark:border-white"
        >
          <AnimatePresence mode="wait">{children}</AnimatePresence>
        </motion.div>

        {/* Social Media Icons */}
        <SocialIcons />
      </div>
    </div>
  )
}
