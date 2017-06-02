// @flow
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../__reducers'
import type { counterStateType } from '../__reducers/counter'

const history = createBrowserHistory()
const router = routerMiddleware(history)
const enhancer = applyMiddleware(thunk, router)

function configureStore(initialState?: counterStateType) {
  return createStore(rootReducer, initialState, enhancer)
}

export default { configureStore, history }
