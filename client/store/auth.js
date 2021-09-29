import axios from 'axios'
import history from '../history'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';
const GET_USER = 'GET_USER';

/**
 * ACTION CREATORS
 */
const setAuth = auth => ({type: SET_AUTH, auth})
const getUser = (user) => ({type: GET_USER, user })

/**
 * THUNK CREATORS
 */

export const fetchUser = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token
      }
    })
    console.log('I am fetchUser', res.data)
    return dispatch(getUser(res.data))
  }
}

export const me = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token
      }
    })
    return dispatch(setAuth(res.data))
  }
}

export const authenticate = (username, password, method) => async dispatch => {
  try {
    const res = await axios.post(`/auth/${method}`, {username, password})
    window.localStorage.setItem(TOKEN, res.data.token)
    dispatch(me())
  } catch (authError) {
    return dispatch(setAuth({error: authError}))
  }
}

export const logout = () => {
  window.localStorage.removeItem(TOKEN)
  history.push('/login')
  return {
    type: SET_AUTH,
    auth: {}
  }
}

export const signupUser = (username, password, email, firstName, lastName, method) => async dispatch => {
  try {
    const res = await axios.post(`/auth/${method}`, {username, password, email, firstName, lastName})
    window.localStorage.setItem(TOKEN, res.data.token)
    dispatch(me())
  } catch (error) {
    return dispatch(setAuth({error: error}))
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    case GET_USER:
      return action.user
    default:
      return state
  }
}
