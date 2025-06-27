// /Users/user/Desktop/Core Guild Project/projects/colabs/eng-teams/core/personal-website/personal-website-eng-guild-template/pages/_app.js

import '../styles/globals.css'
import { LayoutGroup } from 'framer-motion'
// Import FontAwesome CSS for icon support
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import { NavigationProvider } from '../context/NavigationContext'
config.autoAddCss = false // Prevent FontAwesome from adding CSS automatically (Next.js best practice)

/**
 * Custom App component to initialize pages.
 * Wraps the app with NavigationProvider and LayoutGroup for context and animation support.
 */
function MyApp({ Component, pageProps }) {
  return (
    <NavigationProvider>
      <LayoutGroup>
        <Component {...pageProps} />
      </LayoutGroup>
    </NavigationProvider>
  )
}

export default MyApp
