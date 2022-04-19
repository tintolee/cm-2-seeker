import * as types from './types';
import * as requestFromServer from './crud';
import {callTypes} from './reducers';

export const fetchMyOpportunities = (seekerId, searchValue) => (dispatch) => {
  dispatch({
    type: types.PROFILE_START_CALL,
    payload: {callType: callTypes.list},
  });

  //Fetch active opportunities
  const queryParams = {filter: {status: {eq: 1}}};

  return requestFromServer
    .getMyOpportunities(seekerId, queryParams)
    .then((response) => {
      const {opportunities} = response.data.getSeeker;
      dispatch({
        type: types.PROFILE_MY_OPPORTUNITIES_FETCHED,
        payload: {opportunities},
      });
    })
    .catch((error) => {
      error.clientMessage = "Can't find opportunities";
      dispatch({
        type: types.PROFILE_CATCH_ERROR,
        payload: {error, callType: callTypes.list},
      });
    });
};

export const fetchMyCollaborations = (seekerId) => (dispatch) => {
  dispatch({
    type: types.PROFILE_START_CALL,
    payload: {callType: callTypes.list},
  });

  //Fetch active Collaborations
  const queryParams = {filter: {status: {eq: 1}}};

  return requestFromServer
    .getMyCollaborations(seekerId, queryParams)
    .then((response) => {
      const {collaborations, collaborationMembers} = response.data.getSeeker;
      dispatch({
        type: types.PROFILE_MY_COLLABORATIONS_FETCHED,
        payload: {collaborations, collaborationMembers},
      });
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't find Collaborations";
      dispatch({
        type: types.PROFILE_CATCH_ERROR,
        payload: {error, callType: callTypes.list},
      });
    });
};

export const fetchSeekerProfile = (id) => (dispatch) => {
  dispatch({
    type: types.PROFILE_START_CALL,
    payload: {callType: callTypes.list},
  });

  const queryParams = {
    filterRouteMaps: {status: {eq: 1}},
    filterPosts: {status: {eq: 1}},
    filterFriends: {status: {eq: 1}},
  };

  return requestFromServer
    .getSeeker(id, queryParams)
    .then((response) => {
      const seeker = response.data.getSeeker;
      dispatch({
        type: types.GET_SEEKER_PROFILE,
        payload: {seeker},
      });
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't list user";
      dispatch({
        type: types.PROFILE_CATCH_ERROR,
        payload: {error, callType: callTypes.action},
      });
    });
};

export const fetchSeekerPosts = (seekerId) => (dispatch) => {
  if (!seekerId) {
    return dispatch({
      type: types.PROFILE_START_CALL,
    });
  }

  //Fetch active posts
  const queryParams = {filter: {status: {eq: 1}}};

  return requestFromServer
    .getSeekerPosts(seekerId, queryParams)
    .then((response) => {
      const {items} = response.data.getSeeker.posts;
      dispatch({
        type: types.PROFILE_POSTS_FETCHED,
        payload: {items},
      });
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't find any posts";
      dispatch({
        type: types.PROFILE_CATCH_ERROR,
        payload: {error, callType: callTypes.action},
      });
    });
};

export const likeResource =
  (dt) => (dispatch) => {
    dispatch({
      type: types.PROFILE_START_CALL,
      payload: {callType: callTypes.action},
    });
    const {resourceUpdated, postType} = dt;
    return requestFromServer
      .likeResource(resourceUpdated)
      .then((d) => {
       
       let newLike  = d.data.likeResource;
       
        dispatch({
          type: types.PROFILE_RESOURCE_UPDATED,
          payload: {type: "like", data: newLike},
        });
      })
      .catch((error) => {
        console.log(error);

        error.clientMessage = "Can't like Resource";
        dispatch({
          type: types.PROFILE_CATCH_ERROR,
          payload: {error, callType: callTypes.action},
        });
      });
  };

  export const unlikeResource =
  (dt) => (dispatch) => {
    dispatch({
      type: types.PROFILE_START_CALL,
      payload: {callType: callTypes.action},
    });
    const {resourceUpdated, postType} = dt;
    return requestFromServer
      .unlikeResource({id: resourceUpdated.resourceId})
      .then(() => {
      
        dispatch({
          type: types.PROFILE_RESOURCE_UPDATED,
          payload: {type: "unlike", data: resourceUpdated},
        });
      })
      .catch((error) => {
        console.log("error in unlike resource: ",error);

        error.clientMessage = "Can't like Resource";
        dispatch({
          type: types.PROFILE_CATCH_ERROR,
          payload: {error, callType: callTypes.action},
        });
      });
  };

