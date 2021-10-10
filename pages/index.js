import React from 'react'
import Link from 'next/link'
import { Formik, Field, Form } from 'formik'

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


function HomePage() {
  const [ limit, setLimit ] = React.useState(10)
  const [ modal, setModal ] = React.useState(false)
  const repository = typeof window !== 'undefined' && localStorage.getItem('repository')
  const branches = typeof window !== 'undefined' && localStorage.getItem('branches') || 'master'
  
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [])

  const history = React.useMemo(() => repository && mock(1234, branches.split('|').map(i => i.trim())), [ branches, repository ])

  return (
    <Layout>
      {
        Array.isArray(history)
        ? (
          <>
          <Row>
            <Row className={styles.repository}>{repository}</Row>
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
            {history.slice(0, limit).map(i => (
              <Card className={styles.card} key={i.hash} {...i} />
            ))}
            <Button className={styles.showmore} onClick={() => setLimit(prev => prev + 10)}>Show more</Button>
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

export default HomePage