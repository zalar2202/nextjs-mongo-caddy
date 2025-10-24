'use client';

import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import createEmotionCache from '@/utils/createEmotionCache';

import ReduxProvider from './adapters/ReduxProviderAdapter';
import SnackProvider from './adapters/SnackProviderAdapter';
import SocketProvider from './adapters/SocketProviderAdapter';

const theme = createTheme({});
const clientSideEmotionCache = createEmotionCache();

export default function ClientProviders({ children }) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ReduxProvider>
          <SnackProvider>
            <SocketProvider>
              {children}
            </SocketProvider>
          </SnackProvider>
        </ReduxProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
