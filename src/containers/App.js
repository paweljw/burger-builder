import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import Layout from '../hoc/Layout/Layout'
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Checkout from './Checkout/Checkout'
import Orders from './Orders/Orders'
import Complete from './Checkout/Complete/Complete'
import reducer from '../store/reducer'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <BrowserRouter>
            <Layout>
              <Route path="/" exact component={BurgerBuilder} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/my-orders" component={Orders} />
              <Route path="/order-complete" component={Complete} />
            </Layout>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
