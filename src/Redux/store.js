import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose

const middlewares = [thunk]

export function configureStore (initialState) {
  const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(...middlewares)))

  return store
}
