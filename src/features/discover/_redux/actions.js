import * as types from './types';
import * as requestFromServer from './crud';
import {callTypes} from './reducers';

export const insertRecentSearches = (value) => (dispatch) => {
  dispatch({
    type: types.DISCOVER_INSERT_RECENT_SEARCHES,
    payload: {searchValue: value},
  });
};

export function discoverSearch(value) {
  return async (dispatch) => {
    dispatch({
      type: types.DISCOVER_SEARCH_START_CALL,
      payload: {callType: callTypes.list},
    });

    const queryParams = {filter: {status: {eq: 1}, name: {contains: value}}};
    const queryParamsForOpportunity = {
      filter: {status: {eq: 1}, title: {contains: value}},
    };
    const queryParamsForSeeker = {
      filter: {status: {eq: 1}, firstName: {contains: value}},
    };
    const queryParamsForCollaborations = {
      filter: {status: {eq: 1}, title: {contains: value}},
    };

    await requestFromServer
      .fetchProviders(queryParams)
      .then((response) => {
        const {items} = response.data.listOpportunityProviders;

        dispatch({
          type: types.DISCOVER_PROVIDERS_SEARCHED,
          payload: {items},
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: types.DISCOVER_CATCH_ERROR,
          payload: {error, callType: callTypes.list},
        });
      });

    await requestFromServer
      .getOpportunities(queryParamsForOpportunity)
      .then((response) => {
        const {items} = response.data.listOpportunitys;
        dispatch({
          type: types.DISCOVER_OPPORTUNITIES_SEARCHED,
          payload: {items},
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: types.DISCOVER_CATCH_ERROR,
          payload: {error, callType: callTypes.list},
        });
      });

    await requestFromServer
      .getSeekers(queryParamsForSeeker)
      .then((response) => {
        const {items} = response.data.listSeekers;
        dispatch({
          type: types.DISCOVER_SEEKERS_SEARCHED,
          payload: {items},
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: types.DISCOVER_CATCH_ERROR,
          payload: {error, callType: callTypes.list},
        });
      });

    await requestFromServer
      .getCollaborations(queryParamsForCollaborations)
      .then((response) => {
        const {items} = response.data.listCollaborations;
        dispatch({
          type: types.DISCOVER_COLLABORATIONS_SEARCHED,
          payload: {items},
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: types.DISCOVER_CATCH_ERROR,
          payload: {error, callType: callTypes.list},
        });
      });
  };
}

export const createProviderNotExists = (providerNotExistsForCreation) => {
  return requestFromServer.createOpsNotInApp(providerNotExistsForCreation);
};

export const updateProviderNotExists = (providerNotExistsForUpdate) => {
  return requestFromServer.updateOpsNotInApp(providerNotExistsForUpdate);
};

export const fetchProviderNotExists = (name) => {
  //Fetch by name
  const queryParams = {filter: {name: {eq: name}}};

  return requestFromServer.getOpsNotInApps(queryParams);
};

export const fetchContents = () => (dispatch) => {
  //Fetch active contents
  const queryParams = {filter: {status: {eq: 1}}};

  return requestFromServer
    .getContents(queryParams)
    .then((response) => {
      const {items} = response.data.listContents;
      dispatch({
        type: types.DISCOVER_CONTENTS_FETCHED,
        payload: {items},
      });
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't find contents";
      dispatch({
        type: types.DISCOVER_CATCH_ERROR,
        payload: {error, callType: callTypes.list},
      });
    });
};

export const fetchOpportunities = () => (dispatch) => {
  //Fetch active opportunities
  const queryParams = {filter: {status: {eq: 1}}};

  return requestFromServer
    .getOpportunities(queryParams)
    .then((response) => {
      const {items} = response.data.listOpportunitys;
      dispatch({
        type: types.DISCOVER_OPPORTUNITIES_FETCHED,
        payload: {items},
      });
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't find opportunities";
      dispatch({
        type: types.DISCOVER_CATCH_ERROR,
        payload: {error, callType: callTypes.list},
      });
    });
};

