import * as actionTypes from '../actions/actionTypes'
import { Object } from 'core-js';
import { updateObject } from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 4
}

const INGREDIENT_PRICES = {
  salad: 0.4,
  bacon: 0.7,
  meat: 1.3,
  cheese: 1.0,
  tomato: 0.3
}

const resetIngredients = state => {
  const ingredients = { ...state.ingredients }
  Object.keys(ingredients).forEach(key => ingredients[key] = 0)

  return updateObject(state, { ingredients, totalPrice: initialState.totalPrice })
}

const adjustIngredientCount = (state, ingredient, by) => {
  const ingredients = { ...state.ingredients }
  const count = ingredients[ingredient] + by
  const totalPrice = state.totalPrice + (INGREDIENT_PRICES[ingredient] * by)

  if (count < 0) {
    return { ...state }
  }

  ingredients[ingredient] = count

  return {
    ...state,
    ingredients,
    totalPrice
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients
      }
    case actionTypes.RESET_INGREDIENTS: return resetIngredients(state)
    case actionTypes.ADD_INGREDIENT: return adjustIngredientCount(state, action.ingredient, 1)
    case actionTypes.REMOVE_INGREDIENT: return adjustIngredientCount(state, action.ingredient, -1)
    default: return state
  }

}

export default reducer