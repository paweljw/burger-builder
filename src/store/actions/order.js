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
          dispatch(purchaseBurgerSuccess(response.data.id, orderData))
        }
      }).catch(err => {
        dispatch(purchaseBurgerFail(err))
      })
  }
}