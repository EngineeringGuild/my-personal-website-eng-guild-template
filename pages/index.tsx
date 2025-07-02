// /pages/index.tsx

import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import type { PageProps } from '@/types';

/**
 * Home page component
 * Features animated introduction with personal information
 * Displays profile image, name, title, and specialization
 */
export default function Home(_props: PageProps): JSX.Element {
  return (
    <Layout 
      title="Caio Augusto Serra Castilho"
      description="Caio Augusto Serra Castilho - Mechatronic Engineer, Project Management & Scalability Specialist"
    >
      <motion.div
        key="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col items-center justify-center"
      >
        <div className="flex flex-col items-center justify-center">
          {/* Profile Image */}
          <img 
            className="w-32 h-32 mb-8 rounded-full object-cover shadow-lg"
            src="/caio-solana.png" 
            alt="Caio Augusto Serra Castilho profile photo"
            loading="eager"
          />
          
          {/* Main Title */}
          <h1 className="mx-auto text-2xl font-semibold tracking-widest text-center sm:text-3xl">
            CAIO A. S. CASTILHO
          </h1>
          
          {/* Decorative Divider */}
          <hr className="w-16 my-8 border-gray-300" />
          
          {/* Professional Title */}
          <h2 className="text-lg tracking-widest text-center">
            MECHATRONIC ENGINEER
          </h2>
          
          {/* Specialization */}
          <h3 className="text-sm tracking-wider text-center text-gray-500 dark:text-gray-400 mt-2">
            PROJECT MANAGEMENT & SCALABILITY SPECIALIST
          </h3>
        </div>
      </motion.div>
    </Layout>
  );
}
