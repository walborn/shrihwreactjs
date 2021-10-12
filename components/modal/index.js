import React from 'react'
import { createPortal } from 'react-dom'

import styles from './index.module.sass'

const Portal = ({ children }) => {
  const [mounted, setMounted] = React.useState(false)
  
  React.useLayoutEffect(() => {
    // Get original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow;
    // Prevent scrolling on mount
    document.body.style.overflow = 'hidden'
    // Re-enable scrolling when component unmounts
    return () => (document.body.style.overflow = originalStyle)
  }, [])

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
  if (hidden) return null
  return <Portal>
    <>
      <div className={styles.backdrop} onClick={onClose}></div>
      <div className={styles.content}>
        <div className={className}>
          {children}
        </div>
      </div>
    </>
  </Portal>
}