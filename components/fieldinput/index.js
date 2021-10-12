import cn from 'classnames'

import Input from '../input'
import Cancel from '../../images/cancel.svg'

import styles from './index.module.sass'

const FieldInput = ({
  innerRef,
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  noClear,
  ...props
}) => {
  const handleClear = () => setFieldValue(field.name, '')
  const failure = touched[field.name] && errors[field.name]

  return (
    <div className={cn(styles.input, { [styles.failure]: failure })}>
      <Input
        ref={innerRef} 
        type="text"
        failure={failure}
        {...field}
        {...props}
      />
      <Cancel
        hidden={field.value === ''}
        className={styles.clear}
        onClick={handleClear}
      />
      <div
        hidden={!failure}
        className={styles.hint}
      >
        {errors[field.name]}
      </div>
    </div>
  )
}

export default FieldInput