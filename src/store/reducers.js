import * as routeMapsReducer from '../features/routeMaps/_redux/reducers';
import * as discoverReducer from '../features/discover/_redux/reducers';
import * as opportunitiesReducer from '../features/opportunities/_redux/reducers';
import * as seekerReducer from '../features/userProfile/_redux/reducers';
import * as profileReducer from '../features/profile/_redux/reducers';
import * as providersReducer from '../features/providers/_redux/reducers';
import * as seekersReducer from '../features/seekers/_redux/reducers';
import * as notificationReducer from '../features/notifications/_redux/reducers';
import * as collaborationsReducer from '../features/collaborations/_redux/reducers';
import * as postsReducer from '../features/posts/_redux/reducers';
import * as messagingReducer from '../features/messaging/_redux/reducers';

export default Object.assign(
  routeMapsReducer,
  discoverReducer,
  opportunitiesReducer,
  seekerReducer,
  profileReducer,
  providersReducer,
  seekersReducer,
  notificationReducer,
  collaborationsReducer,
  postsReducer,
  messagingReducer,
);
