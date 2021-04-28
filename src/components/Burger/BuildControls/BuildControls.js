import React, { memo } from 'react'

import classes from './BuildControls.module.css';
import BuildControl from './BuldControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];  

const BuildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>Current Price <strong>{props.price.toFixed(2)}</strong></p>
    {controls.map(el => (
        <BuildControl
          key={el.label}
          label={el.label}
          added={() => props.ingridientAdded(el.type)}
          removed={() => props.ingridientRemoved(el.type)}
          disabled={props.disabled[el.type]}
        />
    ))}
    <button
      disabled={!props.purchaseble}
      className={classes.OrderButton}
      onClick={props.ordered}
    >ORDER NOW</button>
  </div>
)

BuildControls.propTypes = {}

export default memo(BuildControls)
