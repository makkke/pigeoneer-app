import * as auth from '../utils/auth'

// ------------------------------------
// Constants
// ------------------------------------
const USER_LOGIN = 'USER_LOGIN'
const USER_LOGOUT = 'USER_LOGOUT'
// ------------------------------------
// Actions
// ------------------------------------

const userLogin = (name) => ({
  type: USER_LOGIN,
  name,
})

const userLogout = () => ({
  type: USER_LOGOUT,
})

export const login = (email, password) => (async (dispatch) => {
  auth.login(email, password)
  return dispatch(userLogin(email))
})

export const signup = (email, password) => (async () => (
  auth.signup(email, password)
))

export const logout = () => (async (dispatch) => {
  auth.logout()
  return dispatch(userLogout())
})

export const actions = {
  // load,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [USER_LOGIN]: (state, { name }) => ({
    name,
  }),
  [USER_LOGOUT]: () => ({
    name: '',
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  name: '',
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
