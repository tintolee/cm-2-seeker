import createReducer from '../../../lib/createReducer';
import * as types from './types';

const initialState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: [],
  sorting: {
    sortOrder: 'desc', // asc||desc
    sortField: 'created',
  },
  routeMapCategories: [],
  routeMapDetail: undefined,
};

export const callTypes = {
  list: 'list',
  action: 'action',
};

export const routeMapsReducer = createReducer(initialState, {
  [types.ROUTEMAPS_CATCH_ERROR](state, action) {
    state.error = `${action.type}: ${action.payload.error}`;
    if (action.payload.callType === callTypes.list) {
      state.listLoading = false;
    } else {
      state.actionsLoading = false;
    }
    return {
      ...state,
    };
  },
  [types.ROUTEMAPS_START_CALL](state, action) {
    state.error = null;
    state.routeMapDetail = undefined;

    if (action.payload.callType === callTypes.list) {
      state.listLoading = true;
    } else {
      state.actionsLoading = true;
    }
    return {
      ...state,
    };
  },
  [types.ROUTEMAPS_FETCHED](state, action) {
    const {items} = action.payload;

    items.sort(function (x, y) {
      let a = new Date(y.createdAt),
        b = new Date(x.createdAt);
      return a - b;
    });

    state.error = null;
    state.entities = items;
    state.totalCount = items.length;
    state.listLoading = false;

    return {
      ...state,
    };
  },
  [types.ROUTEMAP_FETCHED](state, action) {
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
  [types.ROUTEMAPS_CREATED](state) {
    state.error = null;
    state.actionsLoading = false;
    return {
      ...state,
    };
  },
  [types.ROUTEMAP_UPDATED](state) {
    state.error = null;
    state.actionsLoading = false;
    return {
      ...state,
    };
  },
  [types.ROUTEMAPS_CATEGORIES_FETCHED](state, action) {
    const {items} = action.payload;
    state.error = null;
    state.routeMapCategories = items;
    return {
      ...state,
    };
  },
  [types.ROUTEMAPS_CLEAR]() {
    return initialState;
  },
});
