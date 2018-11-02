import React from 'react'
import classes from './Burger.module.scss';
import Ingredient from './Ingredient/Ingredient'

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingKey) => {
      return [...Array(props.ingredients[ingKey])].map((_, i) =>
        <Ingredient key={ingKey + i} type={ingKey} />
      )
    }).reduce((arr, el) => { return arr.concat(el) }, [])

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please add some ingredients!</p>
  }
  return (
    <div className={classes.Burger}>
      <Ingredient type="bread-top" />
      {transformedIngredients}
      <Ingredient type="bread-bottom" />
    </div>
  )
}

export default burger