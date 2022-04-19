import {API, graphqlOperation} from 'aws-amplify';
import * as mutations from '../../../graphql/mutations';

export function createSeeker(seeker) {
  return API.graphql(graphqlOperation(mutations.createSeeker, {input: seeker}));
}
export function updateSeeker(updateSeeker) {
  return API.graphql(
    graphqlOperation(mutations.updateSeeker, {input: updateSeeker}),
  );
}

export function listSeeker(queryParams) {
  const listSeeker = /* GraphQL */ `
    query ListSeekers(
      $filter: ModelSeekerFilterInput
      $filterRouteMaps: ModelRouteMapFilterInput
      $filterPosts: ModelPostFilterInput
      $filterFriends: ModelFriendshipFilterInput
      $filterOpportunities: ModelOpportunityAttendeeFilterInput
      $filterCollaborations: ModelCollaborationFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listSeekers(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
          id
          username
          firstName
          lastName
          email
          status
          mobileNumber
          postcodeArea
          dateOfBirth
          biography
          interests
          admireBrands
          profileCompleted
          visibleToProviders
          visibleToSeekers
          createdAt
          updatedAt
          profilePic {
            bucket
            region
            key
          }
          routeMaps(filter: $filterRouteMaps) {
            items {
              id
            }
          }
          posts(filter: $filterPosts) {
            items {
              id
            }
          }
          friends(filter: $filterFriends) {
            items {
              id
            }
          }
          opportunities(filter: $filterOpportunities) {
            items {
              id
            }
          }
          collaborations(filter: $filterCollaborations) {
            items {
              id
            }
          }
        }
        nextToken
      }
    }
  `;
  return API.graphql(
    graphqlOperation(listSeeker, {
      filter: queryParams.filter,
      filterRouteMaps: queryParams.filterRouteMaps,
      filterPosts: queryParams.filterPosts,
      filterFriends: queryParams.filterFriends,
      filterOpportunities: queryParams.filterOpportunities,
      filterCollaborations: queryParams.filterCollaborations,
    }),
  );
}
