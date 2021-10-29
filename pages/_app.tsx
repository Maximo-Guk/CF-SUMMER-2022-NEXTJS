import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import AuthProvider from '../src/context/AuthProvider';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import theme from '../src/theme';

// Next.js _app.tsx
// Take note of material ui themeprovider, and the authprovider
export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <React.Fragment>
      <Head>
        <title>maximoguk.com Social App</title>
        <link href="/favicon.ico" rel="icon" />
        <meta
          content="minimum-scale=1, initial-scale=1, width=device-width"
          name="viewport"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}
