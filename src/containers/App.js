import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import Layout from '../hoc/Layout/Layout'
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Checkout from './Checkout/Checkout'
import Orders from './Orders/Orders'
import Auth from './Auth/Auth'
import Logout from './Auth/Logout/Logout'
import Complete from './Checkout/Complete/Complete'
import store from '../store/store'

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
              <Route path="/auth" component={Auth} />
              <Route path="/logout" component={Logout} />
            </Layout>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
