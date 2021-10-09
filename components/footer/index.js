import Link from 'next/link'

import Row from '../row'
import styles from './index.module.sass'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Row>
        <Link href="javascript:void(0);"><a className={styles.link}>Support</a></Link>
        <Link href="javascript:void(0);"><a className={styles.link}>Learning</a></Link>
        <Link href="javascript:void(0);"><a className={styles.link}>Русская версия</a></Link>
        <div className={styles.copyright}>© 2021 Yuzhakov Boris</div>
      </Row>
    </footer>
  )
}