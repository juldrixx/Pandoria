import { DUMMY_SUCCESS, DUMMY_FAILURE } from "../constants";
import { dummyService } from "../services";

export const dummyActions = {
  dummyGet,
}

function dummyGet() {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      dummyService.get()
        .then(payload => {
          dispatch({ type: DUMMY_SUCCESS, payload });
          resolve('DUMMY SUCCEED');
        })
        .catch(error => {
          dispatch({ type: DUMMY_FAILURE, payload: { dummyError: error } })
          reject('DUMMY FAILED');
        });
    });
  };
};