import React from 'react'
import classes from './Ingredient.module.scss'
import PropTypes from 'prop-types'

const ingredient = (props) => {
  let ingredient = null;

  switch (props.type) {
    case ('bread-bottom'):
      ingredient = <div className={classes.BreadBottom}></div>
      break
    case ('bread-top'):
      ingredient = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      )
      break
    case ('meat'):
      ingredient = <div className={classes.Meat}></div>
      break
    case ('cheese'):
      ingredient = <div className={classes.Cheese}></div>
      break
    case ('bacon'):
      ingredient = <div className={classes.Bacon}></div>
      break
    case ('salad'):
      ingredient = <div className={classes.Salad}></div>
      break
    case ('tomato'):
      ingredient = <div className={classes.Tomato}></div>
      break
    default:
      ingredient = null
  }
  return ingredient
}

ingredient.propTypes = {
  type: PropTypes.string.isRequired
}

export default ingredient