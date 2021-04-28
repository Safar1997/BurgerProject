import * as actionsTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionsTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData,
  }
}

export const purchaseBurgerFail = (error) => {
  return {
    type: actionsTypes.PURCHASE_BURGER_FAILED,
    error,
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: actionsTypes.PURCHASE_BURGER_START,
  }
}

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json?auth=' + token, orderData)
    .then(res => {
      dispatch(purchaseBurgerSuccess(res.data.name, orderData));
    })
    .catch(err => {
      dispatch(purchaseBurgerFail(err));
    });
  }
}

export const purchaseInit = () => {
  return {
    type: actionsTypes.PURCHASE_INIT,
  }
}

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionsTypes.FETCH_ORDERS_SUCCESS,
    orders,
  }
}

export const fetchOrdersFail = (error) => {
  return {
    type: actionsTypes.FETCH_ORDERS_FAIL,
    error,
  }
}

export const fetchOrderStart = () => {
  return {
    type: actionsTypes.FETCH_ORDERS_START,
  }
}

export const fetchOrders = (token) => {
  return dispatch => {
    dispatch(fetchOrderStart());
    axios.get('/orders.json?auth=' + token)
      .then(res => {
        const fetchData = [];
        for(let key in res.data) {
          fetchData.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchOrdersSuccess(fetchData))
      })
      .catch(err => {
        dispatch(fetchOrdersFail(err))
      })
  }
}