export const fetchCollaborations = () => (dispatch) => {
  //Fetch active Collaborations
  const queryParams = {filter: {status: {eq: 1}}};

  return requestFromServer
    .getCollaborations(queryParams)
    .then((response) => {
      const {items} = response.data.listCollaborations;
      dispatch({
        type: types.DISCOVER_COLLABORATIONS_FETCHED,
        payload: {items},
      });
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't find collaborations";
      dispatch({
        type: types.DISCOVER_CATCH_ERROR,
        payload: {error, callType: callTypes.list},
      });
    });
};

export const fetchDiscover = () => (dispatch) => {
  dispatch({
    type: types.DISCOVER_FETCHED,
  });
};

export const clear = () => (dispatch) => {
  dispatch({
    type: types.DISCOVER_CLEAR,
  });
};

export const fetchConnectionPosts = (seekerId) => (dispatch) => {
  const queryParams = {
    filter: {status: {eq: 1}},
    filterPosts: {status: {eq: 1}},
  };

  return requestFromServer
    .getFriendshipSeekers(seekerId, queryParams)
    .then((response) => {
      const {friends} = response.data.getSeeker;
      // console.log(friends);
      dispatch({
        type: types.DISCOVER_CONNECTIONS_POSTS_FETCHED,
        payload: {friends},
      });
    })
    .catch((error) => {
      error.clientMessage = "Can't find connections";
      dispatch({
        type: types.DISCOVER_CATCH_ERROR,
        payload: {error, callType: callTypes.list},
      });
    });
};

export const likeResource = (dt) => (dispatch) => {
  const {resourceUpdated, postType} = dt;

  return requestFromServer
    .likeResource(resourceUpdated)
    .then((d) => {
      let newLike = d.data.likeResource,
        type = null;
      console.log('newLike in discover likeResource: ', newLike);
      if (postType === 'discover-collaboration') {
        type = types.DISCOVER_COLLABORATION_RESOURCE_UPDATED;
      } else if (postType === 'discover-opportunity') {
        type = types.DISCOVER_OPPORTUNITY_RESOURCE_UPDATED;
      } else if (postType === 'discover-connection') {
        type = types.DISCOVER_CONNECTION_RESOURCE_UPDATED;
      } else if (postType === 'discover-post') {
        type = types.DISCOVER_POST_RESOURCE_UPDATED;
      }
      if (type) {
        dispatch({
          type: type,
          payload: {type: 'like', data: newLike},
        });

        dispatch({
          type: types.DISCOVER_FETCHED,
        });
      }
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't like Resource";
      dispatch({
        type: types.DISCOVER_CATCH_ERROR,
        payload: {error, callType: callTypes.action},
      });
    });
};

export const unlikeResource = (dt) => (dispatch) => {
  const {resourceUpdated, postType} = dt;
  return requestFromServer
    .unlikeResource({id: resourceUpdated.resourceId})
    .then(() => {
      let type = null;
      if (postType === 'discover-collaboration') {
        type = types.DISCOVER_COLLABORATION_RESOURCE_UPDATED;
      } else if (postType === 'discover-opportunity') {
        type = types.DISCOVER_OPPORTUNITY_RESOURCE_UPDATED;
      } else if (postType === 'discover-connection') {
        type = types.DISCOVER_CONNECTION_RESOURCE_UPDATED;
      } else if (postType === 'discover-post') {
        type = types.DISCOVER_POST_RESOURCE_UPDATED;
      }

      if (type) {
        dispatch({
          type: type,
          payload: {type: 'unlike', data: resourceUpdated},
        });
      }
    })
    .catch((error) => {
      console.log('error in unlike resource: ', error);

      error.clientMessage = "Can't like Resource";
      dispatch({
        type: types.DISCOVER_CATCH_ERROR,
        payload: {error, callType: callTypes.action},
      });
    });
};
