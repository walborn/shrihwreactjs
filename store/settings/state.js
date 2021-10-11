const settingsStorage = typeof window !== 'undefined' && sessionStorage?.getItem('settings')

export const initialState = {
  settings: settingsStorage
    ? JSON.parse(settingsStorage)
    : {
        repository: '',
        command: 'npm ci && npm run build',
        branches: 'master |',
        synchronize: 10,
      },
  history: {
    values: [],
    limit: 10,
  },
}