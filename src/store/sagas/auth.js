import { put } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import axios from 'axios'

import * as actionCreators from '../actions'

export function* logoutSaga(action) {
  yield localStorage.removeItem('token')
  yield localStorage.removeItem('userId')
  yield localStorage.removeItem('expirationDate')
  yield put(actionCreators.completeLogout())
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000)
  yield put(actionCreators.logout())
}

export function* authUserSaga({ email, password, signup }) {
  const signupUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + process.env.REACT_APP_API_KEY
  const signinUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + process.env.REACT_APP_API_KEY

  yield put(actionCreators.authStart())
  const url = signup ? signupUrl : signinUrl

  try {
    const response = yield axios.post(url, { email, password, returnSecureToken: true })

    if (response && response.status === 200) {
      yield localStorage.setItem('token', response.data.idToken)
      yield localStorage.setItem('userId', response.data.localId)
      yield localStorage.setItem('expirationDate',
        new Date(new Date().getTime() + (response.data.expiresIn * 1000))
      )

      yield put(actionCreators.authSuccess(response.data))
      yield put(actionCreators.checkAuthTimeout(response.data.expiresIn))
    }
  } catch (err) {
    yield put(actionCreators.authFail(err))
  }
}
