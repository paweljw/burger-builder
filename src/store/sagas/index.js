import { takeEvery } from 'redux-saga/effects'

import * as actionTypes from '../actions/actionTypes'
import { logoutSaga, checkAuthTimeoutSaga } from './auth'

export function* watchAuth() {
  yield takeEvery(actionTypes.INITIATE_LOGOUT, logoutSaga)
  yield takeEvery(actionTypes.EXPIRE_TOKEN, checkAuthTimeoutSaga)
}