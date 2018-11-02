import React from 'react'
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.scss';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
  { label: 'Bacon', type: 'bacon' }
]

const buildControls = (props) => {
  const renderableControls = controls.map((control) =>
    <BuildControl
      key={control.label}
      label={control.label}
      type={control.type}
      less={props.less}
      more={props.more}
      disabled={props.disabledInfo[control.type]}
    />
  )
  return <div
    className={classes.BuildControls}>
    <p>Current price: ${props.price.toFixed(2)}</p>
    {renderableControls}
    <button
      disabled={!props.purchasable}
      className={classes.OrderButton}
      onClick={props.purchase}
    >Order now</button>
  </div>
}

export default buildControls