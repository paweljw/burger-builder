import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../../containers/Checkout/ContactData/ContactData';

class Checkout extends Component {
  render() {
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
    ings: state.ingredients,
    price: state.totalPrice
  }
}

export default connect(mapStateToProps)(Checkout)