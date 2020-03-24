import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';

class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
  }

  render() {
    return (
      <html lang="en">
      <Head>

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:400,500&display=swap"
        />

        <meta charSet='utf-8'/>
        <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'/>
        <meta name='description' content='Full stack demo'/>
        <meta name='keywords' content='react fullstack demo prisma node'/>

        <link rel="manifest" href="/manifest.json"/>
        <link href='/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16'/>
        <link href='/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32'/>
      </Head>
      <body>
      <Main />
      <NextScript />
      </body>
      </html>
    );
  }
}

export default CustomDocument;
