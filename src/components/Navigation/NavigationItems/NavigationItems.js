import React from 'react'
import classes from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) =>
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>Burger Builder</NavigationItem>
    {props.isAuth ?
      <>
        <NavigationItem link="/my-orders">My orders</NavigationItem>
        <NavigationItem link="/logout">Logout</NavigationItem>
      </>
      : <NavigationItem link="/auth">Authenticate</NavigationItem>
    }
  </ul>

export default navigationItems