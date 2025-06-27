// personal-website-eng-guild-template/components/MetaTags.js

import Head from 'next/head'

/**
 * MetaTags component handles all meta tags and favicon configuration
 * Centralizes SEO and icon management in one component
 * 
 * @component
 */
export default function MetaTags() {
  return (
    <Head>
      <title>Caio Augusto Serra Castilho</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content="Caio Augusto Serra Castilho - Mechatronic Engineer, Project Management & Scalability Specialist" />
      
      {/* Favicon Configuration */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Android/Chrome Icons */}
      <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
    </Head>
  )
} 