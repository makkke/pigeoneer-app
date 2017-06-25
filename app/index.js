import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import injectTapEventPlugin from 'react-tap-event-plugin'

import App from './App'
import { configureStore, history } from './store/configureStore'
import { loginSuccess, loadMe } from './auth/auth.module'

import './app.global.css'

injectTapEventPlugin()

const store = configureStore()

// Login if token exists in local storage
// TODO: refactor, move checks to reducer and utils
const token = localStorage.getItem('id_token')
if (token) {
  store.dispatch(loadMe())
}

render(
  <AppContainer>
    <App store={store} history={history} />
  </AppContainer>,
  document.getElementById('root'),
)

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextRoot = require('./App') // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root'),
    )
  })
}
