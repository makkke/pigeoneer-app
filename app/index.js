import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import injectTapEventPlugin from 'react-tap-event-plugin'

import App from './App'
import { configureStore, history } from './store/configureStore'

import './app.global.css'

injectTapEventPlugin()

const store = configureStore()

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
