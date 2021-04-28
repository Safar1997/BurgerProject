import * as actionsTypes from '../actions/actionTypes';


const initialState = {
  ingridients: null,
  totalPrice: 4,
  error: false,
  building: false,
}

const INGRIDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionsTypes.ADD_INGRIDIENT:
      return {
        ...state,
        //т.к. это тоже обхект, нужн оклубокое клонирование и в соответствующем
        //поле заменить его значение
        ingridients: {
          ...state.ingridients,
          [action.ingridientName]: state.ingridients[action.ingridientName] + 1,
        },
        totalPrice: state.totalPrice + INGRIDIENT_PRICES[action.ingridientName],
        building: true,
      }
    case actionsTypes.REMOVE_INGRIDIENT:
      return {
        ...state,
        //т.к. это тоже обхект, нужн оклубокое клонирование и в соответствующем
        //поле заменить его значение
        ingridients: {
          ...state.ingridients,
          [action.ingridientName]: state.ingridients[action.ingridientName] - 1,
        },
        totalPrice: state.totalPrice - INGRIDIENT_PRICES[action.ingridientName],
        building: true,
      }
    case actionsTypes.SET_INGRIDIDIENTS:
      return {
        ...state,
        ingridients: {
          salad: action.ingridients.salad,
          bacon: action.ingridients.bacon,
          cheese: action.ingridients.cheese,
          meat: action.ingridients.meat,
        },
        totalPrice: 4,
        error: false,
        building: false,
      }
    case actionsTypes.FETCH_INGRIDIENTS_FAILED: 
      return {
        ...state,
        error: true,
      }
    default:
      return state;
  }
}

export default reducer;