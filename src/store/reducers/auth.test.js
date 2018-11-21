import * as actionTypes from '../actions/actionTypes'
import reducer from './auth'

describe('auth reducer', () => {
  it('returns proper initial state', () => {
    expect(reducer(undefined, {})).toEqual({

      token: null,
      userId: null,
      error: null,
      loading: false
    })
  })

  it('applies AUTH_START', () => {
    expect(reducer({}, { type: actionTypes.AUTH_START })).toEqual({
      loading: false,
      error: null
    })
  })


  it('applies AUTH_FAIL', () => {
    const message = 'error'
    const error = {
      response: {
        data: { error: { message } }
      }
    }
    expect(reducer({}, { type: actionTypes.AUTH_FAIL, error })).toEqual({
      loading: false,
      error: message
    })
  })

  it('applies AUTH_SUCCESS', () => {
    const userId = '123'
    const token = '456'
    const authData = { localId: userId, idToken: token }
    expect(reducer({}, { type: actionTypes.AUTH_SUCCESS, authData })).toEqual({
      loading: false,
      error: null,
      userId,
      token
    })
  })

  it('applies AUTH_LOGOUT', () => {
    expect(reducer(undefined, { type: actionTypes.AUTH_LOGOUT })).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false
    })
  })
})
