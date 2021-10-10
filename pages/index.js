import React from 'react'
import Link from 'next/link'
import { Formik, Field, Form } from 'formik'
import cn from 'classnames'

import Row from '../components/row'
import Layout from '../components/layout'
import Button from '../components/button'
import Card from '../components/card'
import Modal from '../components/modal'
import FieldInput from '../components/fieldinput'
import mock from '../mock'

import Logo from '../images/logo.svg'
import Settings from '../images/settings.svg'
import Run from '../images/run.svg'

import styles from './index.module.sass'

const history = mock(1234).reverse()

function HomePage() {
  const [ limit, setLimit ] = React.useState(10)
  const [ modal, setModal ] = React.useState(false)
  if (Array.isArray(history)) return (
    <Layout>
      <Row className={styles.controls}>
        <Button className={styles.edit} >
          <Settings />
        </Button>
        <Button className={styles.run} onClick={() => setModal(true)}>
          <Run />
          Run build
        </Button>
      </Row>
      <Modal
        hidden={!modal}
        onClose={() => setModal(false)}
        className={styles.modal}
      >
        <div className={styles.header}>New build</div>
        <Formik
        initialValues={{ hash: '' }}
        validate={({ hash }) => hash ? {} : { hash: 'Required' } }
        onSubmit={(values, { resetForm, setSubmitting }) => {
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2))
            resetForm()
            setSubmitting(false)
            setModal(false)
          }, 1000)
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={styles.field}>
              <p>Enter the commit hash which you want to build.</p>
              <Field
                id="hash"
                name="hash"
                placeholder="Commit hash"
                component={FieldInput}
              />
            </div>
            <div className={styles.formcontrols}>
              <Button
                type="submit"
                yellow
                disabled={isSubmitting}
              >
                Run build
              </Button>
              <Button>
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      </Modal>
      {history.slice(0, limit).map(i => (
        <Card
          key={i.index} {...i}
          branch="master"
        />
      ))}
      <Button className={styles.showmore} onClick={() => setLimit(prev => prev + 10)}>Show more</Button>
    </Layout>
  )
  return (
    <Layout>
      <Row className={styles.settings}>
        <Button
          className={styles.settings}
        >
          <Settings />
          Settings
        </Button>
      </Row>
      <div className={styles.home}>
        <Logo className={styles.logo}/>
        <div className={styles.description}>Configure repository connection<br/>and synchronization settings</div>
        <Link className={styles.settings} href="/settings"><a><Button yellow>Open settings</Button></a></Link>
      </div>
    </Layout>
  )
}

export default HomePage