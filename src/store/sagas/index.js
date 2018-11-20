import { takeEvery, all } from 'redux-saga/effects'

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

import {
  purchaseBurgerSaga,
  fetchOrdersSaga
} from './order'

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_EXPIRE_TOKEN, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_INITIATE, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
  ])

}

export function* watchBurger() {
  yield takeEvery(actionTypes.INGREDIENTS_FETCH, initIngredientsSaga)
}

export function* watchOrder() {
  yield all([
    takeEvery(actionTypes.PURCHASE_BURGER_INIT, purchaseBurgerSaga),
    takeEvery(actionTypes.ORDERS_FETCH, fetchOrdersSaga)
  ])
}
