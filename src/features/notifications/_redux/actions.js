import * as types from './types';
import * as requestFromServer from './crud';
import {callTypes} from './reducers';
export const fetchNotifications = () => (dispatch) => {
  dispatch({
    type: types.NOTIFICATIONS_START_CALL,
    payload: {callType: callTypes.list},
  });

  return requestFromServer
    .getNotifications()
    .then((response) => {
      const {items} = response.data.listNotifications;

      //dispatch here
      //use type name NOTIFICATIONS_NOTIFICATIONS_FETCHED
    })
    .catch((error) => {
      error.clientMessage = "Can't find notifications";
      dispatch({
        type: types.NOTIFICATIONS_CATCH_ERROR,
        payload: {error, callType: callTypes.list},
      });
    });
};
