import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';



class Checkout extends PureComponent {
  // state = {
  //   ingridients: {
  //     salad: 1,
  //     meat: 1,
  //     cheese: 1,
  //     bacon: 1,
  //   },
  //   price: 0,
  // }

  // componentDidMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingridients = {};
  //   let price = null;
  //   for(let param of query.entries()) {
  //     //['salad', '1']
  //     if(param[0] === 'price') {
  //       price = param[1];
  //     } else {
  //       ingridients[param[0]] = +param[1];
  //     }
  //   }
  //   console.log(ingridients);
  //   this.setState({ingridients: ingridients, price: price});
  // }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }


  render() {
    let summary = <Redirect to='/' />
    if(this.props.ings) {
      const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;

      summary = (
        <>
          {purchasedRedirect}
          <CheckoutSummary
          ingridients={this.props.ings}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route
          path={this.props.match.path + '/contact-data'}
          component={ContactData}
          />
        </>)}
    return (
      <div>
          {summary}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingridients,
    purchased: state.orderReducer.purchased,
  }
}

export default connect(mapStateToProps)(Checkout);