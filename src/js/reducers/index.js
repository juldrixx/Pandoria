// A reducer is used if an action is send an the payload needs to be put in the global state
// Name your file: XXXX.reducer.js
// And export it with: xxxx: XXXX: xxxxReducer
import { combineReducers } from 'redux';
import dummyReducer from './dummy.reducer';

export default combineReducers({
  dummy: dummyReducer,
});