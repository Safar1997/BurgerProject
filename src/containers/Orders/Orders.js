import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions'

class Orders extends PureComponent {
  // state = {
  //   orders: [],
  //   loading: true,
  // }

  componentDidMount() {
    // axios.get('/orders.json')
    //   .then(res => {
    //     const fetchData = [];
    //     for(let key in res.data) {
    //       fetchData.push({
    //         ...res.data[key],
    //         id: key,
    //       });
    //     }
    //     this.setState({loading: false, orders: fetchData});
    //   })
    //   .catch(err => {
    //     this.setState({loading: false});
    //   })
    const token = localStorage.getItem('token');
    this.props.onFetchOrders(token);
  }

  render() {
    let orders = <Spinner />;
    if(!this.props.loading) {
      orders = <div>
      {this.props.orders.map(order => (<Order
        ingridients={order.ingridients}
        price={order.price}
        key={order.id}
      />))}
      </div>
    }
    return (
      <>
      {orders}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orderReducer.orders,
    loading: state.orderReducer.loading,
    token: state.authReducer.token,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));