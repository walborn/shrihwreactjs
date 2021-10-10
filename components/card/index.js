import cn from 'classnames'
// import { format, formatDistance } from 'date-fns'
// import { ru } from 'date-fns/locale/ru'


import Success from '../../images/success.svg'
import Failure from '../../images/failure.svg'
import Waiting from '../../images/waiting.svg'
import Branch from '../../images/branch.svg'
import Member from '../../images/member.svg'
import Calendar from '../../images/calendar.svg'
import Watch from '../../images/watch.svg'

import styles from './index.module.sass'

const State = ({ className, value }) => {
  if (value === 'success') return <Success className={className} />
  if (value === 'failure') return <Failure className={className} />
  if (value === 'waiting') return <Waiting className={className} />
  return null
}

export default function Card({ index, member, message, hash, branch, time, state }) {
  const color = {
    [styles.success]: state === 'success',
    [styles.failure]: state === 'failure',
    [styles.waiting]: state === 'waiting',
  }
  return (
    <div className={styles.card}>
      <State className={styles.state} value={state} />
      <div className={styles.first}>
        <div className={cn(styles.index, color)}>#{index}</div>
        <div className={styles.message}>{message}</div>
      </div>
      <div className={styles.second}>
        <div className={styles.branch}><Branch /> {branch}</div>
        <div className={styles.hash}>{hash}</div>
        <div className={styles.member}><Member /> {member}</div>
      </div>
      <div className={styles.calendar}><Calendar /> {`format(time, 'dd MMM, hh:mm')`}</div>
      <div className={styles.watch}><Watch /> {`formatDistance(new Date(), time, { locale: ru })`}</div>
    </div>
  )
}

