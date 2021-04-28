import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngridient/BurgerIngridient';

const Burger = (props) => {
  let transformedIngidients = Object.keys(props.ingridients) //Получим значения ключей объекта Ингридиенты (мясо, хлбе....)
    .map(igKey => {
      return [...Array(props.ingridients[igKey])].map((_, index) => { //Array() - создаст массив из стольких элементов, т.е. из кол-ва каждого ингридиента
        return <BurgerIngredient key={igKey + index} type={igKey} /> //и для каждого ig.key будет массив из его количества и типа igKey
      }) // 
    }) //Далее в reduce мы сделаем массив плоски, т.к. изначально это массив с массивами
    //и если в них ничего нет, то будет просто пустой массив
    .reduce((acc, el) => {
      return acc.concat(el);
    }, []);
  
  if(transformedIngidients.length === 0) {
    transformedIngidients = <p>Please start adding ingridiens</p>
  }
  
  return(
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
        {transformedIngidients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

export default Burger;