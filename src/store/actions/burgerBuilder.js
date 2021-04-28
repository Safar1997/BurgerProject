import * as actionsTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngridient = ingridientName => {
  return {
    type: actionsTypes.ADD_INGRIDIENT,
    ingridientName,
  }
}

export const removeIngridient = ingridientName => {
  return {
    type: actionsTypes.REMOVE_INGRIDIENT,
    ingridientName,
  }
}

export const setIngridients = ingridients => {
  return {
    type: actionsTypes.SET_INGRIDIDIENTS,
    ingridients,
  }
}

export const fetchIngridientsFailed = () => {
  return {
    type: actionsTypes.FETCH_INGRIDIENTS_FAILED,
  }
}

export const initIngridients = () => {
  return dispatch => {
    axios.get('https://my-burger-ac9e1-default-rtdb.firebaseio.com/ingridients.json')
      .then(res => {
        dispatch(setIngridients(res.data))
      })
      .catch(error => dispatch(fetchIngridientsFailed()))
  }
}