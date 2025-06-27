// /Users/user/Desktop/Core Guild Project/projects/colabs/eng-teams/core/personal-website/personal-website-eng-guild-template/pages/index.js

import Layout from '../components/layout'
import { motion } from 'framer-motion'
import Image from 'next/image'
import SocialIcons from '../components/SocialIcons' // Social media icons component

export default function Home() {
  return (
    <Layout>
      <motion.div
        key="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col items-center justify-center"
      >
        <div className="flex flex-col items-center justify-center">
          <img className="w-32 h-32 mb-8 rounded-full object-cover" src="/caio-solana.png" alt="Caio Augusto Serra Castilho" />
          <h1 className="mx-auto text-2xl font-semibold tracking-widest text-center sm:text-3xl">
            CAIO A. S. CASTILHO
          </h1>
          <hr className="w-16 my-8 border-gray-300" />
          <h2 className="text-lg tracking-widest text-center">MECHATRONIC ENGINEER</h2>
          <h3 className="text-sm tracking-wider text-center text-gray-500 dark:text-gray-400 mt-2">
            PROJECT MANAGEMENT & SCALABILITY SPECIALIST
          </h3>
        </div>
      </motion.div>
    </Layout>
  )
}
