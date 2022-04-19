import createReducer from '../../../lib/createReducer';
import * as types from './types';

const initialState = {
  listLoading: false,
  actionsLoading: false,
  opportunities: [],
  collaborations: [],
  connectionProviders: [],
  connectionSeekers: [],
  friendshipRequests: [],
  posts: [],
  seeker: {
    firstName: '',
    lastName: '',
    email: '',
    status: 1,
    postcodeArea: '',
    mobileNumber: '',
    dateOfBirth: '',
    biography: '',
  },
};

export const callTypes = {
  list: 'list',
  action: 'action',
};

export const profileReducer = createReducer(initialState, {
  [types.PROFILE_CATCH_ERROR](state, action) {
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
  [types.PROFILE_START_CALL](state, action) {
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
  [types.PROFILE_MY_OPPORTUNITIES_FETCHED](state, action) {
    const {opportunities} = action.payload;
    state.opportunities = opportunities.items;
    state.error = null;
    state.listLoading = false;
    return {
      ...state,
    };
  },
  [types.PROFILE_MY_COLLABORATIONS_FETCHED](state, action) {
    const {collaborations, collaborationMembers} = action.payload;

    const activeCollaborations = collaborationMembers.items.filter(
      (cm) => cm.collaboration.status === 1,
    );

    const ownerCollaborations = collaborations.items.map((c) => {
      return {id: c.id, status: 5, collaboration: c};
    });

    const allCollaborations = [...activeCollaborations, ...ownerCollaborations];
    allCollaborations.sort(function (x, y) {
      let a = new Date(y.createdAt),
        b = new Date(x.createdAt);
      return a - b;
    });

    state.collaborations = allCollaborations;
    state.error = null;
    state.listLoading = false;
    return {
      ...state,
    };
  },
  [types.PROFILE_CONNECTION_PROVIDERS_FETCHED](state, action) {
    const {providers} = action.payload;
    state.connectionProviders = providers;
    state.error = null;
    state.listLoading = false;
    return {
      ...state,
    };
  },
  [types.PROFILE_CONNECTION_SEEKERS_FETCHED](state, action) {
    const {friends} = action.payload;
    state.connectionSeekers = friends.items;
    state.error = null;
    state.listLoading = false;
    return {
      ...state,
    };
  },
  [types.PROFILE_FRIENDSHIP_REQUESTERS_FETCHED](state, action) {
    const {requests} = action.payload;
    state.friendshipRequests = requests;
    state.error = null;
    state.listLoading = false;
    return {
      ...state,
    };
  },

  [types.GET_SEEKER_PROFILE](state, action) {
    const {seeker} = action.payload;
    state.seeker = seeker;
    state.actionsLoading = false;
    state.error = null;
    return {
      ...state,
    };
  },
  [types.PROFILE_UPDATED](state, action) {
    const {seeker} = action.payload;
    state.seeker = seeker;
   state.actionsLoading = false;
    state.error = null;
    return {
      ...state,
    };
  },
  [types.PROFILE_POSTS_FETCHED](state, action) {
    const {items} = action.payload;

    items?.sort(function (x, y) {
      let a = new Date(y.createdAt),
        b = new Date(x.createdAt);
      return a - b;
    });

    state.listLoading = false;
    state.error = null;
    state.posts = items;
    return {
      ...state,
    };
  },
  [types.PROFILE_RESOURCE_UPDATED](state, action) {
    const {payload} = action, {type,data} = payload;
    let postId = data.postId;

    state.listLoading = false;
    state.error = null;
    
    if(type == "like"){
    state.posts = state.posts.map(item => {
      if(item.id === postId){
         item.likes.items.push(data);
          return item;
      }
      return item;
    });
    }
    else if(type == "unlike"){
      state.posts = state.posts.map(item => {
        if(item.id === postId){ 
          let temp = item.likes.items;
           item.likes.items = temp.filter(i => i.id !== data.resourceId);
            return item;
        }
        return item;
      });
    }

    return {
      ...state,
    };
  },
  [types.PROFILE_CLEAR]() {
    return initialState;
  },
});
