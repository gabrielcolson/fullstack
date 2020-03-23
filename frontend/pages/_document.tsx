import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets, useTheme } from '@material-ui/core/styles';

function MyDocument() {
  const theme = useTheme();

  return (
    <html lang="en">
    <Head>
      {/* PWA primary color */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <meta charSet='utf-8'/>
      <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'/>
      <meta name='description' content='Full stack demo'/>
      <meta name='keywords' content='react fullstack demo prisma node'/>

      <link rel="manifest" href="/manifest.json"/>
      <link href='/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16'/>
      <link href='/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32'/>
      <meta name="theme-color" content={theme.palette.primary.main} />
    </Head>
    <body>
    <Main />
    <NextScript />
    </body>
    </html>
  );
}

class Doc extends Document {
  render() {
    return <MyDocument/>
  }
}

Doc.getInitialProps = async ctx => {
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
};

export default Doc;
