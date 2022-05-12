import Document, { Html, Head, Main, NextScript } from "next/document";

class AppDocument extends Document {
  render() {
    return (
      <Html>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0"
        ></meta>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="apple-mobile-web-app-status-bar-title" content="Colors" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link
          rel="apple-touch-icon-ipad"
          href="icons/apple-touch-icon-ipad.png"
          type="image/png"
        />
        <link
          rel="apple-touch-icon-ipad-retina"
          href="icons/apple-touch-icon-ipad-retina.png"
          type="image/png"
        />
        <link
          rel="apple-touch-icon-iphone-retina"
          href="icons/apple-touch-icon-iphone-retina.png"
          type="image/png"
        />
        <link
          rel="apple-touch-icon"
          href="icons/apple-touch-icon.png"
          type="image/png"
        />
        <link
          rel="apple-touch-startup-image"
          href="icons/apple-touch-startup-image.png"
          type="image/png"
        />
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
