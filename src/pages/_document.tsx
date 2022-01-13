import * as React from 'react';
import Document, { DocumentContext, DocumentProps, Html, Head, Main, NextScript } from 'next/document';
import { AppProps } from 'next/app';
// mui
import { ServerStyleSheets } from '@material-ui/styles';
import flush from 'styled-jsx/server';
import theme from '../utils/theme';
// apollo
import { getDataFromTree } from '@apollo/client/react/ssr';
import { NextComponentType, NextPageContext } from 'next';
// import { getApolloClient } from '../apollo/apolloClient';

interface MyAppProps extends AppProps {
  Component: NextComponentType<NextPageContext, any, {}> & { Layout: typeof React.Component }
  locale: any
  lang: 'ru' | 'en'
  error?: boolean
}

class DocumentWithApollo extends Document {
  // Reference: https://gist.github.com/Tylerian/16d48e5850b407ba9e3654e17d334c1e
  constructor(props: DocumentProps & { apolloState: object, __NEXT_DATA__: any }) {
    super(props);

    /**
     * Attach apolloState to the "global" __NEXT_DATA__ so we can populate the ApolloClient cache
     */
    const { __NEXT_DATA__, apolloState } = props;
    __NEXT_DATA__.apolloState = apolloState;
  }

  static async getInitialProps(ctx: DocumentContext & { appProps: MyAppProps }) {

    /**
     * Initialize and get a reference to ApolloClient, which is saved in a "global" variable.
     * The same client instance is returned to any other call to `getApolloClient`, so _app.js gets the same authenticated client to give to ApolloProvider.
     */
    // const apolloClient = getApolloClient(true);
    //
    // /**
    //  * Render the page through Apollo's `getDataFromTree` so the cache is populated.
    //  * Unfortunately this renders the page twice per request... There may be a way around doing this, but I haven't quite ironed that out yet.
    //  */
    // await getDataFromTree(<ctx.AppTree {...ctx.appProps} />);
    //
    // /**
    //  * Extract the cache to pass along to the client so the queries are "hydrated" and don't need to actually request the data again!
    //  */
    // const apolloState = apolloClient.extract();

    // mui
    const sheets = new ServerStyleSheets();

    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () => originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props}/>),
    });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      // ...apolloState,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: (
        <>
          {sheets.getStyleElement()}
          {flush() || null}
        </>
      ),
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main}/>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    );
  }
}

export default DocumentWithApollo;