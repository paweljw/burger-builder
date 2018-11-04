import React, { Component } from 'react'
import { connect } from 'react-redux'

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios'
import * as actionTypes from '../../store/actions'

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    summaryLoading: false
  }

  render() {
    const disabledInfo = { ...this.props.ings }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = <Spinner />

    if (this.props.ings && !this.state.summaryLoading && this.state.purchasing) {
      orderSummary = <OrderSummary
        loading={this.state.summaryLoading}
        ingredients={this.props.ings}
        purchaseToggle={this.purchasingToggle}
        purchase={this.puchaseHandler}
        price={this.props.price}
      />
    }

    return (
      <>
        {this.state.purchasing ?
          <Modal dismiss={this.purchasingToggle}>
            {orderSummary}
          </Modal> : null}
        {this.props.ings ?
          <>
            <Burger ingredients={this.props.ings} />,
            <BuildControls
              less={this.props.onRemoveIngredient}
              more={this.props.onAddIngredient}
              disabledInfo={disabledInfo}
              price={this.props.price}
              purchasable={this.isPurchasable()}
              purchase={this.purchasingToggle}
            />
          </> : <Spinner />}
      </>
    )
  }

  purchasingToggle = () => {
    this.setState((prevState) => { return { purchasing: !prevState.purchasing } })
  }

  puchaseHandler = () => {
    this.props.history.push('/checkout')
  }

  isPurchasable = () => {
    return Object.values(this.props.ings).reduce((acc, val) => { return acc + val }, 0) > 0
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: ingredient => {
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredient })
    },
    onRemoveIngredient: ingredient => {
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredient })
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(
    BurgerBuilder, axios
  )
)