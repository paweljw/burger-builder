import * as actionTypes from './actionTypes'
import axios from 'axios'

const SIGNUP_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + process.env.REACT_APP_API_KEY
const SIGNIN_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + process.env.REACT_APP_API_KEY

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
}

export const auth = (email, password, signup) => {
  return dispatch => {
    dispatch(authStart())
    const url = signup ? SIGNUP_URL : SIGNIN_URL

    axios.post(url, { email, password, returnSecureToken: true })
      .then(response => {
        if (response && response.status === 200) {
          console.log(response.data)
          dispatch(authSuccess(response.data))
          dispatch(checkAuthTimeout(response.data.expiresIn))
        }
      })
      .catch(err => {
        console.log(err)
        dispatch(authFail(err))
      })
  }
}

export const logout = () => {
  return {
    type: actionTypes.LOGOUT
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime * 1000)
  }
}