import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Layout from '../hoc/Layout/Layout'
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Checkout from './Checkout/Checkout'
import Orders from './Orders/Orders'
import Auth from './Auth/Auth'
import Logout from './Auth/Logout/Logout'
import Complete from './Checkout/Complete/Complete'
import * as actions from '../store/actions'


class App extends Component {
  componentDidMount() {
    this.props.onAuthCheckState()
  }

  render() {
    return (
      <div>
        <Layout isAuth={this.props.isAuth}>
          <Route path="/" exact component={BurgerBuilder} />
          {this.props.isAuth ?
            <>
              <Route path="/checkout" component={Checkout} />
              <Route path="/my-orders" component={Orders} />
              <Route path="/order-complete" component={Complete} />
            </>
            : null}
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthCheckState: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    App
  )
)
