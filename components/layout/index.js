import Head from 'next/head'

import Row from '../row'
import Header from '../header'
import Footer from '../footer'

import styles from './index.module.sass'


export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Head>
        <title>Layouts Example</title>
      </Head>
      <Header />
      <main>
        <Row>
          {children}
        </Row>
      </main>
      <Footer />
    </div>
  )
}