import * as actionTypes from '../actions/actionTypes'

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: false,
        error: null
      }
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error.response.data.error.message
      }
    case actionTypes.AUTH_SUCCESS:
      const userId = action.authData.localId
      const token = action.authData.idToken
      return {
        ...state,
        loading: false,
        error: null,
        userId,
        token
      }
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        loading: false,
        error: null,
        userId: null,
        token: null
      }
    default: return state
  }
}

export default reducer
