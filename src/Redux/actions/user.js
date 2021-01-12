import { SET_USER, CLEAR_USER } from '../actionTypes'

export const setUserData = (payload) => (dispatch) => {
  dispatch({
    type: SET_USER,
    payload: payload
  })
}

export const clearUser = () => (dispatch) => {
  dispatch({
    type: CLEAR_USER
  })
}
