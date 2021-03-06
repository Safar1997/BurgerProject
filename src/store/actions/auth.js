import * as actionsTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionsTypes.AUTH_START,
  }
}

export const authSuccess = (token, userId) => {
  return {
    type: actionsTypes.AUTH_SUCCESS,
    token,
    userId,
  }
}

export const authFail = (error) => {
  return {
    type: actionsTypes.AUTH_FAIL,
    error,
  }
}
//firebase через 3600 секун разлогинивает пользователя, поэтому созададим
//actionCreator для этого и вызовем его после успешного логина
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionsTypes.AUTH_LOGOUT,
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, +expirationTime * 1000)
  }
}

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCF5C-DBoKMUhRrvk_OJI7El4JInjBMeMQ';
    if(!isSignUp) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCF5C-DBoKMUhRrvk_OJI7El4JInjBMeMQ';
    }
    axios.post(url, authData)
      .then(response => {
        console.log(response);
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId))
        dispatch(checkAuthTimeout(response.data.expiresIn))
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err.response.data.error))
      })
  }
}

export const setAuthRedirectPatch = (path) => {
  return {
    type: actionsTypes.SET_AUTH_REDIRECT_PATH,
    path,
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    const userId = localStorage.getItem('userId');
    if(!token) {
      dispatch(logout());
    } else {
      if(expirationDate > new Date()) {
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ))
      } else {
        dispatch(logout());
      }
    }
  }
}