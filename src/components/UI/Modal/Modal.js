import React, { Component } from 'react'

import Backdrop from '../Backdrop/Backdrop'
import classes from './Modal.module.scss';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {

  }

  render() {
    return <>
      <Backdrop clicked={this.props.purchaseToggle} show={true} />
      <div className={classes.Modal}>{this.props.children}</div>
    </>
  }
}

export default Modal