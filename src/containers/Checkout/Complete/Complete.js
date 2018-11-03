import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../../components/UI/Button/Button'
import classes from './Complete.module.scss';

const complete = (props) =>
  <div className={classes.OrderComplete}>
    <h1>Your order was received!</h1>
    <div>
      <Link to="/">
        <Button type="Success--large">AWESOME!</Button>
      </Link>
    </div>
    <Link
      to="/my-orders"
      className={classes.MyOrders}
    >My Orders</Link>
  </div>

export default complete
