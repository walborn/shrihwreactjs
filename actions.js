import * as types from './types'

export const updateSettings = (value) => (dispatch) => dispatch({
  type: types.UPDATE_SETTINGS,
  payload: value,
})

export const fetchHistory = {
  request: () => (dispatch) => dispatch({ type: types.FETCH_HISTORY_REQUEST }),
  success: (values) => (dispatch) => dispatch({ type: types.FETCH_HISTORY_SUCCESS, payload: values }),
  failure: () => (dispatch) => dispatch({ type: types.FETCH_HISTORY_FAILURE }),
}

export const updateHistoryLimit = (value) => (dispatch) => dispatch({
  type: types.UPDATE_HISTORY_LIMIT,
  payload: value,
})
