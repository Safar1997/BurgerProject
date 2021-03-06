import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {
  let inputElement = null;

  switch (props.elementType) {
    case ('input'):
      inputElement = <input
        className={classes.InputElement}
        value={props.value}
        {...props.elementConfig}
        onChange={props.changed} 
      />
      break;
    case ('textarea'):
      inputElement = <textarea
        className={classes.InputElement}
        value={props.value}
        {...props.elementConfig}
        onChange={props.changed}
      />
      break;
    case ('select'):
        inputElement = <select
          className={classes.InputElement}
          value={props.value}
          onChange={props.changed}
        >
        {props.elementConfig.options.map(option => (
          <option key={option.value} value={option.value}>
            {option.displayValue}
          </option>
        ))}
        </select>
        break;
    default:
      inputElement = <input
        className={classes.InputElement}
        value={props.value}
        {...props.elementConfig}
        onChange={props.changed}
      />
  }

  return(
    <div className={classes.Input}>
      <label className={classes.Label}>{props.lable}</label>
      {inputElement}
    </div>
)}

export default Input
