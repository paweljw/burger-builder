import React, { Component } from 'react'
import { connect } from 'react-redux'

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios'
import * as actionCreators from '../../store/actions'

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    summaryLoading: false
  }

  componentDidMount() {
    if (!this.props.ings) {
      this.props.onInitIngredients()
    }
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
              isAuth={this.props.isAuth}
            />
          </> : <Spinner />}
      </>
    )
  }

  purchasingToggle = () => {
    if (this.props.isAuth) {
      this.setState((prevState) => { return { purchasing: !prevState.purchasing } })
    } else {
      this.props.history.push('/auth?continue=/checkout')
    }
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
    ings: state.burger.ingredients,
    price: state.burger.totalPrice,
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: ingredient => {
      dispatch(actionCreators.addIngredient(ingredient))
    },
    onRemoveIngredient: ingredient => {
      dispatch(actionCreators.removeIngredient(ingredient))
    },
    onInitIngredients: () => {
      dispatch(actionCreators.initIngredients())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(
    BurgerBuilder, axios
  )
)