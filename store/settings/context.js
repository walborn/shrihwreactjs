import React from 'react'
import { reducer } from './reducer'
import { initialState } from './state'

export const SettingsContext = React.createContext()

export function SettingsProvider(props) {
  const { children } = props

  const [ state, dispatch] = React.useReducer(reducer, initialState)

  return (
    <SettingsContext.Provider value={[ state, dispatch ]}>
      {children}
    </SettingsContext.Provider>
  )
}
