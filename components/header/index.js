import Link from 'next/link'
import { useRouter } from 'next/router'

import Row from '../row'

import styles from './index.module.sass'

export default function Header() {
  const router = useRouter()
  console.log(router)
  
  return (
    <header className={styles.header}>
      <Row>
        <Link href="/"><a className={styles.home}>School CI server</a></Link>
      </Row>
    </header>
  )
}