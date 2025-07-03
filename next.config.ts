import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Conditionally enable static export only for production deployment
  // This allows API routes to work in development with Supabase
  ...(process.env.NEXT_PUBLIC_DEPLOY_TARGET === 'static' && {
    output: 'export',
    trailingSlash: true,
    images: {
      unoptimized: true
    },
  }),
  
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
