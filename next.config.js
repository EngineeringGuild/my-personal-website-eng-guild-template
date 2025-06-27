/** @type {import('next').NextConfig} */
const nextConfig = {
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
  
  // Removed deprecated experimental.esmExternals for Next.js 15+
}

module.exports = nextConfig 