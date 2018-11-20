import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  loadingOrders: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START: return updateObject(state, { loading: true })
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId
      }
      return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
      })
    case actionTypes.PURCHASE_BURGER_FAIL: return updateObject(state, { loading: false })
    case actionTypes.PURCHASE_BURGER_INIT: return updateObject(state, { purchased: false })
    case actionTypes.ORDERS_FETCH_START: return updateObject(state, { loadingOrders: true })
    case actionTypes.ORDERS_SET: return updateObject(state, { orders: action.orders, loadingOrders: false })
    default: return state
  }
}

export default reducer
