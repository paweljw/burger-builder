import { put } from 'redux-saga/effects'
import axios from '../../axios'

import * as actionCreators from '../actions'

export function* purchaseBurgerSaga({ orderData, token }) {
  try {
    const response = yield axios.post('/orders.json?auth=' + token, orderData)
    if (response && response.status === 200) {
      yield put(actionCreators.purchaseBurgerSuccess(response.data.name, orderData))
    }
  } catch (err) {
    yield put(actionCreators.purchaseBurgerFail(err))
  }
}

export function* fetchOrdersSaga({ token, userId }) {
  yield put(actionCreators.fetchOrdersStart())
  let orders = []
  const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'

  try {
    const response = yield axios.get('/orders.json' + queryParams)
    if (response && response.status === 200) {
      orders = Object.keys(response.data || {}).map(key => {
        return { ...response.data[key], id: key }
      })

      yield put(actionCreators.setOrders(orders))
    }
  } catch (err) {
    console.log(err)
  }
}
