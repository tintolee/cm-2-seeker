import createReducer from '../../../lib/createReducer';
import * as types from './types';

const initialState = {
  listLoading: false,
  actionsLoading: false,
  connectionList: [],
  conversations: [],
};

export const callTypes = {
  list: 'list',
  action: 'action',
};

export const messagingReducer = createReducer(initialState, {
  [types.USER_CONNECTION_LIST_FETCHED](state, action) {
    const {friends} = action.payload;
    state.connectionList = friends.items;
    state.error = null;
    state.listLoading = false;
    return {
      ...state,
    };
  },
  [types.USER_CONVERSATION_LIST_FETCHED](state, action) {
    state.conversations = action.payload;
    state.error = null;
    state.listLoading = false;
    return {
      ...state,
    };
  },
  [types.MESSAGING_CLEAR]() {
    return initialState;
  },
});
