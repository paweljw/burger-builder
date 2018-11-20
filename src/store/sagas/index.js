import { takeEvery } from 'redux-saga/effects'

import * as actionTypes from '../actions/actionTypes'

import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga
} from './auth'

import {
  initIngredientsSaga
} from './burgerBuilder'

export function* watchAuth() {
  yield takeEvery(actionTypes.INITIATE_LOGOUT, logoutSaga)
  yield takeEvery(actionTypes.EXPIRE_TOKEN, checkAuthTimeoutSaga)
  yield takeEvery(actionTypes.AUTH_INITIATE, authUserSaga)
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
}

export function* watchBurger() {
  yield takeEvery(actionTypes.INIT_FETCH_INGREDIENTS, initIngredientsSaga)
}
