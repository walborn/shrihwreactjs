import React from 'react'
import Link from 'next/link'
import { Formik, Field, Form } from 'formik'

import { SettingsContext } from '../store/settings/context'
import mock from '../mock'

import Row from '../components/row'
import Layout from '../components/layout'
import Button from '../components/button'
import Card from '../components/card'
import Modal from '../components/modal'
import FieldInput from '../components/fieldinput'

import Logo from '../images/logo.svg'
import Settings from '../images/settings.svg'
import Run from '../images/run.svg'

import styles from './index.module.sass'


function IndexPage() {
  const [ { settings, history }, dispatch ] = React.useContext(SettingsContext)
  const [ modal, setModal ] = React.useState(false)
  
  React.useEffect(() => {
    if (settings.branches) {
      const payload = mock(Math.random() * 1000 | 0, settings.branches.split('|').map(i => i.trim()))
      dispatch({ type: 'fetch', payload })
    }
  }, [ settings.repository, settings.branches ])
 

  return (
    <Layout>
      {
        Array.isArray(history?.values)
        ? (
          <>
          <Row>
            <Row className={styles.repository}>{settings.repository}</Row>
            <div  className={styles.controls}>
              <Link href="/settings">
                <a className={styles.edit}><Button><Settings />Settings</Button></a>
              </Link>
              <Button className={styles.run} onClick={() => setModal(true)}>
                <Run />
                Run build
              </Button>
            </div>
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
                resetForm()
                setSubmitting(false)
                setModal(false)
              }, 1000)
            }}
          >
            {({ isSubmitting, resetForm }) => (
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
                  <Button type="reset" onClick={() => {
                    resetForm()
                    setModal(false)
                  }}>
                    Cancel
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
          </Modal>
          <Row>
            {history.values.slice(0, history.limit).map(i => (
              <Card className={styles.card} key={i.hash} {...i} />
            ))}
            <Button className={styles.showmore} onClick={() => dispatch({ type: 'limit', payload: history.limit + 10 })}>Show more</Button>
          </Row>
        </>
        ) : (
        <>
          <Row>
            <div className={styles.home}><Link href="/"><a>School CI server</a></Link></div>
            <Link href="/settings">
              <a className={styles.settings}><Button><Settings />Settings</Button></a>
            </Link>
          </Row>
          <div className={styles.content}>
            <Logo className={styles.logo}/>
            <div className={styles.description}>Configure repository connection<br/>and synchronization settings</div>
            <Link className={styles.settings} href="/settings"><a><Button yellow>Open settings</Button></a></Link>
          </div>
        </>
        )}
    </Layout>
  )
}

export default IndexPage
