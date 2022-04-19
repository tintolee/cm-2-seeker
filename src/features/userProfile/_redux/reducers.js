//reducers
import createReducer from '../../../lib/createReducer';
import * as types from './types';

const initialState = {
  listLoading: false,
  actionsLoading: false,
  seeker: undefined,
  profileCompleted: false,
};

export const callTypes = {
  list: 'list',
  action: 'action',
};

export const seekerReducer = createReducer(initialState, {
  [types.USER_START_CALL](state, action) {
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
  [types.USER_CATCH_ERROR](state, action) {
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
  [types.CREATE_SEEKER](state, action) {
    const {seeker} = action.payload;
    state.seeker = seeker;
    state.profileCompleted = true;
    state.actionsLoading = false;
    state.profileCompleted = false;
    state.error = null;
    return {
      ...state,
    };
  },

  [types.COMPLETE_SEEKER_PROFILE](state) {
    state.profileCompleted = true;
    return {
      ...state,
    };
  },

  [types.UPDATE_SEEKER](state, action) {
    const {seeker} = action.payload;
    state.seeker = seeker;
    state.actionsLoading = false;
    state.error = null;
    return {
      ...state,
    };
  },

  [types.GET_SEEKER](state, action) {
    const {items} = action.payload;

    if (items.length !== 0) {
      state.seeker = items[0];
      state.profileCompleted = true;
    }
    state.actionsLoading = false;
    state.error = null;
    return {
      ...state,
    };
  },
  [types.USER_PROFILE_CLEAR]() {
    return initialState;
  },
});
