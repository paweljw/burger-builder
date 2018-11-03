import React, { Component } from 'react';
import Layout from '../hoc/Layout/Layout'

import { BrowserRouter, Route } from 'react-router-dom'

import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Checkout from './Checkout/Checkout'
import Orders from './Orders/Orders'
import Complete from './Checkout/Complete/Complete'

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Layout>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/my-orders" component={Orders} />
            <Route path="/order-complete" component={Complete} />
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
