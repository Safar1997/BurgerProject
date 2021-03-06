import React from 'react'
import Aux from '../../../hoc/Auxilary';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './SideDrawer.module.css';

const SideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if(props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuth={props.isAuth} />
        </nav>
      </div>
    </Aux>
  )
}

SideDrawer.propTypes = {

}

export default SideDrawer;
