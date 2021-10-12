import React from 'react'
import Link from 'next/link'
import { Formik, Field, Form } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import Skeleton from 'react-loading-skeleton'

import Row from '../components/row'
import Layout from '../components/layout'
import Button from '../components/button'
import Card from '../components/card'
import Modal from '../components/modal'
import FieldInput from '../components/fieldinput'

import Logo from '../images/logo.svg'
import Settings from '../images/settings.svg'
import Run from '../images/run.svg'

import { fetchHistory, updateHistoryLimit } from '../actions'

import styles from './index.module.sass'


function IndexPage() {
  const dispatch = useDispatch()
  const settings = useSelector((state) => state.settings)
  const history = useSelector((state) => state.history)

  const [ modal, setModal ] = React.useState(false)
  
  // const hashRef = React.useRef(null)
  // React.useEffect(() => {
  //   if (modal) console.log(hashRef.current)
  // }, [ modal ])

  React.useEffect(() => {
    const close = (e) => e.keyCode === 27 && setModal(false)
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  React.useEffect(() => {
    if (!settings.repository) return
    dispatch(fetchHistory.request())
    
    // fetch(`https://api.github.com/repos/${settings.repository}/commits`)
    //   .then(res => res.json())
    //   .then(res => res.map(({ sha, commit }) => ({ sha, ...commit.author })))
    //   .then(console.log)

    fetch(`/api/history?repository=${settings.repository}&branches=${settings.branches}`)
      .then(res => res.json())
      .then(res => dispatch(fetchHistory.success(res)))
      .catch(() => dispatch(fetchHistory.failure()))
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
              // validate={({ hash }) => hash ? {} : { hash: 'Required' } }
              onSubmit={(values, { resetForm, setSubmitting }) => {
                setTimeout(() => {
                  resetForm()
                  setSubmitting(false)
                  setModal(false)
                }, 1000)
              }}
            >
              {({ isSubmitting, resetForm, dirty }) => (
                <Form>
                  <div className={styles.field}>
                    <p>Enter the commit hash which you want to build.</p>
                    <Field
                      id="hash"
                      name="hash"
                      placeholder="Commit hash"
                      // inputRef={hashRef}
                      component={FieldInput}
                    />
                  </div>
                  <div className={styles.formcontrols}>
                    <Button
                      type="submit"
                      yellow
                      disabled={isSubmitting || !dirty}
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
          {
            history.fetching
            ? (
              <Row>
                <Skeleton
                  className={styles.card}
                  count={10}
                  height={65}
                />
              </Row>)
            : (
              <Row>
                {history.values.slice(0, history.limit).map(i => (
                  <Card className={styles.card} key={i.hash} {...i} />
                ))}
                <Button className={styles.showmore} onClick={() => dispatch(updateHistoryLimit(history.limit + 10))}>Show more</Button>
              </Row>
            )
          }
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
