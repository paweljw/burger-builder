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
