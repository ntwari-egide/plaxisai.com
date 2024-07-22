/**
 * @author: Egide Ntwali
 * @description: The main app component
 * @param {AppProps} appProps The app props
 * @returns {JSX.Element} The main app component
 */

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AppProps } from 'next/app';
import Script from 'next/script';
import { Provider } from 'react-redux';

import '@/styles/globals.css';
import '@/styles/colors.css';
import '@/styles/font.css';

import { store } from '@/store';

function MyApp({ Component, pageProps }: AppProps) {
  // Setting up the Google Analytics

  return (
    <>
      <Provider store={store}>
        <Analytics />
        <SpeedInsights />
        <Component {...pageProps} />
      </Provider>
      <Script
        src='https://www.googletagmanager.com/gtag/js?id=G-SP1PT7F8EV'
        strategy='afterInteractive'
      />
      <Script id='google-analytics' strategy='afterInteractive'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-SP1PT7F8EV');
        `}
      </Script>
    </>
  );
}

export default MyApp;
