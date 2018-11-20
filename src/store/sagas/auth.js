import { put, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import axios from 'axios'

import * as actionCreators from '../actions'

export function* logoutSaga(action) {
  yield call([localStorage, 'removeItem'], ['token'])
  yield call([localStorage, 'removeItem'], ['userId'])
  yield call([localStorage, 'removeItem'], ['expirationDate'])
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
    const response = yield call([axios, 'post'], url, { email, password, returnSecureToken: true })

    if (response && response.status === 200) {
      yield call([localStorage, 'setItem'], 'token', response.data.idToken)
      yield call([localStorage, 'setItem'], 'userId', response.data.localId)
      yield call([localStorage, 'setItem'],
        'expirationDate',
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
  const token = yield call([localStorage, 'getItem'], 'token')

  if (!token) {
    yield put(actionCreators.logout())
  } else {
    const storedExpiry = yield call([localStorage, 'getItem'], 'expirationDate')
    const expirationDate = new Date(storedExpiry)

    if (expirationDate < new Date()) {
      yield put(actionCreators.logout())
    } else {
      const userId = yield call([localStorage, 'getItem'], 'userId')

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
