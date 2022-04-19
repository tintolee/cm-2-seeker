import * as types from './types';
import * as requestFromServer from './crud';
import {callTypes} from './reducers';
export const fetchOpportunities = () => (dispatch) => {
  dispatch({
    type: types.OPPORTUNITY_START_CALL,
    payload: {callType: callTypes.list},
  });

  //Fetch active opportunities
  const queryParams = {filter: {status: {eq: 1}}};

  return requestFromServer
    .getOpportunities(queryParams)
    .then((response) => {
      const {items} = response.data.listOpportunitys;
      dispatch({
        type: types.OPPORTUNITY_OPPORTUNITIES_FETCHED,
        payload: {items},
      });
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't find opportunities";
      dispatch({
        type: types.OPPORTUNITY_CATCH_ERROR,
        payload: {error, callType: callTypes.list},
      });
    });
};

export const fetchOpportunity = (opportunityId) => (dispatch) => {
  if (!opportunityId) {
    return dispatch({
      type: types.OPPORTUNITY_FETCHED,
      payload: {opportunity: undefined},
    });
  }
  dispatch({
    type: types.OPPORTUNITY_START_CALL,
    payload: {callType: callTypes.action},
  });

  //Fetch active attendees
  const queryParams = {filter: {status: {eq: 1}}};

  return requestFromServer
    .getOpportunity(opportunityId, queryParams)
    .then((response) => {
      const opportunity = response.data.getOpportunity;
      dispatch({
        type: types.OPPORTUNITY_FETCHED,
        payload: {opportunity},
      });
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't find opportunity";
      dispatch({
        type: types.OPPORTUNITY_CATCH_ERROR,
        payload: {error, callType: callTypes.action},
      });
    });
};

export const createOpportunityAttendee =
  (attendeeForCreation) => (dispatch) => {
    dispatch({
      type: types.OPPORTUNITY_START_CALL,
      payload: {callType: callTypes.action},
    });
    return requestFromServer.createOpportunityAttendee(attendeeForCreation);
  };

export const updateOpportunityAttendee =
  (opportunityAttendee) => (dispatch) => {
    dispatch({
      type: types.OPPORTUNITY_START_CALL,
      payload: {callType: callTypes.action},
    });
    return new Promise((resolve) => {
      resolve(
        requestFromServer
          .updateOpportunityAttendee(opportunityAttendee)
          .then(() => {
            dispatch({
              type: types.OPPORTUNITY_ATTENDEE_UPDATED,
              payload: {opportunityAttendee},
            });
          })
          .catch((error) => {
            console.log(error);

            error.clientMessage = "Can't update Opportunity Attendee";
            dispatch({
              type: types.OPPORTUNITY_CATCH_ERROR,
              payload: {error, callType: callTypes.action},
            });
          }),
      );
    });
  };

export const likeResource = (dt) => (dispatch) => {
  const {resourceUpdated, postType} = dt;

  return requestFromServer
    .likeResource(resourceUpdated)
    .then((d) => {
      let newLike = d.data.likeResource,
        type = null;
      dispatch({
        type: types.OPPORTUNITY_RESOURCE_UPDATED,
        payload: {type: 'like', data: newLike},
      });
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't like Resource";
      dispatch({
        type: types.OPPORTUNITY_CATCH_ERROR,
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
      dispatch({
        type: types.OPPORTUNITY_RESOURCE_UPDATED,
        payload: {type: 'unlike', data: resourceUpdated},
      });
    })
    .catch((error) => {
      console.log('error in unlike resource: ', error);

      error.clientMessage = "Can't like Resource";
      dispatch({
        type: types.OPPORTUNITY_CATCH_ERROR,
        payload: {error, callType: callTypes.action},
      });
    });
};

export const clear = () => (dispatch) => {
  dispatch({
    type: types.OPPORTUNITY_CLEAR,
  });
};
