import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxilary'

const WithErrorHandler = (WrrapperComponent, axios ) => {
  return class extends Component {
    state = {
      error: null,
    }

    //используем этот метод, чтобы перехватить ошибки,
    //которые могут возникнуть у дочерних компонентов еще до их рендера
    componentWillMount() {
      //Не забываем для intercetors возвращеть req или res, т.к. они блокируют запрос
      this.reqIntercetor = axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      }, err => {})

      this.resIntercetor = axios.interceptors.response.use(res => res, err => {
        this.setState({error: err});
      })
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqIntercetor);
      axios.interceptors.response.eject(this.resIntercetor);
    }

    errorConfirmedHandler = () => {
      this.setState({error: null})
    }

    render() {
      return (
        <Aux>
          <Modal
            modalClosed={this.errorConfirmedHandler}
            show={this.state.error}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrrapperComponent {...this.props} />
        </Aux>
      )
    }
  }
}

export default WithErrorHandler
