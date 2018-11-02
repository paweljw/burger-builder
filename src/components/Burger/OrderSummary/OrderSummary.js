import React from 'react'

import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((ingKey) =>
    <li key={ingKey}>
      <span style={{ textTransform: 'capitalize' }}>{ingKey}</span>: {props.ingredients[ingKey]}
    </li>
  )

  return <>
    <h3>Your Order</h3>
    <p>A delicious burger with the following elements:</p>
    <ul>
      {ingredientSummary}
    </ul>
    <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
    <p>Continue to checkout?</p>
    <Button clicked={props.purchaseToggle} type="Danger">CANCEL</Button>
    <Button clicked={props.purchase} type="Success">CONTINUE</Button>
  </>
}

export default orderSummary
