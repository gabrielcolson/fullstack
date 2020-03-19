import React, { useMemo } from 'react';
import NextApp from 'next/app';
import Head from 'next/head';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ColorSchemeProvider, useColorScheme } from '../utils/colorScheme';

import { lightTheme, darkTheme } from '../utils/theme';

function MyApp({ children }: { children: React.ReactNode }) {
  const [colorScheme] = useColorScheme();

  const appTheme = useMemo(() => createMuiTheme(
    colorScheme === 'dark' ? darkTheme : lightTheme
  ), [colorScheme]);

  return (
    <>
      <Head>
        <title>Fullstack</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  )
}

export default class App extends NextApp {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ColorSchemeProvider>
        <MyApp>
          <Component {...pageProps} />
        </MyApp>
      </ColorSchemeProvider>
    );
  }
}
