import { DUMMY_SUCCESS, DUMMY_FAILURE } from '../constants/actionTypes';

const INITIAL_STATE = {
  dummyResult: '',
  dummyError: '',
};

function dummyReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case DUMMY_SUCCESS:
      return {
        ...state,
        dummyResult: action.payload.dummyResult,
      };
    case DUMMY_FAILURE:
      return {
        ...state,
        dummyError: action.payload.dummyError,
      };
    default:
      return state;
  }
}

export default dummyReducer;