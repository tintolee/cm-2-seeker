import * as types from './types';
import * as requestFromServer from './crud';
import {callTypes} from './reducers';

export const fetchSeeker = (seekerId) => (dispatch) => {
  if (!seekerId) {
    return dispatch({
      type: types.SEEKERS_SEEKER_FETCHED,
      payload: {seeker: undefined},
    });
  }
  dispatch({
    type: types.SEEKERS_START_CALL,
    payload: {callType: callTypes.action},
  });

  //Fetch active seeker
  const queryParams = {
    filterRouteMaps: {status: {eq: 1}},
    filterPosts: {status: {eq: 1}},
    filterFriends: {status: {eq: 1}},
  };

  return requestFromServer
    .getSeekerById(seekerId, queryParams)
    .then((response) => {
      const seeker = response.data.getSeeker;
      dispatch({
        type: types.SEEKERS_SEEKER_FETCHED,
        payload: {seeker},
      });
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't find provider";
      dispatch({
        type: types.SEEKERS_CATCH_ERROR,
        payload: {error, callType: callTypes.action},
      });
    });
};

export const fetchFriendshipRequests = ({recipientId, requesterId}) => {
  //Fetch active requests
  const queryParams = {
    filter: {recipientId: {eq: recipientId}, requesterId: {eq: requesterId}},
  };

  return requestFromServer.getFriendshipRequestsByRecipient(queryParams);
};

export const fetchRouteMap = (routeMapId) => (dispatch) => {
  if (!routeMapId) {
    return dispatch({
      type: types.SEEKERS_ROUTEMAP_FETCHED,
      payload: {routeMapDetail: undefined},
    });
  }
  dispatch({
    type: types.SEEKERS_START_CALL,
    payload: {callType: callTypes.action},
  });

  //Fetch active posts
  const queryParams = {filter: {status: {eq: 1}}};

  return requestFromServer
    .getRouteMapById(routeMapId, queryParams)
    .then((response) => {
      const routeMap = response.data.getRouteMap;
      dispatch({
        type: types.SEEKERS_ROUTEMAP_FETCHED,
        payload: {routeMap},
      });
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't find route map";
      dispatch({
        type: types.SEEKERS_CATCH_ERROR,
        payload: {error, callType: callTypes.action},
      });
    });
};

export const updateFriendship = (seekerFriendship, callBack) => (dispatch) => {
  //   dispatch({
  //     type: types.PROFILE_START_CALL,
  //     payload: {callType: callTypes.action},
  //   });
  return requestFromServer
    .updateFriendship(seekerFriendship)
    .then(() => {
      dispatch({
        type: types.SEEKERS_FRIENDSHIP_UPDATED,
        payload: {seekerFriendship},
      });
    })
    .then(() => {
      if (callBack) {
        callBack();
      }
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't update Friendship";
      dispatch({
        type: types.SEEKERS_CATCH_ERROR,
        payload: {error, callType: callTypes.action},
      });
    });
};

export const updateFriendshipRequest =
  (friendshipRequest, callBack) => (dispatch) => {
    //   dispatch({
    //     type: types.PROFILE_START_CALL,
    //     payload: {callType: callTypes.action},
    //   });
    return requestFromServer
      .updateFriendshipRequest(friendshipRequest)
      .then(() => {
        dispatch({
          type: types.SEEKERS_FRIENDSHIP_REQUESTER_UPDATED,
          payload: {friendshipRequest},
        });
      })
      .then(() => {
        if (callBack) {
          callBack();
        }
      })
      .catch((error) => {
        console.log(error);

        error.clientMessage = "Can't update Friendship Request";
        dispatch({
          type: types.SEEKERS_CATCH_ERROR,
          payload: {error, callType: callTypes.action},
        });
      });
  };

export const createFriendship =
  (seekerFriendshipForCreation, callBack) => (dispatch) => {
    // dispatch({
    //   type: types.PROFILE_START_CALL,
    //   payload: {callType: callTypes.action},
    // });
    return requestFromServer
      .createFriendship(seekerFriendshipForCreation)
      .then((response) => {
        const friendship = response.data.createFriendship;
        dispatch({
          type: types.SEEKERS_FRIENDSHIP_CREATED,
          payload: {friendship},
        });
      })
      .then(() => {
        if (callBack) {
          callBack();
        }
      })
      .catch((error) => {
        console.log(error);

        error.clientMessage = "Can't create Seeker Friendship";
        dispatch({
          type: types.SEEKERS_CATCH_ERROR,
          payload: {error, callType: callTypes.action},
        });
      });
  };

export const createFriendshipRequest =
  (friendshipRequestForCreation, callBack) => (dispatch) => {
    return requestFromServer
      .createFriendshipRequest(friendshipRequestForCreation)
      .then((response) => {
        const friendshipRequest = response.data.createFriendshipRequest;
        dispatch({
          type: types.SEEKERS_FRIENDSHIP_REQUEST_CREATED,
          payload: {friendshipRequest},
        });
      })
      .then(() => {
        if (callBack) {
          callBack();
        }
      })
      .catch((error) => {
        console.log(error);

        error.clientMessage = "Can't create Seeker Friendship Request";
        dispatch({
          type: types.SEEKERS_CATCH_ERROR,
          payload: {error, callType: callTypes.action},
        });
      });
  };

export const clear = () => (dispatch) => {
  dispatch({
    type: types.SEEKERS_CLEAR,
  });
};
