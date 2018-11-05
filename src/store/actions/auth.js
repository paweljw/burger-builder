import * as actionTypes from './actionTypes'
import axios from 'axios'

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
  const signupUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + process.env.REACT_APP_API_KEY
  const signinUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + process.env.REACT_APP_API_KEY

  return dispatch => {
    dispatch(authStart())
    const url = signup ? signupUrl : signinUrl

    axios.post(url, { email, password, returnSecureToken: true })
      .then(response => {
        if (response && response.status === 200) {
          localStorage.setItem('token', response.data.idToken)
          localStorage.setItem('userId', response.data.localId)
          localStorage.setItem('expirationDate',
            new Date(new Date().getTime() + (response.data.expiresIn * 1000))
          )
          dispatch(authSuccess(response.data))
          dispatch(checkAuthTimeout(response.data.expiresIn))
        }
      })
      .catch(err => {
        dispatch(authFail(err))
      })
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
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

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token')

    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate < new Date()) {
        dispatch(logout())
      } else {
        const userId = localStorage.getItem('userId')
        dispatch(authSuccess(
          {
            idToken: token,
            localId: userId,
          }
        ))
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}