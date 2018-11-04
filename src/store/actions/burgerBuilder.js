import * as actionTypes from './actionTypes'
import axios from '../../axios'

export const addIngredient = (ing) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredient: ing
  }
}

export const removeIngredient = (ing) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredient: ing
  }
}

export const resetIngredients = () => {
  return {
    type: actionTypes.RESET_INGREDIENTS
  }
}

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients
  }
}

export const initIngredients = () => {
  return dispatch => {
    let ingredients = {}

    axios.get('https://burger-builder-9796a.firebaseio.com/ingredients.json')
      .then(response => {
        if (response && response.status === 200) {
          ingredients = response.data
          dispatch({
            type: actionTypes.SET_INGREDIENTS,
            ingredients
          })
        }
      })
  }
}