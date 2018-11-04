import React, { Component } from 'react';
import { connect } from 'react-redux'

import Spinner from '../../components/UI/Spinner/Spinner'
import Order from '../../components/Order/Order';
import axios from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../store/actions/order'

class Orders extends Component {
  state = {
    loading: true
  }

  componentDidMount() {
    this.props.onInitOrders()
  }

  render() {
    if (this.props.loadingOrders) {
      return <Spinner />
    }

    return (
      <div>
        {this.props.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.totalPrice} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loadingOrders: state.order.loadingOrders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitOrders: () => {
      dispatch(actionCreators.initOrders())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))