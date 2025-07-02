// /Users/user/Desktop/Core%20Guild%20Project/projects/colabs/eng-teams/core/personal-website/personal-website-eng-guild-template/pages/biography.tsx

import React, { useState } from 'react';
import Layout from '../components/Layout';

/**
 * Interface for biography stage definition
 */
interface BiographyStage {
  key: string;
  label: string;
}

/**
 * Available biography stages with labels
 */
const stages: BiographyStage[] = [
  { key: 'infancy', label: 'Infancy (0-12)' },
  { key: 'adolescence', label: 'Adolescence (13-19)' },
  { key: 'youth', label: 'Youth (20-29)' },
  { key: 'maturity', label: 'Maturity (30-49)' },
  { key: 'present', label: 'Present (50+)' },
];

/**
 * Biography page component with interactive timeline stages
 * @returns JSX.Element - Biography page with stage navigation and content
 */
const BiographyPage: React.FC = () => {
  const [stage, setStage] = useState<string>('infancy');
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);

  /**
   * Handle stage selection
   * @param selectedStage - The stage key to select
   */
  const handleStageChange = (selectedStage: string): void => {
    setStage(selectedStage);
  };

  /**
   * Toggle filters menu visibility
   */
  const toggleFilters = (): void => {
    setFiltersOpen(!filtersOpen);
  };

  /**
   * Render stage content based on current selection
   * @param currentStage - Current stage key
   * @returns JSX.Element - Stage-specific content
   */
  const renderStageContent = (currentStage: string): JSX.Element => {
    switch (currentStage) {
      case 'infancy':
        return (
          <div>
            <h2 className="text-lg font-bold mb-2">Infancy</h2>
            <p className="text-gray-700 dark:text-gray-200">
              Describe your childhood, family, first experiences, and early learnings here.
            </p>
          </div>
        );
      case 'adolescence':
        return (
          <div>
            <h2 className="text-lg font-bold mb-2">Adolescence</h2>
            <p className="text-gray-700 dark:text-gray-200">
              Share about your adolescence, school, friendships, discoveries, and challenges.
            </p>
          </div>
        );
      case 'youth':
        return (
          <div>
            <h2 className="text-lg font-bold mb-2">Youth</h2>
            <p className="text-gray-700 dark:text-gray-200">
              Share your youth, early career, studies, travels, and achievements.
            </p>
          </div>
        );
      case 'maturity':
        return (
          <div>
            <h2 className="text-lg font-bold mb-2">Maturity</h2>
            <p className="text-gray-700 dark:text-gray-200">
              Talk about your maturity, major projects, family, learnings, and evolution.
            </p>
          </div>
        );
      case 'present':
        return (
          <div>
            <h2 className="text-lg font-bold mb-2">Present</h2>
            <p className="text-gray-700 dark:text-gray-200">
              Describe your current phase, future vision, values, and what motivates you today.
            </p>
          </div>
        );
      default:
        return (
          <div>
            <h2 className="text-lg font-bold mb-2">Select a Stage</h2>
            <p className="text-gray-700 dark:text-gray-200">
              Please select a life stage to view the corresponding content.
            </p>
          </div>
        );
    }
  };

  return (
    <Layout>
      <div className="w-full max-w-2xl mx-auto">
        {/* Filter buttons: top right if open, center otherwise */}
        {filtersOpen ? (
          <div className="fixed top-6 right-8 z-50 flex items-center space-x-2 animate-fade-in">
            {stages.map(({ key, label }: BiographyStage) => (
              <button
                key={key}
                className={`px-4 py-2 rounded-full border text-xs font-semibold transition-colors duration-200 focus:outline-none ${
                  stage === key
                    ? 'bg-lightBlue-600 text-white dark:bg-pink-500'
                    : 'bg-white dark:bg-blueGray-800 border-gray-300 dark:border-white text-gray-800 dark:text-white hover:bg-lightBlue-100 dark:hover:bg-pink-600'
                }`}
                onClick={() => handleStageChange(key)}
              >
                {label}
              </button>
            ))}
            {/* Close button */}
            <button
              className="w-8 h-8 flex items-center justify-center text-xl border border-gray-300 rounded-full dark:hover:border-pink-500 dark:border-white focus:outline-none hover:text-lightBlue-600 hover:border-lightBlue-600 dark:hover:text-pink-500 ml-2"
              onClick={toggleFilters}
              aria-label="Close filter menu"
            >
              ×
            </button>
          </div>
        ) : (
          <div className="flex justify-center mb-8 space-x-2">
            {stages.map(({ key, label }: BiographyStage) => (
              <button
                key={key}
                className={`px-4 py-2 rounded-full border text-xs font-semibold transition-colors duration-200 focus:outline-none ${
                  stage === key
                    ? 'bg-lightBlue-600 text-white dark:bg-pink-500'
                    : 'bg-white dark:bg-blueGray-800 border-gray-300 dark:border-white text-gray-800 dark:text-white hover:bg-lightBlue-100 dark:hover:bg-pink-600'
                }`}
                onClick={() => handleStageChange(key)}
              >
                {label}
              </button>
            ))}
            {/* Open filter menu button */}
            <button
              className="w-8 h-8 flex items-center justify-center text-xl border border-gray-300 rounded-full dark:hover:border-pink-500 dark:border-white focus:outline-none hover:text-lightBlue-600 hover:border-lightBlue-600 dark:hover:text-pink-500 ml-2"
              onClick={toggleFilters}
              aria-label="Open filter menu"
            >
              +
            </button>
          </div>
        )}
        
        {/* Content for each stage */}
        <div className="bg-white dark:bg-blueGray-800 rounded-xl shadow p-6 min-h-[200px] border border-gray-200 dark:border-blueGray-600">
          {renderStageContent(stage)}
        </div>
      </div>
    </Layout>
  );
};

export default BiographyPage; 