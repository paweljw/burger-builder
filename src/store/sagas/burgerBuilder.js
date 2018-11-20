import { put, call } from 'redux-saga/effects'

import axios from '../../axios'
import * as actionCreators from '../actions'

export function* initIngredientsSaga() {
  try {
    let ingredients = {}

    const response = yield call([axios, 'get'],
      process.env.REACT_APP_API_BASE + '/ingredients.json'
    )
    ingredients = yield response.data
    yield put(actionCreators.setIngredients(ingredients))
  } catch (error) {
    console.log(error)
  }
}
