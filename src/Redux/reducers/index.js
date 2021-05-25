import { combineReducers } from 'redux'
import user from './user'
import days from './days'

const reducers = combineReducers({
  user,
  days,
})

export default reducers
