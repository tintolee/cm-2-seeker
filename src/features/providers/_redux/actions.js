import * as types from './types';
import * as requestFromServer from './crud';
import {callTypes} from './reducers';

export const fetchProvider = (providerId, seekerId) => (dispatch) => {
  if (!providerId) {
    return dispatch({
      type: types.PROVIDER_FETCHED,
      payload: {provider: undefined},
    });
  }
  dispatch({
    type: types.PROVIDERS_START_CALL,
    payload: {callType: callTypes.action},
  });

  //Fetch active followers and opportunities
  const queryParams = {
    filterFollowers: {status: {eq: 1}},
    filterOpportunities: {status: {eq: 1}},
    filterContents: {status: {eq: 1}},
  };

  return requestFromServer
    .getProviderById(providerId, queryParams)
    .then((response) => {
      const provider = response.data.getOpportunityProvider;
      dispatch({
        type: types.PROVIDER_FETCHED,
        payload: {provider, seekerId},
      });
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't find provider";
      dispatch({
        type: types.PROVIDERS_CATCH_ERROR,
        payload: {error, callType: callTypes.action},
      });
    });
};

export const createProviderFollower =
  (providerFollowerForCreation, callBack) => (dispatch) => {
    return requestFromServer
      .createOpportunityProviderFollower(providerFollowerForCreation)
      .then((response) => {
        const providerFollower =
          response.data.createOpportunityProviderFollower;
        dispatch({
          type: types.PROVIDER_FOLLOWER_UPDATED,
          payload: {providerFollower},
        });
      })
      .then(() => {
        if (callBack) {
          callBack();
        }
      })
      .catch((error) => {
        console.log(error);

        error.clientMessage = "Can't update Provider Follower";
        dispatch({
          type: types.PROVIDERS_CATCH_ERROR,
          payload: {error, callType: callTypes.action},
        });
      });
  };

export const updateProviderFollower =
  (providerFollower, callBack) => (dispatch) => {
    return requestFromServer
      .updateOpportunityProviderFollower(providerFollower)
      .then(() => {
        dispatch({
          type: types.PROVIDER_FOLLOWER_UPDATED,
          payload: {providerFollower},
        });
      })
      .then(() => {
        if (callBack) {
          callBack();
        }
      })
      .catch((error) => {
        console.log(error);

        error.clientMessage = "Can't update Provider Follower";
        dispatch({
          type: types.PROVIDERS_CATCH_ERROR,
          payload: {error, callType: callTypes.action},
        });
      });
  };

export const clear = () => (dispatch) => {
  dispatch({
    type: types.PROVIDERS_CLEAR,
  });
};
