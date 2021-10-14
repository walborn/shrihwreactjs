import { combineReducers } from 'redux'
import * as types from './types'

const sessionSettings = typeof window !== 'undefined' && sessionStorage?.getItem('settings')

const initialSettingsState = sessionSettings
  ? JSON.parse(sessionSettings)
  : {
    repository: '',
    command: 'npm ci && npm run build',
    branches: 'master |',
    synchronize: 10,
  }

const settingsReducer = (state = initialSettingsState, { type, payload }) => {
  switch (type) {
    case types.UPDATE_SETTINGS:
      return { ...state, ...payload }
    default:
      return state
  }
}

const initialHistoryState = {
  values: [],
  limit: 10,
  fetching: false,
}

const historyReducer = (state = initialHistoryState, { type, payload }) => {
  switch (type) {
    case types.FETCH_HISTORY_REQUEST:
      return {
        ...state,
        fetching: true,
      }
    case types.FETCH_HISTORY_SUCCESS:
      return {
        ...state,
        values: payload,
        fetching: false,
      }
    case types.FETCH_HISTORY_FAILURE:
      return {
        ...state,
        values: [],
        fetching: false,
      }
    case types.UPDATE_HISTORY_LIMIT:
      return {
        ...state,
        limit: payload,
        fetching: false,
      }
    default:
      return state
  }
}

export default combineReducers({
  settings: settingsReducer,
  history: historyReducer,
})