export const updateSeeker = (seekerUpdated) => (dispatch) => {
  dispatch({
    type: types.PROFILE_START_CALL,
    payload: {callType: callTypes.action},
  });
  return new Promise((resolve) => {
    resolve(
      requestFromServer
        .updateSeeker(seekerUpdated)
        .then((response) => {
          const seeker = response.data.updateSeeker;
          // dispatch({
          //   type: types.PROFILE_UPDATED,
          //   payload: {seeker},
          // });
        })
        .catch((error) => {
          console.log(error);
          error.clientMessage = 'Cannot update ';
          dispatch({
            type: types.PROFILE_CATCH_ERROR,
            payload: {error, callType: callTypes.action},
          });
        }),
    );
  });
};

export const fetchConnectionProviders = (seekerId) => (dispatch) => {
  dispatch({
    type: types.PROFILE_START_CALL,
    payload: {callType: callTypes.list},
  });

  //Fetch following providers
  const queryParams = {filter: {seekerId: {eq: seekerId}, status: {eq: 1}}};

  return requestFromServer
    .getConnectionProviders(queryParams)
    .then((response) => {
      const {items} = response.data.listOpportunityProviderFollowers;
      dispatch({
        type: types.PROFILE_CONNECTION_PROVIDERS_FETCHED,
        payload: {providers: items},
      });
    })
    .catch((error) => {
      error.clientMessage = "Can't find connection providers";
      dispatch({
        type: types.PROFILE_CATCH_ERROR,
        payload: {error, callType: callTypes.list},
      });
    });
};

export const fetchConnectionSeekers = (seekerId) => (dispatch) => {
  dispatch({
    type: types.PROFILE_START_CALL,
    payload: {callType: callTypes.list},
  });

  //Fetch active connection friendship
  const queryParams = {filter: {status: {eq: 1}}};

  return requestFromServer
    .getFriendshipSeekers(seekerId, queryParams)
    .then((response) => {
      const {friends} = response.data.getSeeker;
      dispatch({
        type: types.PROFILE_CONNECTION_SEEKERS_FETCHED,
        payload: {friends},
      });
    })
    .catch((error) => {
      error.clientMessage = "Can't find friends";
      dispatch({
        type: types.PROFILE_CATCH_ERROR,
        payload: {error, callType: callTypes.list},
      });
    });
};

export const fetchFriendshipRequests = (seekerId) => (dispatch) => {
  dispatch({
    type: types.PROFILE_START_CALL,
    payload: {callType: callTypes.list},
  });

  //Fetch active requests
  const queryParams = {filter: {recipientId: {eq: seekerId}, status: {eq: 1}}};

  return requestFromServer
    .getFriendshipRequestsByRecipient(queryParams)
    .then((response) => {
      // console.log(response);
      const {items} = response.data.listFriendshipRequests;
      dispatch({
        type: types.PROFILE_FRIENDSHIP_REQUESTERS_FETCHED,
        payload: {requests: items},
      });
    })
    .catch((error) => {
      error.clientMessage = "Can't find friendship requesters";
      dispatch({
        type: types.PROFILE_CATCH_ERROR,
        payload: {error, callType: callTypes.list},
      });
    });
};

export const updateFriendship = (seekerFriendship, callBack) => (dispatch) => {
  return requestFromServer
    .updateFriendship(seekerFriendship)
    .then(() => {
      dispatch({
        type: types.PROFILE_FRIENDSHIP_UPDATED,
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
        type: types.PROFILE_CATCH_ERROR,
        payload: {error, callType: callTypes.action},
      });
    });
};

export const updateFriendshipRequest =
  (friendshipRequest, callBack) => (dispatch) => {
    return requestFromServer
      .updateFriendshipRequest(friendshipRequest)
      .then(() => {
        dispatch({
          type: types.PROFILE_FRIENDSHIP_REQUESTER_UPDATED,
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
          type: types.PROFILE_CATCH_ERROR,
          payload: {error, callType: callTypes.action},
        });
      });
  };

export const createFriendship =
  (seekerFriendshipForCreation, callBack) => (dispatch) => {
    return requestFromServer
      .createFriendship(seekerFriendshipForCreation)
      .then((response) => {
        const friendship = response.data.createFriendship;
        dispatch({
          type: types.PROFILE_FRIENDSHIP_CREATED,
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
          type: types.PROFILE_CATCH_ERROR,
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
          type: types.PROFILE_FRIENDSHIP_REQUEST_CREATED,
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
          type: types.PROFILE_CATCH_ERROR,
          payload: {error, callType: callTypes.action},
        });
      });
  };

export const fetchFriendshipFromFriend = (seekerId, userId) => {
  //Fetch active connection friendship
  const queryParams = {filter: {status: {eq: 1}}, friendId: {eq: userId}};

  return requestFromServer.getFriendshipSeekers(seekerId, queryParams);
};

export const clear = () => (dispatch) => {
  dispatch({
    type: types.PROFILE_CLEAR,
  });
};
