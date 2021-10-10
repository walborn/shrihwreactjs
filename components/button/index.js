import cn from 'classnames'

import styles from './index.module.sass'

export default function Button({ className, children, disabled, yellow, ...props }) {
  const theme = yellow ? styles.yellow : styles.gray
  return (
    <button
      className={cn(styles.button, className, disabled && styles.disabled, theme)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}