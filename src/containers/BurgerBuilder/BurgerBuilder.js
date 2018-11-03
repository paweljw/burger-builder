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

const INITIAL_STATE = {
  ingredients: null,
  totalPrice: 4,
  purchasable: false,
  purchasing: false,
  summaryLoading: false
}

class BurgerBuilder extends Component {
  state = { ...INITIAL_STATE }

  async componentDidMount() {
    const ingredients = (await axios.get('/ingredients.json')).data
    if (ingredients) {
      this.setState({ ingredients })
    }
  }

  render() {
    const disabledInfo = { ...this.state.ingredients }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = <Spinner />

    if (this.ingredients && !this.state.summaryLoading && this.state.purchasing) {
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
    this.setState({ summaryLoading: true })
    axios.post('/orders.json', {
      ingredients: this.state.ingredients,
      totalPrice: this.state.totalPrice,
      customer: {
        name: 'Test Customer',
        address: {
          street: 'Test street 123',
          zipCode: '12345',
          country: 'Poland'
        },
        email: 'test@example.com'
      },
      deliveryMethod: 'fastest'
    }).then((response) => {
      if (response && response.status === 200) {
        this.setState({ ...INITIAL_STATE })
      } else {
        this.setState({ purchasing: false, summaryLoading: false })
      }
    }).catch((err) => {
      console.log(err)
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

export default withErrorHandler(BurgerBuilder, axios)