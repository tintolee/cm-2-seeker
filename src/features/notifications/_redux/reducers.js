import createReducer from '../../../lib/createReducer';
import * as types from './types';

const initialState = {
  listLoading: false,
  actionsLoading: false,
  notifications: [],
  notificationetail: undefined,
  sorting: {
    sortOrder: 'desc', // asc||desc
    sortField: 'created',
  },
};

export const callTypes = {
  list: 'list',
  action: 'action',
};

export const notificationReducer = createReducer(initialState, {
  [types.NOTIFICATIONS_CATCH_ERROR](state, action) {
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
  [types.NOTIFICATIONS_START_CALL](state, action) {
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
  [types.NOTIFICATIONS_NOTIFICATIONS_FETCHED](state, action) {
    const {items} = action.payload;

    state.notifications = items;
    state.listLoading = false;
    state.error = null;
    return {
      ...state,
    };
  },
});
