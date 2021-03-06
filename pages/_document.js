import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://yastatic.net/s3/frontend/yandex-font/v0.0.2/browser.css"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <div id='modalportal' />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument