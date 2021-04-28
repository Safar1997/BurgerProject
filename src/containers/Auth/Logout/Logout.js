import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as actionTypes from '../../../store/actions';

class Logout extends PureComponent {
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return <Redirect to="/"/>
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actionTypes.logout()),
  }
}

export default connect(null, mapDispatchToProps)(Logout);