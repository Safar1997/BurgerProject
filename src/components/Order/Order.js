import React from 'react'
import classes from './Order.module.css';

const Order = (props) => {
  const ingridients = [];

  for(let ingridientName in props.ingridients) {
    ingridients.push({
      name: ingridientName ,
      amount: props.ingridients[ingridientName]
    });
  }

  const ingridientOutput = ingridients.map(ig => {
    return <span
      key={ig.name}
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        padding: '5px',
        border: '1px solid #ccc',
      }}
    >
      {ig.name} - {ig.amount}
    </span>
  })

  return(
    <div className={classes.Order}>
      <p>Ingridients: {ingridientOutput}</p>
      <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
)}

export default Order
