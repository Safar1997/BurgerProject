import React, { Component } from "react";

import Aux from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import { connect } from "react-redux";
import {
  addIngridient,
  removeIngridient,
  initIngridients,
  purchaseInit,
  setAuthRedirectPatch,
} from "../../store/actions";

export class BurgerBulder extends Component {
  //Можно использовать и этот метод объявления state
  //   constructor(props){
  //     super(props);
  //     this.state = {...}
  //   }
  //но мы используем более современный подход
  state = {
    // purchaseble: false, //есть ли ингридиенты
    purchasing: false, //если инажата кнопка зказа
    // loading: false,
    // error: false,
  }

  componentDidMount() {
    // axios.get('https://my-burger-ac9e1-default-rtdb.firebaseio.com/ingridients.json')
    //   .then(res => {
    //     this.setState({
    //       ingridients: res.data,
    //     })
    //   })
    //   .catch(err => {this.setState({error: true})})
    this.props.onInitIngridients();
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

    return sum > 0;
  }

  // addIngridientHandler = (type) => {
  //   const oldCount = this.state.ingridients[type];
  //   const updateCount = oldCount + 1;

  //   const updateIngridients = {...this.state.ingridients};
  //   updateIngridients[type] = updateCount;

  //   const priceAddition = INGRIDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = priceAddition + oldPrice;

  //   this.setState(
  //     {totalPrice: newPrice, ingridients: updateIngridients}
  //   );

  //   this.updatePurchaseState(updateIngridients); //передаем измененные ингридиенты
  //   //потому что если в самом методе обращатья к стейту, то он может не успеть обновиться
  //   //и мы поулчим значения старого стейта
  // }


  // removeIngridientHandler = (type) => {
  //   const oldCount = this.state.ingridients[type];
  //   if(oldCount <= 0) return;

  //   const updateCount = oldCount - 1;

  //   const updateIngridients = {...this.state.ingridients};
  //   updateIngridients[type] = updateCount > 0 ? updateCount : 0;

  //   const priceDeduction = INGRIDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;

  //   this.setState(
  //       {totalPrice: newPrice, ingridients: updateIngridients}
  //   );

  //   this.updatePurchaseState(updateIngridients);
  // }

  purchaseHandler = () => {
    if(this.props.isAuth) {
      this.setState({purchasing: true});
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }


  render() {
    //Прокинем доп инфу, чтобы сделать кнопку disable, если нет игридинетов
    const disableInfo = {...this.props.ings};
    for(let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? <p>Error</p> : <Spinner />;

    if(this.props.ings) {
      burger = (
        <Aux>
          <Burger ingridients={this.props.ings} />
          <BuildControls
            ingridientAdded={this.props.onIngridiendAdded}
            ingridientRemoved={this.props.onIngridiendDeleted}
            disabled={disableInfo}
            purchaseble={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            price={this.props.totalPrice}
            isAuth={this.props.isAuth}
          />
        </Aux>
      )
      orderSummary = <OrderSummary
      price={this.props.totalPrice}
      purchaseCanclled={this.purchaseCancelHandler}
      purchaseContinue={this.purchaseContinueHandler}
      ingridients={this.props.ings} />
    }

    // if(this.state.loading) {
    //   orderSummary = <Spinner />
    // }

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

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingridients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.authReducer.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngridiendAdded: (ingridientName) => dispatch(addIngridient(ingridientName)),
    onIngridiendDeleted: (ingridientName) => dispatch(removeIngridient(ingridientName)),
    onInitIngridients: () => dispatch(initIngridients()),
    onInitPurchase: () => dispatch(purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(setAuthRedirectPatch(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBulder, axios));