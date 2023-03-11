import { CHANGE_THEME } from '../constants/actions';

const dark = localStorage.getItem('dark');
const INITIAL_STATE = {
  dark: dark === 'true',
};

function themeReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        dark: action.payload,
      };

    default:
      return state;
  }
}

export default themeReducer;
