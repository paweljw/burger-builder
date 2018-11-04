import * as actionTypes from './actions'

const initialState = {
  ingredients: {
    bacon: 0,
    salad: 0,
    tomato: 0,
    meat: 0,
    cheese: 0
  },
  totalPrice: 4
}

const INGREDIENT_PRICES = {
  salad: 0.4,
  bacon: 0.7,
  meat: 1.3,
  cheese: 1.0,
  tomato: 0.3
}

const reducer = (state = initialState, action) => {
  let ingredients = { ...state.ingredients },
    count = ingredients[action.ingredient],
    totalPrice = state.totalPrice

  switch (action.type) {
    case actionTypes.RESET_INGREDIENTS:
      return { ...initialState }
    case actionTypes.ADD_INGREDIENT:
      count += 1
      ingredients[action.ingredient] = count
      totalPrice += INGREDIENT_PRICES[action.ingredient]
      return {
        ...state,
        ingredients,
        totalPrice
      }
    case actionTypes.REMOVE_INGREDIENT:
      ingredients = { ...state.ingredients }
      count -= 1

      if (count >= 0) {
        ingredients[action.ingredient] = count
        totalPrice = state.totalPrice - INGREDIENT_PRICES[action.ingredient]
      }

      return {
        ...state,
        ingredients,
        totalPrice
      }

    default:
      return state
  }

}

export default reducer