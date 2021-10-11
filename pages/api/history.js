const members = [ 'Dan Abramov', 'Richard Feynman', 'Nikola Tesla', 'Albert Einstain' ]
const messages = [
  'add documentation for postgres scaler',
  'Super cool UI kit for making websites that look like games',
  'improved accessibility',
  'Form item has default height align with form size',
  'upgrade typescript to 3.8',
  'replace all `div` to `article`',
]
const states = [ 'success', 'success', 'success', 'failure', 'failure', 'waiting' ]

const random = (list) => list[Math.random() * list.length | 0]

let t = Date.now()

function history(n, branches) {
  return Array.from({ length: n }, (_, index) => {
    const member = random(members)
    const message = random(messages)
    const state = random(states)
    const branch = random(branches)
    const hash = (Math.random() * 16777216 | 0).toString(16)
    const time = new Date(t -= Math.random() * 1000000 | 0)
    return { index: n - index, member, message, state, hash, time, branch }
  })
}

const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms))

export default function fetchHistory(req, res) {
  const branches = req.query.branches.split('|').map(i => i.trim()).filter(Boolean)
  delay(1000).then(() => res.status(200).json(history(123, branches)))
}
