import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import burgerReducer from './reducers/burgerBuilder'
import orderReducer from './reducers/order'

const rootReducer = combineReducers({
  burger: burgerReducer,
  order: orderReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(applyMiddleware(thunk))


export default createStore(rootReducer, enhancers)
