// /Desktop/Core Guild Project/projects/colabs/eng-teams/core/personal-website/personal-website-eng-guild-template/pages/menu.js

import Layout from '../components/layout'
import { useState } from 'react'

/**
 * Menu page with top navigation for Biography and Projects
 * High technical standard, clean and modern, ready for future content
 */
export default function MenuPage() {
  const [section, setSection] = useState('biography')

  return (
    <Layout>
      <div className="w-full max-w-2xl mx-auto">
        {/* Top menu */}
        <div className="flex justify-center mb-8 space-x-4">
          <button
            className={`px-6 py-2 rounded-full border text-sm font-semibold transition-colors duration-200 focus:outline-none ${section === 'biography' ? 'bg-lightBlue-600 text-white dark:bg-pink-500' : 'bg-white dark:bg-blueGray-800 border-gray-300 dark:border-white text-gray-800 dark:text-white hover:bg-lightBlue-100 dark:hover:bg-pink-600'}`}
            onClick={() => setSection('biography')}
          >
            Biography
          </button>
          <button
            className={`px-6 py-2 rounded-full border text-sm font-semibold transition-colors duration-200 focus:outline-none ${section === 'projects' ? 'bg-lightBlue-600 text-white dark:bg-pink-500' : 'bg-white dark:bg-blueGray-800 border-gray-300 dark:border-white text-gray-800 dark:text-white hover:bg-lightBlue-100 dark:hover:bg-pink-600'}`}
            onClick={() => setSection('projects')}
          >
            Projects
          </button>
        </div>
        {/* Section content */}
        <div className="bg-white dark:bg-blueGray-800 rounded-xl shadow p-6 min-h-[200px] border border-gray-200 dark:border-blueGray-600">
          {section === 'biography' && (
            <div>
              <h2 className="text-xl font-bold mb-2">Biography</h2>
              <p className="text-gray-700 dark:text-gray-200">
                {/* Placeholder for biography text */}
                Your biography will be displayed here. Edit this text to add your professional history, education, achievements, and interests.
              </p>
            </div>
          )}
          {section === 'projects' && (
            <div>
              <h2 className="text-xl font-bold mb-2">Projects</h2>
              <p className="text-gray-700 dark:text-gray-200">
                {/* Placeholder for projects text */}
                Your projects will be displayed here. Edit this text to list and detail your main professional or personal projects.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
} 