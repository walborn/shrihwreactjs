import Cancel from '../../images/cancel.svg'

import styles from './index.module.sass'

const FieldInput = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const handleClear = () => {
    setFieldValue(field.name, '')
  }
  return (
    <>
      <div className={styles.input}>
        <input type="text" {...field} {...props} />
        {field.value && <Cancel
          className={styles.clear}
          onClick={handleClear}
        />}
      </div>
      {touched[field.name] && errors[field.name] && <div className={styles.error}>{errors[field.name]}</div>}
    </>
  )
}

export default FieldInput