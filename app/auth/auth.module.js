import * as auth from '../utils/auth'

// ------------------------------------
// Constants
// ------------------------------------
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
// const LOGIN_FAILURE = 'LOGIN_FAILURE'

const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

const LOAD_ME_SUCCESS = 'LOAD_ME_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  user,
})

export const login = (email, password) => (async (dispatch) => {
  // TODO: add proper error handling
  try {
    await auth.login(email, password)
    const user = await auth.me()

    return dispatch(loginSuccess(user))
  } catch (err) {
    console.log(err)
  }
})

export const signup = (email, password) => (async () => (
  auth.signup(email, password)
))

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
})

export const logout = () => (async (dispatch) => {
  auth.logout()

  return dispatch(logoutSuccess())
})

export const loadMeSuccess = (user) => ({
  type: LOAD_ME_SUCCESS,
  user,
})

export const loadMe = () => (async (dispatch) => {
  // TODO: add proper error handling
  try {
    const user = await auth.me()

    return dispatch(loginSuccess(user))
  } catch (err) {
    console.log(err)
  }
})

export const actions = {
  // load,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN_SUCCESS]: (state, { user }) => ({
    ...state,
    user,
  }),
  [LOGOUT_SUCCESS]: (state) => ({
    ...state,
    user: {},
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  user: {},
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
