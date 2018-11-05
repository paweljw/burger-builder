import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Inputs from '../../../components/UI/Inputs/Inputs'
import axios from '../../../axios'
import * as actionCreators from '../../../store/actions'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import withFormValidator from '../../../hoc/withFormValidator/withFormValidator'

import classes from './ContactData.module.scss'

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementConfig: {
          type: 'text',
          placeholder: 'Your name',
          label: 'Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: true
      },
      email: {
        elementConfig: {
          type: 'text',
          placeholder: 'you@example.com',
          label: 'E-mail'
        },
        value: '',
        validation: {
          required: true,
          email: true
        },
        valid: true
      },
      street: {
        elementConfig: {
          type: 'text',
          placeholder: 'Street 11/2',
          label: 'Street Address'
        },
        value: '',
        validation: {
          required: true
        },
        valid: true
      },
      zipCode: {
        elementConfig: {
          type: 'text',
          placeholder: '12345',
          label: 'Zip Code'
        },
        value: '',
        validation: {
          required: true,
          zipCode: true
        },
        valid: true
      },
      country: {
        elementConfig: {
          type: 'text',
          placeholder: 'Poland',
          label: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: true
      },
    },
  }

  orderHandler = (event) => {
    event.preventDefault()
    const [valid, form] = this.props.validateForm(this.state.orderForm)

    if (!valid) {
      this.setState({ orderForm: form })
      return
    }

    const orderData = {
      ingredients: this.props.ings,
      totalPrice: this.props.price,
      customer: {
        name: this.state.orderForm.name.value,
        address: {
          street: this.state.orderForm.street.value,
          zipCode: this.state.orderForm.zipCode.value,
          country: this.state.orderForm.country.value
        },
        email: this.state.orderForm.email.value
      }
    }

    this.props.onPurchaseBurgerStart()
    this.props.onPurchaseBurger(orderData)
    this.props.onResetIngredients()
  }

  updateValue = (key, event) => {
    // Gotcha - spread shallow-copies
    const orderForm = { ...this.state.orderForm }
    const orderInput = { ...orderForm[key] }
    const value = event.target.value
    orderInput.value = value
    orderInput.valid = this.props.checkValidity(orderForm, key, value)
    orderForm[key] = orderInput

    this.setState({ orderForm })
  }

  render() {
    let form = (
      <form>
        <Inputs
          onChange={this.updateValue}
          form={this.state.orderForm} />
        <Button type="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    );
    if (this.props.orderLoading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burger.ingredients,
    price: state.burger.totalPrice,
    orderLoading: state.order.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onResetIngredients: () => dispatch(actionCreators.resetIngredients()),
    onPurchaseBurger: orderData => dispatch(actionCreators.purchaseBurger(orderData)),
    onPurchaseBurgerStart: () => dispatch(actionCreators.purchaseBurgerStart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withFormValidator(
    withErrorHandler(ContactData, axios)
  )
)