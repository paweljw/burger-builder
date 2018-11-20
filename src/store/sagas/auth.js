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

export function* authCheckStateSaga() {
  const token = yield localStorage.getItem('token')

  if (!token) {
    yield put(actionCreators.logout())
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'))

    if (expirationDate < new Date()) {
      yield put(actionCreators.logout())
    } else {
      const userId = yield localStorage.getItem('userId')

      yield put(
        actionCreators.authSuccess({
          idToken: token,
          localId: userId,
        })
      )

      yield put(
        actionCreators.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      )
    }
  }
}
