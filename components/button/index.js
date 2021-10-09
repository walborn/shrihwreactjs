import cn from 'classnames'

import styles from './index.module.sass'

export default function Button({ className, children, disabled, yellow, hidden }) {
  const theme = yellow ? styles.yellow : styles.gray
  return (
    <button hidden={hidden} className={cn(styles.button, className, disabled && styles.disabled, theme)}>
      {children}
    </button>
  )
}