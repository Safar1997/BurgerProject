import React, { useEffect } from 'react'
import Aux from '../../../hoc/Auxilary';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
  useEffect(() => {
    console.log('rendering');
  })

  const ingridientSummary = Object.keys(props.ingridients)
    .map(el => {
      return (
        <li key={el}>
          <span
            style={{textTransform: 'capitalize'}}>{el}
          </span>: {props.ingridients[el]}
        </li>);
    })

  return (
    <Aux>
      <h3>Your order</h3>
      <p>Burger with the following ingridient</p>
      <ul>
        {ingridientSummary}
      </ul>
      <p><strong>Total price: {props.price.toFixed(2)}</strong></p>
      <p>Continiue?</p>
      <Button
        btnType={'Danger'}
        clicked={props.purchaseCanclled}
      >CANCEL</Button>
      <Button
        btnType={'Success'}
        clicked={props.purchaseContinue}
      >CONTINUE</Button>
    </Aux> 
  )
}

export default OrderSummary;
