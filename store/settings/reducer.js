export const reducer = (state, action) => {
  switch (action.type) {
    case 'update':
      return { ...state, settings: action.payload }
    case 'fetch':
      return { ...state, history: { ...state.history, values: action.payload } }
    case 'limit':
      return { ...state, history: { ...state.history, limit: action.payload } }
    default:
      return state
  }
}
