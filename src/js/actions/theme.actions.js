import { CHANGE_THEME } from '../constants/actions';
import { themeService } from '../services';

function changeTheme(dark) {
  return function func(dispatch) {
    dispatch({
      type: CHANGE_THEME,
      payload: themeService.changeTheme(dark),
    });
  };
}

export default {
  changeTheme,
};
