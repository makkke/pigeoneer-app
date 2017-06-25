import Auth0 from 'auth0-js'
import decode from 'jwt-decode'

export const getTokenExpirationDate = (token) => {
  const decoded = decode(token)
  if (!decoded.exp) {
    return null
  }

  const date = new Date(0) // The 0 here is the key, which sets the date to the epoch
  date.setUTCSeconds(decoded.exp)

  return date
}

export const isTokenExpired = (token) => {
  const date = getTokenExpirationDate(token)
  if (date === null) {
    return false
  }

  return !(date.valueOf() > new Date().valueOf())
}

/**
 * Retrieves the user token from localStorage
 * @return {[type]} [description]
 */
export const getToken = () => localStorage.getItem('id_token')

/**
 * Retrieves the user access token from localStorage
 * @return {[type]} [description]
 */
export const getAccessToken = () => localStorage.getItem('access_token')

/**
 * Checks if there is a saved token and it's still valid
 * @return {[type]} [description]
 */
export const isLoggedIn = () => {
  const token = getToken()

  return !!token && !isTokenExpired(token)
}

const createAuth0 = () => (
  new Auth0.WebAuth({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    // redirectUri: 'https://pinaple-test.auth0.com/mobile',
    // redirectUri: location.href,
    responseType: 'token',
  })
)

/**
 * Saves user access token and ID token into local storage
 * @type {[type]}
 */
const setToken = (accessToken, idToken) => {
  localStorage.setItem('access_token', accessToken)
  localStorage.setItem('id_token', idToken)
}

export const parseHash = (hash) => {
  const auth0 = createAuth0()
  auth0.parseHash({ hash }, (err, result) => {
    if (result && result.accessToken && result.idToken) {
      setToken(result.accessToken, result.idToken)
    } else if (result && result.error) {
      console.error(new Error(result.error)) // eslint-disable-line
    }
  })
}

/**
 * Clears user token and profile data from localStorage
 * @return {[type]} [description]
 */
export const logout = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('id_token')
}

export const login = (username, password) => (
  new Promise((resolve, reject) => {
    const auth0 = createAuth0()
    auth0.client.login({
      realm: 'Username-Password-Authentication',
      username,
      password,
    }, (err, result) => {
      if (err) {
        reject(err.description)
      }

      setToken(result.accessToken, result.idToken)
      resolve()
    })
  })
)

export const me = () => (
  new Promise((resolve, reject) => {
    const auth0 = createAuth0()
    const token = getAccessToken()
    auth0.client.userInfo(token, (err, user) => {
      if (err) {
        reject(err.description)
        return
      }
      resolve(user)
    })
  })
)

export const signup = (email, password) => {
  const auth0 = createAuth0()
  auth0.signup({
    connection: 'Username-Password-Authentication',
    email,
    password,
  }, (err) => {
    if (err) {
      console.error(new Error(err.description)) // eslint-disable-line
    }
    console.log('signed up')
  })
}

export const loginWithGoogle = () => {
  const auth0 = createAuth0()
  auth0.authorize({ connection: 'google-oauth2' })

  setTimeout(() => {
    auth0.parseHash((err, data) => {
      console.log(err, data)
      console.log(window.href)
      console.log(window.location)
    })
  }, 2000)
}

export const loginWithGithub = () => {
  const auth0 = createAuth0()
  auth0.authorize({ connection: 'github' })

  setTimeout(() => {
    auth0.parseHash((err, data) => {
      console.log(err, data)
      console.log(window.href)
      console.log(window.location)
    })
  }, 2000)
}

export default {}
