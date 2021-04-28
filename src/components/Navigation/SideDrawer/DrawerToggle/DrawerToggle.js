import classes from './DrawerToggle.module.css';
import React from 'react'

const DrawerToggle = (props) => (
  <div
    className={classes.DrawerToggle}
    onClick={props.clicked}
  >
    <div></div>
    <div></div>
    <div></div>
  </div>
);


export default DrawerToggle
