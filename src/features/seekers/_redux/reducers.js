import createReducer from '../../../lib/createReducer';
import * as types from './types';

const initialState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  seekerDetail: undefined,
  routeMapDetail: undefined,
};

export const callTypes = {
  list: 'list',
  action: 'action',
};

export const seekersReducer = createReducer(initialState, {
  [types.SEEKERS_CATCH_ERROR](state, action) {
    state.error = `${action.type}: ${action.payload.error}`;
    state.seekerDetail = undefined;
    state.routeMapDetail = undefined;
    if (action.payload.callType === callTypes.list) {
      state.listLoading = false;
    } else {
      state.actionsLoading = false;
    }
    return {
      ...state,
    };
  },
  [types.SEEKERS_START_CALL](state, action) {
    state.error = null;
    if (action.payload.callType === callTypes.list) {
      state.listLoading = true;
    } else {
      state.actionsLoading = true;
    }
    return {
      ...state,
    };
  },
  [types.SEEKERS_SEEKER_FETCHED](state, action) {
    const {seeker} = action.payload;

    state.seekerDetail = seeker;
    state.error = null;
    state.actionsLoading = false;
    return {
      ...state,
    };
  },
  [types.SEEKERS_ROUTEMAP_FETCHED](state, action) {
    const {routeMap} = action.payload; 

    routeMap?.posts?.items.sort(function (x, y) {
      let a = new Date(y.createdAt),
        b = new Date(x.createdAt);
      return a - b;
    });

    state.routeMapDetail = routeMap;
    state.error = null;
    state.actionsLoading = false;

    return {
      ...state,
    };
  },
  [types.SEEKERS_CLEAR]() {
    return initialState;
  },
});
