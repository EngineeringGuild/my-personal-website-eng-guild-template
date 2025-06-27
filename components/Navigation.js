// personal-website-eng-guild-template/components/Navigation.js

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useContext } from 'react'
import { NavigationContext } from '../context/NavigationContext'

/**
 * Navigation component for the main site navigation
 * - Initial: HOME, ABOUT, + (centered)
 * - On +: HOME, ABOUT, BIOGRAPHY, PROJECTS, X (top right)
 * - On X: return to initial state
 * All labels in English.
 */
export default function Navigation() {
  const { showNavTopRight, setShowNavTopRight } = useContext(NavigationContext)

  // Initial navigation buttons
  const initialNavButtons = [
    { href: '/', label: 'HOME' },
    { href: '/about', label: 'ABOUT' },
  ]
  // Expanded navigation buttons
  const expandedNavButtons = [
    { href: '/', label: 'HOME' },
    { href: '/about', label: 'ABOUT' },
    { href: '/biography', label: 'BIOGRAPHY' },
    { href: '/projects', label: 'PROJECTS' },
  ]

  // Render navigation group (centered or top right)
  const navGroup = (buttons, showClose) => (
    <div className="flex flex-wrap items-center space-x-2">
      {buttons.map(({ href, label }) => (
        <Link key={label} href={href}>
          <button className="w-24 py-1 text-xs leading-6 tracking-widest border border-gray-300 rounded-full dark:hover:border-pink-500 dark:border-white focus:outline-none hover:text-lightBlue-600 hover:border-lightBlue-600 dark:hover:text-pink-500">
            {label}
          </button>
        </Link>
      ))}
      {/* Show X button only when nav is in top right */}
      {showClose && (
        <button
          className="w-8 py-1 text-xl leading-6 tracking-widest border border-gray-300 rounded-full dark:hover:border-pink-500 dark:border-white focus:outline-none hover:text-lightBlue-600 hover:border-lightBlue-600 dark:hover:text-pink-500 flex items-center justify-center ml-2"
          onClick={() => setShowNavTopRight(false)}
          aria-label="Close navigation menu"
        >
          ×
        </button>
      )}
    </div>
  )

  return (
    <>
      {/* Top-centered floating navigation group (expanded) */}
      {showNavTopRight && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
          {navGroup(expandedNavButtons, true)}
        </div>
      )}
      {/* Centered navigation group with + button (initial) */}
      {!showNavTopRight && (
        <motion.div layoutId="nav" className="flex flex-wrap justify-center leading-6 items-center mt-8">
          {navGroup(initialNavButtons, false)}
          {/* Plus button to open top-right nav */}
          <button
            className="w-8 py-1 text-xl leading-6 tracking-widest border border-gray-300 rounded-full dark:hover:border-pink-500 dark:border-white focus:outline-none hover:text-lightBlue-600 hover:border-lightBlue-600 dark:hover:text-pink-500 flex items-center justify-center ml-2"
            onClick={() => setShowNavTopRight(true)}
            aria-label="Open navigation menu"
          >
            +
          </button>
        </motion.div>
      )}
    </>
  )
}