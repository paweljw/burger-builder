import React from 'react'
import classes from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) =>
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>Burger Builder</NavigationItem>
    <NavigationItem link="/auth">Login</NavigationItem>
    <NavigationItem link="/my-orders">My orders</NavigationItem>
  </ul>

export default navigationItems