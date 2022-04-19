import createReducer from '../../../lib/createReducer';
import * as types from './types';

const initialState = {
  listLoading: false,
  actionsLoading: false,
  sorting: {
    sortOrder: 'desc', // asc||desc
    sortField: 'created',
  },
  recentSearches: [],
  searchResult: {
    providers: [],
    opportunities: [],
    collabroraitons: [],
    seekers: [],
  },
  contents: [],
  opportunities: [],
  collaborations: [],
  connectionsPosts: [],
  discover: [],
};

export const callTypes = {
  list: 'list',
  action: 'action',
};

export const discoverReducer = createReducer(initialState, {
  [types.DISCOVER_CATCH_ERROR](state, action) {
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
  [types.DISCOVER_START_CALL](state, action) {
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
  [types.DISCOVER_INSERT_RECENT_SEARCHES](state, action) {
    const {searchValue} = action.payload;
    state.entities.push(searchValue);
    return {
      ...state,
    };
  },
  [types.DISCOVER_PROVIDERS_SEARCHED](state, action) {
    const {items} = action.payload;
    state.error = null;
    state.searchResult.providers = items;
    return {
      ...state,
    };
  },
  [types.DISCOVER_OPPORTUNITIES_SEARCHED](state, action) {
    const {items} = action.payload;
    state.error = null;
    state.searchResult.opportunities = items;
    return {
      ...state,
    };
  },
  [types.DISCOVER_SEEKERS_SEARCHED](state, action) {
    const {items} = action.payload;
    state.error = null;
    state.searchResult.seekers = items;
    return {
      ...state,
    };
  },
  [types.DISCOVER_COLLABORATIONS_SEARCHED](state, action) {
    const {items} = action.payload;
    state.error = null;
    state.searchResult.collaborations = items;
    return {
      ...state,
    };
  },
  [types.DISCOVER_CONTENTS_FETCHED](state, action) {
    const {items} = action.payload;
    state.contents = items;
    state.error = null;
    state.listLoading = false;
    return {
      ...state,
    };
  },
  [types.DISCOVER_OPPORTUNITIES_FETCHED](state, action) {
    const {items} = action.payload;
    state.opportunities = items;
    state.error = null;
    state.listLoading = false;
    return {
      ...state,
    };
  },
  [types.DISCOVER_COLLABORATIONS_FETCHED](state, action) {
    const {items} = action.payload;
    state.collaborations = items;
    state.error = null;
    state.listLoading = false;
    return {
      ...state,
    };
  },
  [types.DISCOVER_CONNECTIONS_POSTS_FETCHED](state, action) {
    const {friends} = action.payload;

    if (friends?.items.length > 0) {
      const posts = [];

      friends.items.forEach((item) => {
        item.friend?.posts?.items.forEach((post) => {
          posts.push(post);
        });
      });

      posts.sort(function (x, y) {
        let a = new Date(y.createdAt),
          b = new Date(x.createdAt);
        return a - b;
      });

      state.connectionsPosts = posts;
      state.error = null;
    }

    return {
      ...state,
    };
  },
  [types.DISCOVER_FETCHED](state) {
    const contentsArray = state.contents.map((item) => {
      return {...item, postType: 'CONTENT'};
    });
    const opportunitiesArray = state.opportunities.map((item) => {
      return {...item, postType: 'OPPORTUNITY'};
    });
    const collaborationsArray = state.collaborations.map((item) => {
      return {...item, postType: 'COLLABORATION'};
    });
    const postsArray = state.connectionsPosts.map((item) => {
      return {...item, postType: 'POST'};
    });
    const allPosts = [
      ...contentsArray,
      ...opportunitiesArray,
      ...collaborationsArray,
      ...postsArray,
    ];
    allPosts.sort(function (x, y) {
      let a = new Date(y.createdAt),
        b = new Date(x.createdAt);
      return a - b;
    });
    state.discover = allPosts;
    return {
      ...state,
    };
  },
  [types.DISCOVER_COLLABORATION_RESOURCE_UPDATED](state, action) {
    const {payload} = action,
      {type, data} = payload;
    let collaborationId = data.collaborationId;
    state.listLoading = false;
    state.error = null;

    if (type === 'like') {
      state.collaborations = state.collaborations.map((item) => {
        if (item.id === collaborationId) {
          item.likes.items.push(data);
          return item;
        }
        return item;
      });
    } else if (type === 'unlike') {
      state.collaborations = state.collaborations.map((item) => {
        if (item.id === collaborationId) {
          let temp = item.likes.items;
          item.likes.items = temp.filter((i) => i.id !== data.resourceId);
          return item;
        }
        return item;
      });
    }

    return {
      ...state,
    };
  },
  [types.DISCOVER_OPPORTUNITY_RESOURCE_UPDATED](state, action) {
    const {payload} = action,
      {type, data} = payload;
    let opportunityId = data.opportunityId;

    state.listLoading = false;
    state.error = null;

    if (type === 'like') {
      state.opportunities = state.opportunities.map((item) => {
        if (item.id === opportunityId) {
          item.likes.items.push(data);
          return item;
        }
        return item;
      });
    } else if (type === 'unlike') {
      state.opportunities = state.opportunities.map((item) => {
        if (item.id === opportunityId) {
          let temp = item.likes.items;
          item.likes.items = temp.filter((i) => i.id !== data.resourceId);
          return item;
        }
        return item;
      });
    }

    return {
      ...state,
    };
  },
  [types.DISCOVER_CONNECTION_RESOURCE_UPDATED](state, action) {
    const {payload} = action,
      {type, data} = payload;
    let postId = data.postId;

    state.listLoading = false;
    state.error = null;

    if (type === 'like') {
      state.connectionsPosts = state.connectionsPosts.map((item) => {
        if (item.id === postId) {
          item.likes.items.push(data);
          return item;
        }
        return item;
      });
    } else if (type === 'unlike') {
      state.connectionsPosts = state.connectionsPosts.map((item) => {
        if (item.id === postId) {
          let temp = item.likes.items;
          item.likes.items = temp.filter((i) => i.id !== data.resourceId);
          return item;
        }
        return item;
      });
    }

    return {
      ...state,
    };
  },
  [types.DISCOVER_POST_RESOURCE_UPDATED](state, action) {
    const {payload} = action,
      {type, data} = payload;
    let postId = data.postId;

    state.listLoading = false;
    state.error = null;

    if (type === 'like') {
      state.contents = state.connectionsPosts.map((item) => {
        if (item.id === postId) {
          item.likes.items.push(data);
          return item;
        }
        return item;
      });
    } else if (type === 'unlike') {
      state.contents = state.connectionsPosts.map((item) => {
        if (item.id === postId) {
          let temp = item.likes.items;
          item.likes.items = temp.filter((i) => i.id !== data.resourceId);
          return item;
        }
        return item;
      });
    }

    return {
      ...state,
    };
  },
  [types.DISCOVER_CLEAR]() {
    return initialState;
  },
});
