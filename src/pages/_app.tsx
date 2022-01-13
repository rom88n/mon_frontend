import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../utils/theme';
import { SnackbarProvider } from 'notistack';
import * as React from 'react';
import { NextComponentType, NextPageContext } from 'next';
import { useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';
import Error from 'next/error';
import ThemeContext from '../utils/ThemeContext';
import { languages } from '../utils/languages';
import get from 'lodash/get';
import LoadingStatus from '../components/LoadingStatus';

interface MyAppProps extends AppProps {
  Component: NextComponentType<NextPageContext, any, {}> & { Layout: typeof React.Component }
  locale: any
  lang: 'ru' | 'en'
  error?: boolean
}

const App = (props: MyAppProps) => {
  const { Component, pageProps, locale, lang, error } = props;

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  const Layout = Component.Layout || React.Fragment;

  if (error) return <Error statusCode={404}/>;

  return (
    <ThemeContext.Provider
      value={{
        lang,
        locale: (path: string) => String(get(locale, path, path)),
      }}
    >
      <CookiesProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <SnackbarProvider maxSnack={3}>
            <Layout>
              <Head>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
              </Head>
              {process.browser && <LoadingStatus/>}
              <Component {...pageProps} />
            </Layout>
          </SnackbarProvider>
        </ThemeProvider>
      </CookiesProvider>
    </ThemeContext.Provider>
  );
};

App.getInitialProps = async ({ Component, ctx }: any) => {

  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  if (!ctx.query.lang && ctx.res && ctx.asPath === '/') {
    ctx.res.writeHead(302, { Location: '/en/' });
    ctx.res.end();
  }

  if (ctx.query.lang) {
    if (languages.includes(ctx.query.lang)) {
      const locale = require(`../../locales/${ctx.query.lang}.json`);
      return { pageProps, locale, lang: ctx.query.lang };
    } else {
      const locale = require(`../../locales/en.json`);
      return { pageProps, locale, lang: 'en', error: true };
    }

  }
  return { pageProps, locale: {}, lang: 'en' };
};

export default App;
