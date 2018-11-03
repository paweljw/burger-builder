import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    componentDidMount() {
      axios.interceptors.request.use(req => {
        this.setState({ error: null })
        return req
      })
      axios.interceptors.response.use(res => res, error => {
        this.setState({ error: error })
      })
    }

    dismissError = () => {
      this.setState({ error: null })
    }

    render() {
      return <>
        {this.state.error ? <Modal dismiss={this.dismissError}>
          {this.state.error.message}
        </Modal> : null}
        <WrappedComponent {...this.props} />
      </>
    }
  }
}
export default withErrorHandler