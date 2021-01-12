import React from 'react'
import ReactDOM from 'react-dom'
import './Theme/StyleSheet.scss'
import App from './App'
/* Redux */
import { Provider } from 'react-redux'
import { configureStore } from './Redux/store'

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
)
