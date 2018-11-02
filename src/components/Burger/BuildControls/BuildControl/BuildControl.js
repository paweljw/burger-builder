import React from 'react'
import classes from './BuildControl.module.scss';

const buildControl = (props) =>
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button className={classes.Less} onClick={props.less.bind(this, props.type)} disabled={props.disabled}>Less</button>
    <button className={classes.More} onClick={props.more.bind(this, props.type)}>More</button>
  </div>

export default buildControl