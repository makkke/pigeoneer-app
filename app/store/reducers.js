// @flow
import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import auth from '../auth/auth.module'

const rootReducer = combineReducers({
  auth,
  router,
})

export default rootReducer
