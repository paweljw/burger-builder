import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../../containers/Checkout/ContactData/ContactData';

class Checkout extends Component {
  render() {
    if (!this.props.ings) {
      return <Redirect to="/" />
    }

    return <div>
      <CheckoutSummary
        ingredients={this.props.ings}
        purchaseCancelled={this.purchaseCancelledHandler}
        purchaseContinued={this.purchaseContinuedHandler}
      />
      <Route
        path={this.props.match.url + '/contact-data'}
        render={props => <ContactData history={props.history} />}
      />
    </div>
  }

  purchaseCancelledHandler = () => {
    this.props.history.goBack()
  }

  purchaseContinuedHandler = () => {
    this.props.history.push(this.props.match.url + '/contact-data')
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burger.ingredients,
    price: state.burger.totalPrice
  }
}

export default connect(mapStateToProps)(Checkout)