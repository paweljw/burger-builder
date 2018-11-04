import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import axios from '../../../axios'

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
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault()
    if (!this.validateForm()) {
      return
    }

    this.setState({ loading: true })

    axios.post('/orders.json', {
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
      },
    }).then((response) => {
      if (response && response.status === 200) {
        this.props.history.push('/order-complete')
      }
      this.setState({ loading: false })
    }).catch((err) => {
      console.log(err)
    })
  }

  checkValidity = (key, value) => {
    const orderForm = { ...this.state.orderForm }
    const orderInput = { ...orderForm[key] }

    if (orderInput.validation.required && value.trim() === '') {
      return false
    }

    if (orderInput.validation.zipCode && !value.match(/^\d{5}$/)) {
      return false
    }

    if (orderInput.validation.email && !value.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      return false
    }

    return true
  }

  validateForm = () => {
    let valid = true
    const orderForm = { ...this.state.orderForm }

    Object.keys(this.state.orderForm).forEach(key => {
      const orderInput = { ...orderForm[key] }
      const value = orderInput.value
      const validity = this.checkValidity(key, value)
      if (!validity) {
        valid = false
      }
      orderInput.valid = validity
      orderForm[key] = orderInput
    })

    this.setState({ orderForm })
    return valid
  }

  updateValue = (key, event) => {
    // Gotcha - spread shallow-copies
    const orderForm = { ...this.state.orderForm }
    const orderInput = { ...orderForm[key] }
    const value = event.target.value
    orderInput.value = value
    orderInput.valid = this.checkValidity(key, value)
    orderForm[key] = orderInput

    this.setState({ orderForm })
  }

  render() {
    const inputs = Object.keys(this.state.orderForm).map(key =>
      <Input
        key={key}
        name={key}
        elementConfig={{ ...this.state.orderForm[key].elementConfig }}
        onChange={this.updateValue.bind(this, key)}
        valid={this.state.orderForm[key].valid}
        validation={this.state.orderForm[key].validation || {}}
      />
    )
    let form = (
      <form>
        {inputs}
        <Button type="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    );
    if (this.state.loading) {
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
    ings: state.ingredients,
    price: state.totalPrice
  }
}

export default connect(mapStateToProps)(ContactData)