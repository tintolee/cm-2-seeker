import * as types from './types';
import * as requestFromServer from './crud';
import {callTypes} from './reducers';

export const fetchPost = (postId) => (dispatch) => {
  if (!postId) {
    return dispatch({
      type: types.POST_FETCHED,
      payload: {post: undefined},
    });
  }
  dispatch({
    type: types.POSTS_START_CALL,
    payload: {callType: callTypes.action},
  });

  //Fetch active post
  const queryParams = {filter: {status: {eq: 1}}};

  return requestFromServer
    .getPost(postId, queryParams)
    .then((response) => {
      const post = response.data.getPost;
      dispatch({
        type: types.POST_FETCHED,
        payload: {post},
      });
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't find post";
      dispatch({
        type: types.POSTS_CATCH_ERROR,
        payload: {error, callType: callTypes.action},
      });
    });
};

export const createPost = (postForCreation) => (dispatch) => {
  dispatch({
    type: types.POSTS_START_CALL,
    payload: {callType: callTypes.action},
  });
  return requestFromServer
    .createPost(postForCreation)
    .then((response) => {
      const {post} = response.data.createPost;
      dispatch({
        type: types.POST_CREATED,
        payload: {post},
      });
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't create post";
      dispatch({
        type: types.POSTS_CATCH_ERROR,
        payload: {error, callType: callTypes.action},
      });
    });
};

export const updatePost = (post) => (dispatch) => {
  dispatch({
    type: types.POSTS_START_CALL,
    payload: {callType: callTypes.action},
  });
  return requestFromServer
    .updatePost(post)
    .then(() => {
      dispatch({
        type: types.POST_UPDATED,
        payload: {post},
      });
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't update Post";
      dispatch({
        type: types.POSTS_CATCH_ERROR,
        payload: {error, callType: callTypes.action},
      });
    });
};

export const likeResource =
(dt) => (dispatch) => {
  const {resourceUpdated, postType} = dt;

  return requestFromServer
    .likeResource(resourceUpdated)
    .then((d) => {
     
     let newLike  = d.data.likeResource, type = null;
    dispatch({
        type: types.POST_RESOURCE_UPDATED,
        payload: {type: "like", data: newLike},
      });
    
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't like Resource";
      dispatch({
        type: types.POSTS_CATCH_ERROR,
        payload: {error, callType: callTypes.action},
      });
    });
};

export const unlikeResource =
(dt) => (dispatch) => {
  const {resourceUpdated, postType} = dt;
  return requestFromServer
    .unlikeResource({id: resourceUpdated.resourceId})
    .then(() => {
    
      let type = null;
     dispatch({
         type: types.POST_RESOURCE_UPDATED,
         payload: {type: "unlike", data: resourceUpdated},
       });
     
    })
    .catch((error) => {
      console.log("error in unlike resource: ",error);

      error.clientMessage = "Can't like Resource";
      dispatch({
        type: types.POSTS_CATCH_ERROR,
        payload: {error, callType: callTypes.action},
      });
    });
};

export const clear = () => (dispatch) => {
  dispatch({
    type: types.POSTS_CLEAR,
  });
};
