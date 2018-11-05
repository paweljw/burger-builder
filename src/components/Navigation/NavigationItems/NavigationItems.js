import React, { Component } from 'react'
import classes from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem'
import { connect } from 'react-redux'

class NavigationItems extends Component {
  render() {
    const authenticated = <>
      <NavigationItem link="/my-orders">My orders</NavigationItem>
      <NavigationItem link="/logout">Logout</NavigationItem>
    </>
    const unauthenticated = <NavigationItem link="/auth">Login</NavigationItem>

    return <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>Burger Builder</NavigationItem>
      {authenticated}
      {unauthenticated}
    </ul>
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.userId
  }
}

export default connect(mapStateToProps)(NavigationItems)