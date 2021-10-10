import React from 'react'
import cn from 'classnames'

import Cancel from '../../images/cancel.svg'

import styles from './index.module.sass'

export default function Input({ className, withClear, ...props }) {
  // const [ value, setValue ] = React.useState(props.value)
  // const handleClear = () => {
  //   console.log(value)
  //   setValue('')
  // }
  // React.useEffect(() => {
  //   setValue(props.value)
  // }, [ props.value ])
  return (
    <div className={cn(styles.input, className)}>
      <input {...props} />
      {/* {withClear && <Cancel className={styles.clear} onClick={handleClear} />} */}
    </div>
  )
}

// const CustomInputComponent = ({
//   field, // { name, value, onChange, onBlur }
//   form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
//   ...props
// }) => (
//   <div>
//     <input type="text" {...field} {...props} />
//     {touched[field.name] &&
//       errors[field.name] && <div className="error">{errors[field.name]}</div>}
//   </div>
// );

// export default CustomInputComponent