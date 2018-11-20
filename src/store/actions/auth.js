import * as actionTypes from './actionTypes'

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
  return {
    type: actionTypes.AUTH_INITIATE,
    email,
    password,
    signup
  }
}

export const logout = () => {
  return {
    type: actionTypes.INITIATE_LOGOUT
  }
}

export const completeLogout = () => {
  return {
    type: actionTypes.LOGOUT
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return {
    type: actionTypes.EXPIRE_TOKEN,
    expirationTime
  }
}

export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE
  }
}
