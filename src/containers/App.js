import React, { Component } from 'react';
import Layout from '../hoc/Layout/Layout'

import { BrowserRouter, Route } from 'react-router-dom'

import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Checkout from './Checkout/Checkout'

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Layout>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
