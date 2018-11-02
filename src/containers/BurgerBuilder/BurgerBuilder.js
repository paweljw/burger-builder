import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
  salad: 0.4,
  bacon: 0.7,
  meat: 1.3,
  cheese: 1.0
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  }

  render() {
    const disabledInfo = { ...this.state.ingredients }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    return (
      <>
        {this.state.purchasing ?
          <Modal purchaseToggle={this.purchasingToggle}>
            <OrderSummary
              ingredients={this.state.ingredients}
              purchaseToggle={this.purchasingToggle}
              purchase={this.puchaseHandler}
              price={this.state.totalPrice}
            />
          </Modal> : null}
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          less={this.lessHandler}
          more={this.moreHandler}
          disabledInfo={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          purchase={this.purchasingToggle}
        />
      </>
    )
  }

  purchasingToggle = () => {
    this.setState((prevState) => { return { purchasing: !prevState.purchasing } })
  }

  puchaseHandler = () => {
    alert('Thanks!')
    this.setState({
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
      },
      totalPrice: 4,
      purchasable: false,
      purchasing: false
    })
  }

  lessHandler = (type) => {
    this.setState((prevState) => {
      let ingredientCount = prevState.ingredients[type]
      let totalPrice = prevState.totalPrice
      const ingredients = { ...prevState.ingredients }

      if (ingredientCount > 0) {
        ingredientCount -= 1
        ingredients[type] = ingredientCount
        totalPrice -= INGREDIENT_PRICES[type]
      }

      const purchasable = Object.values(ingredients).reduce((acc, val) => { return acc + val }, 0) > 0

      return {
        ingredients,
        totalPrice,
        purchasable
      }
    })
  }

  moreHandler = (type) => {
    this.setState((prevState) => {
      let ingredientCount = prevState.ingredients[type]
      let totalPrice = prevState.totalPrice
      const ingredients = { ...prevState.ingredients }

      ingredientCount += 1
      ingredients[type] = ingredientCount
      totalPrice += INGREDIENT_PRICES[type]

      const purchasable = Object.values(ingredients).reduce((acc, val) => { return acc + val }, 0) > 0

      return {
        ingredients,
        totalPrice,
        purchasable
      }
    })
  }
}

export default BurgerBuilder