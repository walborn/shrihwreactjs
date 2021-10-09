import cn from 'classnames'

import styles from './index.module.sass'

export default function Row({ className, children }) {
  return (
    <div class={cn(styles.row, className)}>
      {children}
    </div>
  )
}