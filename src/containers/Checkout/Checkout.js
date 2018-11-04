import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import * as orderActions from '../../store/actions/order'

class Checkout extends Component {
  componentDidMount() {

  }

  render() {
    if (!this.props.ings) {
      return <Redirect to="/" />
    }

    if (this.props.purchased) {
      return <Redirect to="/order-complete" />
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
    price: state.burger.totalPrice,
    purchased: state.order.purchased
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPurchaseInit: dispatch(orderActions.purchaseInit())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)