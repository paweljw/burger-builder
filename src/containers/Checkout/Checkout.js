import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../../containers/Checkout/ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0
    },
    totalPrice: 0
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search)
    const ingredients = {}
    let totalPrice = 0

    for (let param of query.entries()) {
      if (param[0] === 'total') {
        totalPrice = parseFloat(param[1])
      } else {
        ingredients[param[0]] = parseInt(param[1])
      }
    }
    this.setState({ ingredients, totalPrice })
  }

  render() {
    return <div>
      <CheckoutSummary
        ingredients={this.state.ingredients}
        purchaseCancelled={this.purchaseCancelledHandler}
        purchaseContinued={this.purchaseContinuedHandler}
      />
      <Route
        path={this.props.match.url + '/contact-data'}
        render={(props) =>
          <ContactData
            totalPrice={this.state.totalPrice}
            ingredients={this.state.ingredients}
            {...props} />
        }
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

export default Checkout