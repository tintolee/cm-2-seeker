import {API, graphqlOperation} from 'aws-amplify';
import {listNotifications} from '../../../graphql/queries';

export function getNotifications() {
  return API.graphql(graphqlOperation(listNotifications));
}
