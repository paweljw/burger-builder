import * as actionTypes from './actionTypes'

export const addIngredient = (ing) => {
  return {
    type: actionTypes.INGREDIENTS_ADD,
    ingredient: ing
  }
}

export const removeIngredient = (ing) => {
  return {
    type: actionTypes.INGREDIENTS_REMOVE,
    ingredient: ing
  }
}

export const resetIngredients = () => {
  return {
    type: actionTypes.INGREDIENTS_RESET
  }
}

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.INGREDIENTS_SET,
    ingredients
  }
}

export const initIngredients = () => {
  return {
    type: actionTypes.INGREDIENTS_FETCH
  }
}
