import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Field, Form } from 'formik'
import { useIMask } from 'react-imask'
import cn from 'classnames'

import { updateSettings } from '../../actions'

import Layout from '../../components/layout'
import Button from '../../components/button'
import Row from '../../components/row'

import FieldInput from '../../components/fieldinput'

import styles from './index.module.sass'


export default function Settings() {
  const router = useRouter()
  const dispatch = useDispatch()
  const settings = useSelector((state) => state.settings)

  const { ref } = useIMask({ mask: Number });
  return (
    <Layout>
      <Row>
      <div className={styles.home}><Link href="/"><a>School CI server</a></Link></div>
      <header className={styles.header}>Settings</header>
      <div className={styles.description}>Configure repository connection and synchronization settings.</div>
      <Formik
        initialValues={settings}
        validate={values => {
          const errors = {}
          if (!values.repository) errors.repository = 'Required'
          else if (!/^[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+$/i.test(values.repository)) errors.repository = 'Invalid github repository name'
          
          if (!values.command) errors.command = 'Required'

          return errors
        }}

        onSubmit={(values, { resetForm, setSubmitting }) => {
          setTimeout(() => {
            resetForm()
            setSubmitting(false)
            sessionStorage.setItem('settings', JSON.stringify(values))
            dispatch(updateSettings(values))
            router.push('/')
          }, 1000)
        }}
      >
        {({ isSubmitting }) => (
          <Form
            className={styles.form}
          >
            <div className={styles.field}>
              <label
                className={cn(styles.label, styles.required)}
                htmlFor="repository"
              >
                GitHub repository
              </label>
              <Field
                id="repository"
                name="repository"
                placeholder="user-name/repo-name"
                component={FieldInput}
              />
            </div>
            <div className={styles.field}>
              <label 
                className={cn(styles.label, styles.required)}
                htmlFor="command"
              >
                Build command
              </label>
              <Field
                id="command"
                name="command"
                placeholder="npm ci && npm run build"
                component={FieldInput}
                />
            </div>
            <div className={styles.field}>
              <label
                className={styles.label}
                htmlFor="branches"
              >
                Main branch
              </label>
              <Field
                id="branches"
                name="branches"
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
                    <input
                      ref={ref}
                      className={styles.minutes}
                      placeholder="10"
                      {...field}
                    />
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
              <Link href="/">
                <Button>
                  Cancel
                </Button>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
      </Row>
    </Layout>
  )
}