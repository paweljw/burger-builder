import * as actionTypes from './actionTypes'
import axios from '../../axios'

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
  return dispatch => {
    axios.post('/orders.json?auth=' + token, orderData)
      .then(response => {
        if (response && response.status === 200) {
          dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        }
      }).catch(err => {
        dispatch(purchaseBurgerFail(err))
      })
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}

export const setOrders = (orders) => {
  return {
    type: actionTypes.SET_ORDERS,
    orders
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}

export const initOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart())
    let orders = []

    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'

    axios.get('/orders.json' + queryParams)
      .then(response => {
        if (response && response.status === 200) {
          orders = Object.keys(response.data || {}).map(key => {
            return { ...response.data[key], id: key }
          })

          dispatch(setOrders(orders))
        }
      })
  }
}