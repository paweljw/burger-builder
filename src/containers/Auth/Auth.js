import React, { Component } from 'react'

import Inputs from '../../components/UI/Inputs/Inputs'
import Button from '../../components/UI/Button/Button'
import withFormValidator from '../../hoc/withFormValidator/withFormValidator'
import classes from './Auth.module.scss';

class Auth extends Component {
  state = {
    authForm: {
      login: {
        elementConfig: {
          type: 'text',
          placeholder: 'test@example.com',
          label: 'E-mail'
        },
        value: '',
        validation: {
          required: true,
          email: true
        },
        valid: true
      },
      password: {
        elementConfig: {
          type: 'password',
          placeholder: 'Your password',
          label: 'Password'
        },
        value: '',
        validation: {
          required: true
        },
        valid: true
      },
    }
  }

  updateValue = (key, event) => {
    // Gotcha - spread shallow-copies
    const authForm = { ...this.state.authForm }
    const authInput = { ...authForm[key] }
    const value = event.target.value
    authInput.value = value
    authInput.valid = this.props.checkValidity(authForm, key, value)
    authForm[key] = authInput

    this.setState({ authForm })
  }

  authHandler = (event) => {
    event.preventDefault()
    const [valid, form] = this.props.validateForm(this.state.authForm)

    if (!valid) {
      this.setState({ authForm: form })
      return
    }

    const authData = {
      login: form.login.value,
      password: form.password.value
    }

    console.log(authData)
  }


  render() {
    return <div className={classes.Auth}>
      <form>
        <Inputs
          onChange={this.updateValue}
          form={this.state.authForm} />
        <Button type="Success" clicked={this.authHandler}>SUBMIT</Button>
      </form>
    </div>
  }
}

export default withFormValidator(Auth)