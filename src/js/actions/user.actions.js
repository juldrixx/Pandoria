import {
  LOGIN_USER,
  LOGIN_ERROR,
  LOGOUT_USER
} from "../constants";
import { userService } from "../services";
import { history } from "../utils";

export const userActions = {
  login,
  logout,
};

function login(username, password) {
  return function (dispatch) {
    userService.login(username, password)
      .then(payload => {
        dispatch({ type: LOGIN_USER, payload });
        history.replace('/');
      })
      .catch(error => {
        dispatch({ type: LOGIN_ERROR, payload: {} })
      });
  }
};

function logout() {
  return function (dispatch) {
    dispatch({ type: LOGOUT_USER, payload: userService.logout() });
    history.replace('/login');
  }
};