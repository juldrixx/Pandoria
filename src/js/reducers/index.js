// A reducer is used if an action is send an the payload needs to be put in the global state
// Name your file: XXXX.reducer.js
// And export it with: xxxx: XXXX: xxxxReducer
import { combineReducers } from 'redux';
import userReducer from './user.reducer';

export default combineReducers({
  user: userReducer,
});