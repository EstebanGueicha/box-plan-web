import { SET_DAY } from '../actionTypes'

export const setDay = (payload) => (dispatch) => {
  dispatch({
    type: SET_DAY,
    payload: payload
  })
}
