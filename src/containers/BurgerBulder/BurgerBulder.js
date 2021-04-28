import React, { Component } from "react";

import Aux from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGRIDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBulder extends Component {
  //Можно использовать и этот метод объявления state
  //   constructor(props){
  //     super(props);
  //     this.state = {...}
  //   }
  //но мы используем более современный подход
  state = {
    ingridients: null,
    totalPrice: 4,
    purchaseble: false, //есть ли ингридиенты
    purchasing: false, //если инажата кнопка зказа
    loading: false,
    error: false,
  }

  componentDidMount() {
    axios.get('https://my-burger-ac9e1-default-rtdb.firebaseio.com/ingridients.json')
      .then(res => {
        this.setState({
          ingridients: res.data,
        })
      })
      .catch(err => {this.setState({error: true})})
  }

  updatePurchaseState = (ingridients) => {
    //Посчитаем кол-во ингридиендов
    const sum = Object.keys(ingridients)
    .map(el => {
      return ingridients[el];
    }) //получим массив значений объект
    .reduce((acc, el) => {
      return acc + el;
    }, 0);

    this.setState({purchaseble: sum > 0});
  }

  addIngridientHandler = (type) => {
    const oldCount = this.state.ingridients[type];
    const updateCount = oldCount + 1;

    const updateIngridients = {...this.state.ingridients};
    updateIngridients[type] = updateCount;

    const priceAddition = INGRIDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = priceAddition + oldPrice;

    this.setState(
      {totalPrice: newPrice, ingridients: updateIngridients}
    );

    this.updatePurchaseState(updateIngridients); //передаем измененные ингридиенты
    //потому что если в самом методе обращатья к стейту, то он может не успеть обновиться
    //и мы поулчим значения старого стейта
  }


  removeIngridientHandler = (type) => {
    const oldCount = this.state.ingridients[type];
    if(oldCount <= 0) return;

    const updateCount = oldCount - 1;

    const updateIngridients = {...this.state.ingridients};
    updateIngridients[type] = updateCount > 0 ? updateCount : 0;

    const priceDeduction = INGRIDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState(
        {totalPrice: newPrice, ingridients: updateIngridients}
    );

    this.updatePurchaseState(updateIngridients);
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    this.setState({loading: true});
    // alert('You continiue');
    const order = {
      ingridients: this.state.ingridients,
      price: this.state.totalPrice,
      customer: {
        name: 'Safar',
        adress: {
          street: 'Test',
          zipCode: 117570,
        }
      }
    }
    axios.post('/orders.json', order)
      .then(res => {
        this.setState({loading: false, purchasing: false});
      })
      .catch(err => {
        this.setState({loading: false, purchasing: false});
      });
  }


  render() {
    //Прокинем доп инфу, чтобы сделать кнопку disable, если нет игридинетов
    const disableInfo = {...this.state.ingridients};
    for(let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>Error</p> : <Spinner />;

    if(this.state.ingridients) {
      burger = (
        <Aux>
          <Burger ingridients={this.state.ingridients} />
          <BuildControls
            ingridientAdded={this.addIngridientHandler}
            ingridientRemoved={this.removeIngridientHandler}
            disabled={disableInfo}
            purchaseble={this.state.purchaseble}
            ordered={this.purchaseHandler}
            price={this.state.totalPrice}
          />
        </Aux>
      )
      orderSummary = <OrderSummary
      price={this.state.totalPrice}
      purchaseCanclled={this.purchaseCancelHandler}
      purchaseContinue={this.purchaseContinueHandler}
      ingridients={this.state.ingridients} />
    }

    if(this.state.loading) {
      orderSummary = <Spinner />
    }

    return(
      <Aux>
        <Modal
          modalClosed={this.purchaseCancelHandler}
          show={this.state.purchasing}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBulder, axios);