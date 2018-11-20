import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

import burgerReducer from './reducers/burgerBuilder'
import orderReducer from './reducers/order'
import authReducer from './reducers/auth'

import {
  watchAuth,
  watchBurger,
  watchOrder
} from './sagas'

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
  burger: burgerReducer,
  order: orderReducer,
  auth: authReducer
})

let middleware = applyMiddleware(sagaMiddleware)

if (process.env.NODE_ENV === 'development') {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  middleware = composeEnhancers(middleware)
}

const store = createStore(rootReducer, middleware)

sagaMiddleware.run(watchAuth)
sagaMiddleware.run(watchBurger)
sagaMiddleware.run(watchOrder)

export default store
