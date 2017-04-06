import React from 'react'
import { render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import store from './store'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import App from './App'

injectTapEventPlugin()

const root = <Provider store={store}>
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
</Provider>

render(root, document.getElementById('root'))
