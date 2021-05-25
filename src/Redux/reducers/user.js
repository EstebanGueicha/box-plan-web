import { SET_USER, CLEAR_USER } from '../actionTypes'

const defaultState = {
  role: {},
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload,
      }
    case CLEAR_USER:
      return {
        ...defaultState,
      }
    default:
      return state
  }
}
