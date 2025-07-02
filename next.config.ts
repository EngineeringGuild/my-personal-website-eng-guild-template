import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Enable static export for hosting providers like Hostinger
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true
  },
  
  // Configure trailing slash for better hosting compatibility
  trailingSlash: true,
  
  // Configure asset prefix for production
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  
  // TypeScript configuration
  typescript: {
    // Ignore TypeScript errors during build (useful for CI/CD)
    ignoreBuildErrors: false,
  },
  
  // ESLint configuration
  eslint: {
    // Ignore ESLint errors during build (useful for CI/CD)
    ignoreDuringBuilds: false,
  },
  
  // Experimental features for Next.js 15+
  experimental: {
    // Enable optimized loading
    optimizePackageImports: ['@fortawesome/react-fontawesome', 'framer-motion'],
  },
};

export default nextConfig;
