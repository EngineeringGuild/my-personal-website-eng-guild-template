// /Users/user/Desktop/Core%20Guild%20Project/projects/colabs/eng-teams/core/personal-website/personal-website-eng-guild-template/pages/biography.tsx

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useBiographyContent } from '@/hooks/useApi';
import type { BiographyStage, BiographyStageKey } from '@/types';

/**
 * Available biography stages with labels
 */
const stages: readonly BiographyStage[] = [
  { key: 'infancy', label: 'Infancy (0-12)' },
  { key: 'adolescence', label: 'Adolescence (13-19)' },
  { key: 'youth', label: 'Youth (20-29)' },
  { key: 'maturity', label: 'Maturity (30-49)' },
  { key: 'present', label: 'Present (50+)' },
] as const;

/**
 * Biography page component with interactive timeline stages
 * Now fetches dynamic content from Supabase database
 * @returns JSX.Element - Biography page with stage navigation and dynamic content
 */
const BiographyPage: React.FC = (): JSX.Element => {
  const [stage, setStage] = useState<BiographyStageKey>('infancy');
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);

  // Fetch biography content for current stage
  const { data: biographyContent, loading, error } = useBiographyContent(stage);

  /**
   * Handle stage selection
   * @param selectedStage - The stage key to select
   */
  const handleStageChange = (selectedStage: BiographyStageKey): void => {
    setStage(selectedStage);
  };

  /**
   * Toggle filters menu visibility
   */
  const toggleFilters = (): void => {
    setFiltersOpen(!filtersOpen);
  };

  /**
   * Render stage content based on current selection and database data
   * @param currentStage - Current stage key
   * @returns JSX.Element - Stage-specific content
   */
  const renderStageContent = (currentStage: BiographyStageKey): JSX.Element => {
    // Loading state
    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lightBlue-600 dark:border-pink-500"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400">Loading content...</span>
        </div>
      );
    }

    // Error state
    if (error) {
      return (
        <div className="text-center py-12">
          <div className="text-red-600 dark:text-red-400 mb-4">
            <h3 className="text-lg font-semibold mb-2">Error Loading Content</h3>
            <p className="text-sm mb-4">{error}</p>
          </div>
          {renderFallbackContent(currentStage)}
        </div>
      );
    }

    // Database content
    if (biographyContent && biographyContent.length > 0) {
      return (
        <div className="space-y-6">
          {biographyContent.map((content) => (
            <div key={content.id}>
              <h2 className="text-lg font-bold mb-2">{content.title}</h2>
              <div className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap">
                {content.content}
              </div>
            </div>
          ))}
        </div>
      );
    }

    // No content found - show fallback
    return renderFallbackContent(currentStage);
  };

  /**
   * Render fallback content when database content is not available
   * @param currentStage - Current stage key
   * @returns JSX.Element - Fallback content
   */
  const renderFallbackContent = (currentStage: BiographyStageKey): JSX.Element => {
    const fallbackContent: Record<BiographyStageKey, { title: string; content: string }> = {
      infancy: {
        title: 'Infancy',
        content: 'Born in Brazil, early exposure to technology and engineering concepts sparked my curiosity about how things work.'
      },
      adolescence: {
        title: 'Adolescence', 
        content: 'Developed passion for engineering and technology during high school, participating in robotics competitions and technical projects.'
      },
      youth: {
        title: 'Youth',
        content: 'Studied Mechatronic Engineering, gaining experience in embedded systems, automation, and project management methodologies.'
      },
      maturity: {
        title: 'Maturity',
        content: 'Advanced to project management and scalability specialist, leading complex engineering projects and mentoring development teams.'
      },
      present: {
        title: 'Present',
        content: 'Currently focused on engineering leadership, system scalability, and building high-performance technical teams.'
      }
    };

    const content = fallbackContent[currentStage];
    
    return (
      <div>
        <h2 className="text-lg font-bold mb-2">{content.title}</h2>
        <p className="text-gray-700 dark:text-gray-200 mb-4">
          {content.content}
        </p>
        <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-4">
          <p>* Using fallback content - database content will appear here once configured</p>
        </div>
      </div>
    );
  };

  return (
    <Layout title={`Biography - ${stages.find(s => s.key === stage)?.label}`}>
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
                onClick={() => handleStageChange(key as BiographyStageKey)}
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
                onClick={() => handleStageChange(key as BiographyStageKey)}
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