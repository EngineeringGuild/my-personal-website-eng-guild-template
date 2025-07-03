// /pages/about.tsx

import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import type { PageProps } from '@/types';

/**
 * About page component - displays comprehensive personal introduction and background
 * Features Engineering Guild branding and structured content sections
 * Optimized for mobile and desktop viewing
 */
const About: React.FC = () => {
  return (
    <Layout
      title="About | Caio Augusto Serra Castilho"
      description="Learn about Caio Augusto Serra Castilho - Mechatronic Engineer specializing in project management, scalability development, and business innovation."
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-responsive-xl font-bold gradient-text mb-4">
            About Me
          </h1>
          <div className="w-16 sm:w-24 h-1 gradient-guild rounded-full mx-auto"></div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid gap-8 sm:gap-12 lg:gap-16">
          
          {/* Introduction Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card p-6 sm:p-8"
          >
            <h2 className="text-responsive-lg font-semibold mb-4 sm:mb-6 text-guild-green">
              Hello, I'm Caio! 👋
            </h2>
            <p className="text-lg leading-relaxed mb-4" style={{ color: 'rgb(var(--color-text-secondary))' }}>
              I am a <strong className="text-guild-green">Mechatronic Engineer</strong> with a deep passion for innovation, 
              technology, and creating solutions that make a positive impact on people's lives. My journey combines 
              engineering excellence with business acumen to drive meaningful change.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: 'rgb(var(--color-text-secondary))' }}>
              Through the <strong className="text-guild-green">Engineering Guild</strong>, I focus on developing 
              scalable solutions that empower teams and organizations to achieve their full potential.
            </p>
          </motion.section>

          {/* Professional Expertise Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="card p-6 sm:p-8"
          >
            <h2 className="text-responsive-lg font-semibold mb-4 sm:mb-6 text-guild-green">
              Professional Expertise 🚀
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-medium mb-3 text-guild-green">Core Specialties</h3>
                <ul className="space-y-2 text-base" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                  <li className="flex items-start">
                    <span className="text-guild-green mr-2">▸</span>
                    Project Management & Leadership
                  </li>
                  <li className="flex items-start">
                    <span className="text-guild-green mr-2">▸</span>
                    Scalability Development
                  </li>
                  <li className="flex items-start">
                    <span className="text-guild-green mr-2">▸</span>
                    Business Restructuring
                  </li>
                  <li className="flex items-start">
                    <span className="text-guild-green mr-2">▸</span>
                    Strategic Planning & Execution
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-3 text-guild-green">Technical Skills</h3>
                <ul className="space-y-2 text-base" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                  <li className="flex items-start">
                    <span className="text-guild-green mr-2">▸</span>
                    Systems Architecture
                  </li>
                  <li className="flex items-start">
                    <span className="text-guild-green mr-2">▸</span>
                    Technology Research & Analysis
                  </li>
                  <li className="flex items-start">
                    <span className="text-guild-green mr-2">▸</span>
                    Process Optimization
                  </li>
                  <li className="flex items-start">
                    <span className="text-guild-green mr-2">▸</span>
                    Innovation Implementation
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-guild-green">
              <p className="text-base leading-relaxed" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                <strong>My superpower:</strong> I excel at conducting deep business research and identifying 
                technologies that can significantly enhance and transform business operations.
              </p>
            </div>
          </motion.section>

          {/* Personal Interests Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="card p-6 sm:p-8"
          >
            <h2 className="text-responsive-lg font-semibold mb-4 sm:mb-6 text-guild-green">
              Beyond Engineering 🌊
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-medium mb-3 text-guild-green">Passions & Interests</h3>
                <ul className="space-y-2 text-base" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                  <li className="flex items-start">
                    <span className="text-guild-green mr-2">🔬</span>
                    Scientific Research & Experiments
                  </li>
                  <li className="flex items-start">
                    <span className="text-guild-green mr-2">🏄‍♂️</span>
                    Surfing & Ocean Sports
                  </li>
                  <li className="flex items-start">
                    <span className="text-guild-green mr-2">⚡</span>
                    Extreme Sports & Adventures
                  </li>
                  <li className="flex items-start">
                    <span className="text-guild-green mr-2">🔧</span>
                    Engineering Experiments
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-3 text-guild-green">Life Philosophy</h3>
                <p className="text-base leading-relaxed" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                  I believe in the power of continuous learning, pushing boundaries, and finding the perfect 
                  balance between analytical thinking and creative exploration.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-guild-green">
              <p className="text-base leading-relaxed" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                <strong>💝 Most amazing milestone:</strong> Becoming a father has been the most transformative 
                and wonderful experience of my life, bringing new perspective to everything I do.
              </p>
            </div>
          </motion.section>

          {/* Connect Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-center"
          >
            <div className="card p-6 sm:p-8">
              <h2 className="text-responsive-lg font-semibold mb-4 text-guild-green">
                Let's Connect! 🤝
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                If any of these interests resonate with you, or if you're passionate about engineering, 
                innovation, or building amazing things, I'd love to connect and chat!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn btn-primary">
                  Get In Touch
                </button>
                <button className="btn btn-outline">
                  View Projects
                </button>
              </div>
            </div>
          </motion.section>

        </div>
      </div>
    </Layout>
  );
};

export default About; 