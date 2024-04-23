/**
 * @author: Egide Ntwali
 * @description: The main app component
 * @param {AppProps} appProps The app props
 * @returns {JSX.Element} The main app component
 */

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import '@/styles/globals.css';
import '@/styles/colors.css';
import '@/styles/font.css';

import { store } from '@/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Analytics />
      <SpeedInsights />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
