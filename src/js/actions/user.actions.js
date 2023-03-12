import { LOGIN_ERROR, LOGIN_USER, LOGOUT_USER } from '../constants/actions';
import { userService } from '../services';

function login(username, password) {
  return function func(dispatch) {
    userService
      .login(username, password)
      .then((payload) => {
        dispatch({ type: LOGIN_USER, payload });
      })
      .catch(() => {
        dispatch({ type: LOGIN_ERROR, payload: {} });
      });
  };
}

function logout() {
  return function func(dispatch) {
    dispatch({ type: LOGOUT_USER, payload: userService.logout() });
  };
}

export default {
  login,
  logout,
};
