// /pages/_app.tsx

import '@/styles/globals.css';
import { LayoutGroup } from 'framer-motion';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import type { AppProps } from 'next/app';
import { NavigationProvider } from '@/context/NavigationContext';

// Prevent FontAwesome from adding CSS automatically (Next.js best practice)
config.autoAddCss = false;

/**
 * Custom App component to initialize pages
 * Provides global context providers and animation support
 * 
 * @param Component - The page component being rendered
 * @param pageProps - Props passed to the page component
 */
export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <NavigationProvider>
      <LayoutGroup>
        <Component {...pageProps} />
      </LayoutGroup>
    </NavigationProvider>
  );
}
