import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import Inputs from '../../components/UI/Inputs/Inputs'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import withFormValidator from '../../hoc/withFormValidator/withFormValidator'
import classes from './Auth.module.scss';
import * as actions from '../../store/actions'

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
    },
    isSignup: true
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

    this.props.onAuth(form.login.value, form.password.value, this.state.isSignup)
  }

  toggleSignup = (event) => {
    event.preventDefault()
    this.setState(prevState => {
      return {
        isSignup: !prevState.isSignup
      }
    })
  }

  render() {
    if (this.props.userId) {
      return <Redirect to="/" />
    }

    let form = <form>
      <Inputs
        onChange={this.updateValue}
        form={this.state.authForm} />
      <Button type="Success" clicked={this.authHandler}>SUBMIT</Button>
      <div></div>
      <Button type="Danger" clicked={this.toggleSignup}>
        SWITCH TO SIGN {this.state.isSignup ? 'IN' : 'UP'}
      </Button>
    </form>

    if (this.props.loading) {
      form = <Spinner />
    }

    return <div className={classes.Auth}>
      <h1>
        {this.state.isSignup ? 'SIGN UP' : 'SIGN IN'}
      </h1>
      <h4>{this.props.error}</h4>
      {form}
    </div>
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, signup) => dispatch(actions.auth(email, password, signup))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withFormValidator(Auth)
)