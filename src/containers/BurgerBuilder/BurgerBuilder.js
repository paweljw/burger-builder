import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios'

const INGREDIENT_PRICES = {
  salad: 0.4,
  bacon: 0.7,
  meat: 1.3,
  cheese: 1.0
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    summaryLoading: false
  }

  async componentDidMount() {
    const response = (await axios.get('/ingredients.json'))
    if (response) {
      this.setState({ ingredients: response.data })
    }
  }

  render() {
    const disabledInfo = { ...this.state.ingredients }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = <Spinner />

    if (this.state.ingredients && !this.state.summaryLoading && this.state.purchasing) {
      orderSummary = <OrderSummary
        loading={this.state.summaryLoading}
        ingredients={this.state.ingredients}
        purchaseToggle={this.purchasingToggle}
        purchase={this.puchaseHandler}
        price={this.state.totalPrice}
      />
    }

    return (
      <>
        {this.state.purchasing ?
          <Modal dismiss={this.purchasingToggle}>
            {orderSummary}
          </Modal> : null}
        {this.state.ingredients ?
          <>
            <Burger ingredients={this.state.ingredients} />,
            <BuildControls
              less={this.lessHandler}
              more={this.moreHandler}
              disabledInfo={disabledInfo}
              price={this.state.totalPrice}
              purchasable={this.state.purchasable}
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
    const queryParams = []
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
        '=' +
        encodeURIComponent(this.state.ingredients[i])
      )
    }
    queryParams.push(encodeURIComponent('total') + '=' + encodeURIComponent(this.state.totalPrice))
    const queryString = queryParams.join('&')
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
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

  resetIngredientCounts = () => {
    const ingredients = { ...this.state.ingredients }
    Object.keys(this.state.ingredients).forEach((key) =>
      ingredients[key] = 0
    )
    this.setState({ ingredients })
  }
}

export default withErrorHandler(BurgerBuilder, axios)