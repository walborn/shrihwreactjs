import React from 'react'
import Link from 'next/link'

import Layout from "../components/layout"
import Button from '../components/button'
import Card from '../components/card'
import Row from '../components/row'
import mock from '../mock'

import Logo from '../images/logo.svg'
import Settings from '../images/settings.svg'
import Run from '../images/run.svg'

import styles from './index.module.sass'

const history = mock(1234).reverse()

function HomePage() {
  const [ limit, setLimit ] = React.useState(10)
  if (Array.isArray(history)) return (
    <Layout>
      <Row className={styles.controls}>
        <Button className={styles.edit} >
          <Settings />
        </Button>
        <Button className={styles.run}>
          <Run />
          Run build
        </Button>
      </Row>

      {history.slice(0, limit).map(i => <Card key={i.index} {...i} branch="master" />)}
      <Button className={styles.showmore} onClick={() => setLimit(prev => prev + 10)}>Show more</Button>
    </Layout>
  )
  return (
    <Layout>
      <Row className={styles.settings}>
        <Button
          className={styles.settings}
        >
          <Settings />
          Settings
        </Button>
      </Row>
      <div className={styles.home}>
        <Logo className={styles.logo}/>
        <div className={styles.description}>Configure repository connection<br/>and synchronization settings</div>
        <Link className={styles.settings} href="/settings"><a><Button yellow>Open settings</Button></a></Link>
      </div>
    </Layout>
  )
}

export default HomePage