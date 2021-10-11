import cn from 'classnames'

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


const format = date => {
  const month = new Intl.DateTimeFormat('ru', { month: 'short' }).format(date).slice(0, -1)
  const day = new Intl.DateTimeFormat('ru', { day: 'numeric' }).format(date)
  const hours = new Intl.DateTimeFormat('ru', { hour: 'numeric' }).format(date)
  const minutes = new Intl.DateTimeFormat('ru', { minute: 'numeric' }).format(date)
  return `${day} ${month}, ${hours}:${minutes}`
}

const distance = date => {
  const dt = (Date.now() - date.getTime()) / 1000 | 0
  if (dt < 60) return `${dt} сек`
  if (dt < 3600) return `${dt / 60 | 0} мин`
  if (dt < 86400) return `${dt / 3600 | 0} ч ${(dt % 3600) / 60 | 0} мин`
  return `${dt / 86400 | 0} д`

} 

export default function Card({ className, index, member, message, hash, branch, time, state, onClick }) {
  const color = {
    [styles.success]: state === 'success',
    [styles.failure]: state === 'failure',
    [styles.waiting]: state === 'waiting',
  }
  return (
    <div className={cn(className, styles.card)} onClick={onClick}>
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
      <div className={styles.calendar}><Calendar /> {format(new Date(time))}</div>
      <div className={styles.watch}><Watch />{distance(new Date(time))}</div>
    </div>
  )
}

