import React, { PureComponent } from 'react'
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from "../../../axios-orders";
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import WithErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { purchaseBurger } from '../../../store/actions/index';

class ContactData extends PureComponent {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'street'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'email'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},  
            {value: 'cheepest', displayValue: 'Cheepest'},
          ]
        },
        value: 'fastest'
      },
    },
    loading: false,
  };

  orderHandler = (e) => {
    e.preventDefault();
    // this.setState({loading: true});
//Деструктурируем данные для отправки на сервер
    const formData = {};
    for(let formEl in this.state.orderForm) {
      formData[formEl] = this.state.orderForm[formEl].value;
    }

    const order = {
      ingridients: this.props.ings,
      price: this.props.totalPrice,
      orderData: formData,
    }
    // axios.post('/orders.json', order)
    //   .then(res => {
    //     this.setState({loading: false});
    //     this.props.history.push('/')
    //   })
    //   .catch(err => {
    //     this.setState({loading: false});
    //   });
    this.props.onOrderBurger(order, this.props.token);
  }

  inputChangedHandler = (e, inputIDentyfier) => {
    //при деструктуризации идет неглубокое клонирование,  
    const updatedOrderFrom = {
      ...this.state.orderForm
    }
    //поэтому клонируем вложенный объект тоже
    const updatedFormElement = {
      ...updatedOrderFrom[inputIDentyfier]
    };
    updatedFormElement.value = e.target.value;
    updatedOrderFrom[inputIDentyfier] = updatedFormElement;
    this.setState({orderForm: updatedOrderFrom});
  }

  render() {
    const formElementsArray = [];
    for(let key in this.state.orderForm) {
      formElementsArray.push({
        id:key,
        config: this.state.orderForm[key],
      })
    }

    formElementsArray.map(formElement => console.log(formElement.id))

    let form = <form onSubmit={this.orderHandler} >
      {formElementsArray.map(formElement => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          changed={(e) => this.inputChangedHandler(e, formElement.id)}
        />
      ))}
      <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
    </form>;
    if(this.props.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your contact Data</h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingridients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.orderReducer.loading,
    token: state.authReducer.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) => dispatch(purchaseBurger(orderData, token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(ContactData, axios));