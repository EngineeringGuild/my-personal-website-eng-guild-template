// /Users/user/Desktop/Core Guild Project/projects/colabs/eng-teams/core/personal-website/prototype/mcp.config.example.js

module.exports = {
  // Hostinger API credentials
  apiKey: process.env.HOSTINGER_API_KEY, // Get from Hostinger API panel
  
  // Deployment configuration
  deployment: {
    // Domain name
    domain: 'your-domain.com',
    
    // Node.js version
    nodeVersion: '18.x',
    
    // Build and start commands
    buildCommand: 'npm run build',
    startCommand: 'npm run start',
    
    // Application port
    port: 3000,
    
    // Environment variables
    env: {
      NODE_ENV: 'production'
    },
    
    // Files to exclude from deployment
    exclude: [
      'node_modules',
      '.git',
      '.env',
      'README.md',
      '*.log'
    ]
  }
} 