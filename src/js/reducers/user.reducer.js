import { LOGIN_USER, LOGIN_ERROR, LOGOUT_USER } from '../constants';

const user = JSON.parse(localStorage.getItem('user'));
const INITIAL_STATE = {
  logged: (user) ? true : false,
  info: (user) ? user : {},
  loginError: false,
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        logged: true,
        infos: action.payload,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        logged: false,
        infos: {},
        loginError: true,
      };

    case LOGOUT_USER:
      return {
        ...state,
        logged: false,
        infos: {},
      };

    default:
      return state;
  }
}

export default userReducer;