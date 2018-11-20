import * as actionTypes from './actionTypes'

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    id,
    orderData
  }
}

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

export const purchaseBurger = (orderData, token) => {
  return {
    type: actionTypes.PURCHASE_BURGER_INIT,
    orderData,
    token
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_COMMIT
  }
}

export const setOrders = (orders) => {
  return {
    type: actionTypes.ORDERS_SET,
    orders
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.ORDERS_FETCH_START
  }
}

export const initOrders = (token, userId) => {
  return {
    type: actionTypes.ORDERS_FETCH,
    token,
    userId
  }
}
