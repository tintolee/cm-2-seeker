import * as types from './types';
import * as requestFromServer from './crud';
import {callTypes} from './reducers';
export const fetchRouteMaps = (userId) => (dispatch) => {
  if (!userId) {
    return dispatch({
      type: types.ROUTEMAPS_FETCHED,
      payload: {items: []},
    });
  }
  dispatch({
    type: types.ROUTEMAPS_START_CALL,
    payload: {callType: callTypes.list},
  });

  //Fetch active route maps
  const queryParams = {
    filter: {status: {eq: 1}},
    filterPosts: {status: {eq: 1}},
  };

  return requestFromServer
    .getRouteMaps(userId, queryParams)
    .then((response) => {
      if (!response.data.getSeeker) {
        return dispatch({
          type: types.ROUTEMAPS_FETCHED,
          payload: {items: []},
        });
      }

      const {items} = response.data.getSeeker.routeMaps;

      dispatch({
        type: types.ROUTEMAPS_FETCHED,
        payload: {items},
      });
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't find route maps";
      dispatch({
        type: types.ROUTEMAPS_CATCH_ERROR,
        payload: {error, callType: callTypes.list},
      });
    });
};

export const fetchRouteMap = (routeMapId) => (dispatch) => {
  if (!routeMapId) {
    return dispatch({
      type: types.ROUTEMAP_FETCHED,
      payload: {routeMapDetail: undefined},
    });
  }
  dispatch({
    type: types.ROUTEMAPS_START_CALL,
    payload: {callType: callTypes.action},
  });

  //Fetch active posts
  const queryParams = {filter: {status: {eq: 1}}};

  return requestFromServer
    .getRouteMapById(routeMapId, queryParams)
    .then((response) => {
      const routeMap = response.data.getRouteMap;
      dispatch({
        type: types.ROUTEMAP_FETCHED,
        payload: {routeMap},
      });
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't find route map";
      dispatch({
        type: types.ROUTEMAPS_CATCH_ERROR,
        payload: {error, callType: callTypes.action},
      });
    });
};

export const createRouteMap = (routeMapForCreation) => (dispatch) => {
  dispatch({
    type: types.ROUTEMAPS_START_CALL,
    payload: {callType: callTypes.action},
  });
  return requestFromServer
    .createRouteMap(routeMapForCreation)
    .then((response) => {
      console.log(response);

      const {routeMap} = response.data.createRouteMap;
      dispatch({
        type: types.ROUTEMAPS_CREATED,
        payload: {routeMap},
      });
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't create route map";
      dispatch({
        type: types.ROUTEMAPS_CATCH_ERROR,
        payload: {error, callType: callTypes.action},
      });
    });
};

export const updateRouteMap = (routeMap) => (dispatch) => {
  dispatch({
    type: types.ROUTEMAPS_START_CALL,
    payload: {callType: callTypes.action},
  });
  return requestFromServer
    .updateRouteMap(routeMap)
    .then(() => {
      dispatch({
        type: types.ROUTEMAP_UPDATED,
        payload: {routeMap},
      });
    })
    .catch((error) => {
      console.log(error);

      error.clientMessage = "Can't update RouteMap";
      dispatch({
        type: types.ROUTEMAPS_CATCH_ERROR,
        payload: {error, callType: callTypes.action},
      });
    });
};

export const fetchRouteMapCategories = () => (dispatch) => {
  return requestFromServer.getRouteMapCategories();
};

export const clear = () => (dispatch) => {
  dispatch({
    type: types.ROUTEMAPS_CLEAR,
  });
};
