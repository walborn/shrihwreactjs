import { Formik, Field, Form } from 'formik'
import cn from 'classnames'

import Layout from "../../components/layout"
import Button from '../../components/button'
// import Cancel from '../../images/cancel.svg'

import FieldInput from '../../components/fieldinput'

import styles from './index.module.sass'



// const FieldInput = ({
//   field, // { name, value, onChange, onBlur }
//   form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
//   ...props
// }) => {
//   const handleClear = () => {
//     setFieldValue(field.name, '')
//   }
//   return (
//     <>
//       <div className={styles.input}>
//         <input type="text" {...field} {...props} />
//         {field.value && <Cancel
//           className={styles.clear}
//           onClick={handleClear}
//         />}
//       </div>
//       {touched[field.name] && errors[field.name] && <div className={styles.error}>{errors[field.name]}</div>}
//     </>
//   )
// }

export default function Settings() {
  return (
    <Layout>
      <header className={styles.header}>Settings</header>
      <div className={styles.description}>Configure repository connection and synchronization settings.</div>
      <Formik
        initialValues={{
          githubrepository: '',
          buildcommand: '',
          mainbrunch: '',
          synchronize: 10,
        }}
        validate={values => {
          const errors = {};
          if (!values.githubrepository) {
            errors.githubrepository = 'Required';
          } else if (
            !/^[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+$/i.test(values.githubrepository)
          ) {
            errors.githubrepository = 'Invalid github repo name';
          }
          if (!values.buildcommand) {
            errors.buildcommand = 'Required';
          }
          return errors;
        }}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2))
            resetForm()
            setSubmitting(false)
          }, 1000);
        }}
      >
        {({ isSubmitting }) => (
          <Form
            className={styles.form}
          >
            <div className={styles.field}>
              <label
                className={cn(styles.label, styles.required)}
                htmlFor="githubrepository"
              >
                GitHub repository
              </label>
              <Field
                id="githubrepository"
                name="githubrepository"
                placeholder="user-name/repo-name"
                component={FieldInput}
              />
            </div>
            <div className={styles.field}>
              <label 
                className={cn(styles.label, styles.required)}
                htmlFor="buildcommand"
              >
                Build command
              </label>
              <Field
                id="buildcommand"
                name="buildcommand"
                placeholder="npm ci && npm run build"
                component={FieldInput}
                />
            </div>
            <div className={styles.field}>
              <label
                className={styles.label}
                htmlFor="mainbrunch"
              >
                Main branch
              </label>
              <Field
                id="mainbrunch"
                name="mainbrunch"
                placeholder="master |"
                component={FieldInput}
              />
            </div>
            <div className={styles.field}>
              <label
                className={styles.label}
                htmlFor="synchronize"
              >
                Synchronize every
                <Field
                  id="synchronize"
                  name="synchronize"
                  placeholder="10"
                >
                  {({ field }) => (
                    <input type="text" className={styles.minutes} placeholder="10" {...field} />
                  )}
                </Field>
                minutes
              </label>
            </div>
            <div className={styles.controls}>
              <Button
                type="submit"
                yellow
                disabled={isSubmitting}
              >
                Save
              </Button>
              <Button>
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}