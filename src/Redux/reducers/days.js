import { SET_DAY, CLEAR_USER } from '../actionTypes'

const defaultState = [
  { id: 0, description: 'Lunes', numberDay: 0 },
  { id: 1, description: 'Martes', numberDay: 0 },
  { id: 2, description: 'Miércoles', numberDay: 0 },
  { id: 3, description: 'Jueves', numberDay: 0 },
  { id: 4, description: 'Viernes', numberDay: 0 },
  { id: 5, description: 'Sábado', numberDay: 0 },
  { id: 6, description: 'Domingo', numberDay: 0 }
]

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_DAY:
      return state.map(days => {
        if (days.id === action.payload.id) {
          return { ...days, numberDay: days.numberDay }
        };
        return days
      })
    case CLEAR_USER:
      return {
        ...defaultState
      }
    default:
      return state
  }
}
