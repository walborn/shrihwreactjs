import Head from 'next/head'
import Footer from '../footer'

import styles from './index.module.sass'


export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="keywords" content="school ci server" />
        <meta name="description" content="shri homework reactjs" />
        <meta property="og:image" content="/favicon.png" />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
        <link rel="icon" href="/favicon.png" />
        <title>School CI server</title>
      </Head>
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}