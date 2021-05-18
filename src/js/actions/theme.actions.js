import {
  CHANGE_THEME,
} from "../constants";
import { themeService } from "../services";

export const themeActions = {
  changeTheme,
};

function changeTheme(dark) {
  return function (dispatch) {
    dispatch({ type: CHANGE_THEME, payload: themeService.changeTheme(dark) });
  }
};