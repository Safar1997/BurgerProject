import classes from './Button.module.css';
import React from 'react';


const Button = (props) => (
  <button
    className={[classes.Button, classes[props.btnType]].join(' ')} //Хотим использовать два класса, первый всегда Button, второй динамически
    onClick={props.clicked}
  >
    {props.children}
  </button>
)

export default Button
