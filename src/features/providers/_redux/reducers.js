import createReducer from '../../../lib/createReducer';
import * as types from './types';

const initialState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: [],
  providerDetail: undefined,
  providerFollower: undefined,
};

export const callTypes = {
  list: 'list',
  action: 'action',
};

export const providersReducer = createReducer(initialState, {
  [types.PROVIDERS_CATCH_ERROR](state, action) {
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
  [types.PROVIDERS_START_CALL](state, action) {
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
  [types.PROVIDER_FETCHED](state, action) {
    const {provider, seekerId} = action.payload;

    const providerFollower = provider.followers.items.filter(
      (i) => i.seekerId === seekerId,
    );
    if (providerFollower.length !== 0) {
      state.providerFollower = providerFollower[0];
    } else {
      state.providerFollower = undefined;
    }
    state.providerDetail = provider;
    state.error = null;
    state.actionsLoading = false;
    return {
      ...state,
    };
  },
  [types.PROVIDERS_FETCHED](state, action) {
    const {items} = action.payload;

    state.entities = items;
    state.totalCount = items.length;
    state.error = null;
    state.listLoading = false;
    return {
      ...state,
    };
  },
  [types.PROVIDER_FOLLOWER_CREATED](state, action) {
    const {providerFollower} = action.payload;

    state.providerFollower = providerFollower;
    state.error = null;
    return {
      ...state,
    };
  },
  [types.PROVIDER_FOLLOWER_UPDATED](state, action) {
    const {providerFollower} = action.payload;

    state.providerFollower = providerFollower;
    state.error = null;
    return {
      ...state,
    };
  },
  [types.PROVIDERS_CLEAR]() {
    return initialState;
  },
});
