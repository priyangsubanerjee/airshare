import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/logo.png"></link>
          <link rel="icon" href="/logo.png"></link>
          <meta name="apple-mobile-web-app-status-bar" content="#fff" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="application-name" content="AirShare" />
          <meta name="apple-mobile-web-app-title" content="AirShare" />
          <meta name="msapplication-starturl" content="/" />

          <meta name="theme-color" content="#fff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
