import { put } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { completeLogout, logout } from '../actions'

export function* logoutSaga(action) {
  yield localStorage.removeItem('token')
  yield localStorage.removeItem('userId')
  yield localStorage.removeItem('expirationDate')
  yield put(completeLogout())
}

export function* checkAuthTimeoutSaga(action) {
  yield console.log(action)
  yield delay(action.expirationTime * 1000)
  yield put(logout())
}
