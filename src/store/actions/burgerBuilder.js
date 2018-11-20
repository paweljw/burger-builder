import * as actionTypes from './actionTypes'

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
  return {
    type: actionTypes.INIT_FETCH_INGREDIENTS
  }
}
