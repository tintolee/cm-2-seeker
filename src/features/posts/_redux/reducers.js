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
  postDetail: undefined,
};

export const callTypes = {
  list: 'list',
  action: 'action',
};

export const postsReducer = createReducer(initialState, {
  [types.POSTS_CATCH_ERROR](state, action) {
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
  [types.POSTS_START_CALL](state, action) {
    state.error = null;
    state.postDetail = undefined;
    if (action.payload.callType === callTypes.list) {
      state.listLoading = true;
    } else {
      state.actionsLoading = true;
    }
    return {
      ...state,
    };
  },
  [types.POSTS_FETCHED](state, action) {
    const {items} = action.payload;

    state.listLoading = false;
    state.error = null;
    state.entities = items;
    state.totalCount = items.length;

    return {
      ...state,
    };
  },
  [types.POST_FETCHED](state, action) {
    const {post} = action.payload;

    state.postDetail = post;
    state.actionsLoading = false;
    state.error = null;
    return {
      ...state,
    };
  },
  [types.POST_CREATED](state) {
    state.error = null;
    state.actionsLoading = false;
    return {
      ...state,
    };
  },
  [types.POST_UPDATED](state) {
    state.error = null;
    state.actionsLoading = false;
    return {
      ...state,
    };
  },
  [types.POST_RESOURCE_UPDATED](state, action) {
    const {payload} = action, {type,data} = payload;
    let postId = data.postId;

    state.listLoading = false;
    state.error = null;
    
    if(type == "like"){
    state.entities = state.entities.map(item => {
      if(item.id === postId){
         item.likes.items.push(data);
          return item;
      }
      return item;
    });
    }
    else if(type == "unlike"){
      state.entities = state.entities.map(item => {
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
  [types.POSTS_CLEAR]() {
    return initialState;
  },
});
