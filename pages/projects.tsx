// /Users/user/Desktop/Core%20Guild%20Project/projects/colabs/eng-teams/core/personal-website/personal-website-eng-guild-template/pages/projects.tsx

import React from 'react';
import Layout from '../components/Layout';

/**
 * Projects page component - displays portfolio projects
 * @returns JSX.Element - Projects page with project listings
 */
const ProjectsPage: React.FC = () => {
  return (
    <Layout>
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white dark:bg-blueGray-800 rounded-xl shadow p-6 min-h-[200px] border border-gray-200 dark:border-blueGray-600">
          <h2 className="text-xl font-bold mb-2">Projects</h2>
          <p className="text-gray-700 dark:text-gray-200">
            {/* Placeholder for future project listings */}
            Soon, your main professional and personal projects will be displayed here.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectsPage; 