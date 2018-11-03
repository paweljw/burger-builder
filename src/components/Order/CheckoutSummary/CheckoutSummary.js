import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.module.scss';

const checkoutSummary = (props) =>
  <div className={classes.CheckoutSummary}>
    <h1>We hope it tastes amazing!</h1>
    <div style={{ width: '100%', margin: 'auto' }}>
      <Burger ingredients={props.ingredients} />
    </div>
    <Button
      type="Danger"
      clicked={props.purchaseCancelled}
    >CANCEL</Button>
    <Button
      type="Success"
      clicked={props.purchaseContinued}
    >CONTINUE</Button>
  </div>

export default checkoutSummary