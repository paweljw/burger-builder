import * as actionTypes from '../actions/actionTypes'
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
    case actionTypes.INGREDIENTS_SET:
      return {
        ...state,
        ingredients: action.ingredients
      }
    case actionTypes.INGREDIENTS_RESET: return resetIngredients(state)
    case actionTypes.INGREDIENTS_ADD: return adjustIngredientCount(state, action.ingredient, 1)
    case actionTypes.INGREDIENTS_REMOVE: return adjustIngredientCount(state, action.ingredient, -1)
    default: return state
  }

}

export default reducer
