import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../axios'

import classes from './ContactData.module.scss'

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      zipCode: '',
      country: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault()
    this.setState({ loading: true })

    axios.post('/orders.json', {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
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
        this.props.history.push('/')
      }
      this.setState({ loading: false })
    }).catch((err) => {
      console.log(err)
    })
  }

  render() {
    let form = (
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
        <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
        <input className={classes.Input} type="text" name="street" placeholder="Street" />
        <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
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

export default ContactData