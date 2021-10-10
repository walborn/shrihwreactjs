import React from 'react'
import { createPortal } from 'react-dom'

import styles from './index.module.sass'

const Portal = ({ children }) => {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)

    return () => setMounted(false)
  }, [])

  return mounted
    ? createPortal(children, 
      document.querySelector("#modalportal"))
    : null
}

export default function Modal({ className, children, hidden, onClose }) {
  return <Portal>
    <div hidden={hidden}>
      <div className={styles.backdrop} onClick={onClose}></div>
      <div className={styles.content}>
        <div className={className}>
          {children}
        </div>
      </div>
    </div>
  </Portal>
}