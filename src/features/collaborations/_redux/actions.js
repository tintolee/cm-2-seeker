import * as types from './types';
import * as discoverActions from '../../discover/_redux/actions';
import * as requestFromServer from './crud';
import {callTypes} from './reducers';
export const fetchCollaborations = () => (dispatch) => {
  dispatch({
    type: types.COLLABORATION_START_CALL,
    payload: {callType: callTypes.list},
  });

  //Fetch active collaborations
  const queryParams = {filter: {status: {eq: 1}}};

  return requestFromServer
    .getCollaborations(queryParams)
    .then((response) => {
      const {items} = response.data.listCollaborations;
      dispatch({
        type: types.COLLABORATION_COLLABORATIONS_FETCHED,
        payload: {items},
      });
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't find collaborations";
      dispatch({
        type: types.COLLABORATION_CATCH_ERROR,
        payload: {error, callType: callTypes.list},
      });
    });
};

export const fetchCollaboration = (collaborationId) => (dispatch) => {
  if (!collaborationId) {
    return dispatch({
      type: types.COLLABORATION_FETCHED,
      payload: {collaborationDetail: undefined},
    });
  }
  dispatch({
    type: types.COLLABORATION_START_CALL,
    payload: {callType: callTypes.action},
  });

  //Fetch active attendees
  const queryParams = {filter: {status: {eq: 1}}};

  return requestFromServer
    .getCollaboration(collaborationId, queryParams)
    .then((response) => {
      const collaboration = response.data.getCollaboration;
      dispatch({
        type: types.COLLABORATION_FETCHED,
        payload: {collaboration},
      });
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't find collaboration";
      dispatch({
        type: types.COLLABORATION_CATCH_ERROR,
        payload: {error, callType: callTypes.action},
      });
    });
};

export const createCollaboration =
  (collaborationForCreation, callBack) => (dispatch) => {
    dispatch({
      type: types.COLLABORATION_START_CALL,
      payload: {callType: callTypes.action},
    });
    return requestFromServer
      .createCollaboration(collaborationForCreation)
      .then((response) => {
        const collaboration = response.data.createCollaboration;
        dispatch({
          type: types.COLLABORATION_CREATED,
          payload: {collaboration},
        });
        if (callBack) {
          callBack(collaboration);
        }
      })
      .catch((error) => {
        error.clientMessage = "Can't create Collaboration";
        dispatch({
          type: types.COLLABORATION_CATCH_ERROR,
          payload: {error, callType: callTypes.action},
        });
      });
  };

export const likeResource = (dt) => (dispatch) => {
  const {resourceUpdated, postType} = dt;

  return requestFromServer
    .likeResource(resourceUpdated)
    .then((d) => {
      let newLike = d.data.likeResource;
      console.log('newLike in collaborations likeResource: ', newLike);
      dispatch({
        type: types.COLLABORATION_RESOURCE_UPDATED,
        payload: {type: 'like', data: newLike},
      });
      fetchCollaboration(resourceUpdated.collaborationId);

      //Update discover state
      dispatch(discoverActions.likeResource(dt));
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

      dispatch({
        type: types.COLLABORATION_RESOURCE_UPDATED,
        payload: {type: 'unlike', data: resourceUpdated},
      });

      //Update discover state
      dispatch(discoverActions.unlikeResource(dt));
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

export const updateCollaboration = (collaboration, callBack) => (dispatch) => {
  dispatch({
    type: types.COLLABORATION_START_CALL,
    payload: {callType: callTypes.action},
  });
  return requestFromServer
    .updateCollaboration(collaboration)
    .then((response) => {
      dispatch({
        type: types.COLLABORATION_UPDATED,
        payload: {collaboration},
      });
    })
    .then(() => {
      if (callBack) {
        callBack();
      }
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't update Collaboration";
      dispatch({
        type: types.COLLABORATION_CATCH_ERROR,
        payload: {error, callType: callTypes.action},
      });
    });
};

export const createCollaborationMember = (memberForCreation) => {
  return requestFromServer.createCollaborationMember(memberForCreation);
};

export const updateCollaborationMember = (collaborationMember) => {
  return requestFromServer.updateCollaborationMember(collaborationMember);
};

export const clear = () => (dispatch) => {
  dispatch({
    type: types.COLLABORATION_CLEAR,
  });
};
