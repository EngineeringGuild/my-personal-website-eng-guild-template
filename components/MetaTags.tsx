// /components/MetaTags.tsx

import Head from 'next/head';
import type { MetaTagsProps } from '@/types';

/**
 * MetaTags component handles all meta tags and favicon configuration
 * Centralizes SEO and icon management in one component
 * Supports customizable meta tags while providing sensible defaults
 * 
 * @param title - Page title (defaults to site name)
 * @param description - Page description for SEO
 * @param url - Canonical URL for the page
 * @param image - Social media sharing image URL
 * @param type - Open Graph type (website, article, profile)
 */
export default function MetaTags({
  title = 'Caio Augusto Serra Castilho',
  description = 'Caio Augusto Serra Castilho - Mechatronic Engineer, Project Management & Scalability Specialist',
  url = '',
  image = '/og-image.png',
  type = 'website',
}: MetaTagsProps = {}): JSX.Element {
  const siteName = 'Caio Augusto Serra Castilho';
  const fullTitle = title === siteName ? title : `${title} | ${siteName}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      
      {/* Canonical URL */}
      {url && <link rel="canonical" href={url} />}
      
      {/* Favicon Configuration */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Android/Chrome Icons */}
      <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content={siteName} />
      <meta name="theme-color" content="#000000" />
    </Head>
  );
}
