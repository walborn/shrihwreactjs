import Link from 'next/link'
import { useRouter } from 'next/router'

import Row from '../row'
import Settings from '../../images/settings.svg'
import Button from '../button'

import styles from './index.module.sass'

export default function Header() {
  const router = useRouter()
  console.log(router)
  
  return (
    <header className={styles.header}>
      <Row>
        <Link href="/"><a className={styles.home}>School CI server</a></Link>
        <Button
          className={styles.settings}
          hidden={router.pathname !== '/'}
        >
          <Settings />
          Settings
        </Button>
      </Row>
    </header>
  )
}