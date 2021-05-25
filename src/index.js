import React from 'react'
import ReactDOM from 'react-dom'
import './Theme/StyleSheet.scss'
import App from './App'
/* Redux */
import { Provider } from 'react-redux'
import { configureStore } from './Redux/store'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#175CA7',
      contrastText: '#000000',
    },
    secondary: {
      main: '#F48636',
      contrastText: '#ffffff',
    },
  },
})

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={configureStore()}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root'),
)
