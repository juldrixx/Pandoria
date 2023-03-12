// An action is used if you have to change the global state (redux one) and that the action result will be process/caught by a reducer
// Name your file: XXXX.actions.js
// And export it with: import XXXXActions from './XXXX.actions'

import themeActions from './theme.actions';
import userActions from './user.actions';

export default { themeActions, userActions };
