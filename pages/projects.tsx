// /Users/user/Desktop/Core%20Guild%20Project/projects/colabs/eng-teams/core/personal-website/personal-website-eng-guild-template/pages/projects.tsx

import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { useProjects } from '@/hooks/useApi';
import type { PageProps } from '@/types';

/**
 * Projects page component with dynamic data from Supabase
 * Displays user's projects with loading and error states
 */
export default function Projects(_props: PageProps): JSX.Element {
  const { data: projects, loading, error } = useProjects();

  /**
   * Render loading state
   */
  const renderLoading = (): JSX.Element => (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lightBlue-600 dark:border-pink-500"></div>
    </div>
  );

  /**
   * Render error state
   */
  const renderError = (): JSX.Element => (
    <div className="text-center py-12">
      <div className="text-red-600 dark:text-red-400 mb-4">
        <h3 className="text-lg font-semibold mb-2">Error Loading Projects</h3>
        <p className="text-sm">{error}</p>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-lightBlue-600 dark:bg-pink-500 text-white rounded-lg hover:bg-lightBlue-700 dark:hover:bg-pink-600 transition-colors"
      >
        Try Again
      </button>
    </div>
  );

  /**
   * Render projects list
   */
  const renderProjects = (): JSX.Element => {
    if (!projects || projects.length === 0) {
      return (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">No Projects Found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Projects will be displayed here once they are added to the database.
          </p>
        </div>
      );
    }

    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-blueGray-800 rounded-xl shadow-lg border border-gray-200 dark:border-blueGray-600 overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Project Image */}
            {project.image_url && (
              <div className="h-48 bg-gray-200 dark:bg-blueGray-700">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}

            {/* Project Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                {project.is_featured && (
                  <span className="px-2 py-1 bg-lightBlue-100 dark:bg-pink-900 text-lightBlue-800 dark:text-pink-200 text-xs font-semibold rounded-full">
                    Featured
                  </span>
                )}
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 dark:bg-blueGray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Project Link */}
              {project.project_url && (
                <a
                  href={project.project_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-lightBlue-600 dark:text-pink-400 hover:text-lightBlue-700 dark:hover:text-pink-300 font-medium transition-colors"
                >
                  View Project
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <Layout 
      title="Projects - Caio Castilho"
      description="Portfolio of projects by Caio Augusto Serra Castilho - Mechatronic Engineer and Project Management Specialist"
    >
      <motion.div
        key="projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-6xl mx-auto px-4"
      >
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            My Projects
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            A collection of my engineering and development projects
          </p>
        </div>

        {/* Content based on state */}
        {loading && renderLoading()}
        {error && !loading && renderError()}
        {!loading && !error && renderProjects()}
      </motion.div>
    </Layout>
  );
} 