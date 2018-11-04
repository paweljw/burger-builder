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

export const purchaseBurger = (orderData) => {
  return dispatch => {
    axios.post('/orders.json', orderData)
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

export const initOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart())
    let orders = []

    axios.get('https://burger-builder-9796a.firebaseio.com/orders.json')
      .then(response => {
        if (response && response.status === 200) {
          orders = Object.keys(response.data).map(key => {
            return { ...response.data[key], id: key }
          })

          dispatch(setOrders(orders))
        }
      })
  }
}