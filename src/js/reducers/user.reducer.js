import { LOGIN_USER, LOGIN_ERROR, LOGOUT_USER } from '../constants/actions';

const user = JSON.parse(localStorage.getItem('user'));
const INITIAL_STATE = {
  logged: !!user,
  info: user || {},
  loginError: false,
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        logged: true,
        info: action.payload,
        loginError: false,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        logged: false,
        info: {},
        loginError: true,
      };

    case LOGOUT_USER:
      return {
        ...state,
        logged: false,
        info: {},
      };

    default:
      return state;
  }
}

export default userReducer;
