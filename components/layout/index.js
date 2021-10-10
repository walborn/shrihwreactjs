import Head from 'next/head'
import Footer from '../footer'

import styles from './index.module.sass'


export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Head>
        <title>Layouts Example</title>
      </Head>
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}