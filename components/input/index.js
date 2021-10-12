import React from 'react'
import cn from 'classnames'

import styles from './index.module.sass'

const Input = React.forwardRef(({ className, failure, ...props }, ref) => (
  <input ref={ref} className={cn(className, styles.input, {[styles.failure]: failure})} {...props} />
))

export default Input