import Link from 'next/link'

import Layout from "../components/layout"
import Button from '../components/button'

import Logo from '../images/logo.svg'

import styles from './index.module.sass'

function HomePage() {
  return (
    <Layout>
      <div className={styles.home}>
        <Logo className={styles.logo}/>
        <div className={styles.description}>Configure repository connection<br/>and synchronization settings</div>
        <Link className={styles.settings} href="/settings"><a><Button yellow>Open settings</Button></a></Link>
      </div>
    </Layout>
  )
}

export default HomePage