import React from 'react';
import classes from './Logo.module.css';

import burgerLogo from '../../assets/images/burger-logo.png'; //Здесь webpack будет хранить путь к изображению и даже оптимизирует его
// в src нельзя просто указать путь, т.к. webpack все поместит всае в другую папку при сборке
const Logo = (props) => (
  <div className={classes.Logo}>
      <img src={burgerLogo} alt='Burger' /> 
  </div>
)

export default Logo
