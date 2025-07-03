// /pages/about.tsx

import React from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import type { PageProps } from '@/types';

/**
 * About page component - displays personal introduction and background information
 * @returns JSX.Element - About page with animated content
 */
const About: React.FC = () => {
  return (
    <Layout>
      <motion.div
        key="about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="px-4"
      >
        <div className="mb-6 text-center text-gray-800 dark:text-white">
          Hi, I'm Caio! I am a Mechatronic Engineer with a passion for innovation, technology, and creating solutions 
          that make a positive impact on people's lives.
        </div>
        <div className="mb-6 text-center text-gray-800 dark:text-white">
          I love planning, reviewing, and expanding businesses. My specialties include project management, 
          scalability development, and business restructuring. I thrive on transforming ideas into executable 
          strategies and building systems that grow efficiently. My best ability is to make a deep research on the business
          and find technologies that will powerup the business.
        </div>
        <div className="text-center text-gray-800 dark:text-white">
          Beyond my professional work, I enjoy science, surfing, conducting experiments, and extreme sports.
          The most amazing thing that happened in my life was becoming a father. If any of these things interest you too,
          I'd love to connect and chat!
        </div>
      </motion.div>
    </Layout>
  );
};

export default About; 