import {API, graphqlOperation} from 'aws-amplify';
import {
  createFriendship as apiCreateFriendship,
  updateFriendship as apiUpdateFriendship,
  createFriendshipRequest as apiCreateFriendshipRequest,
  updateFriendshipRequest as apiUpdateFriendshipRequest,
} from '../../../graphql/mutations';

export function getSeekerById(seekerId, queryParams) {
  const getSeeker = /* GraphQL */ `
    query GetSeeker(
      $id: ID!
      $filterRouteMaps: ModelRouteMapFilterInput
      $filterPosts: ModelPostFilterInput
      $filterFriends: ModelFriendshipFilterInput
    ) {
      getSeeker(id: $id) {
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
        visibleToProviders
        visibleToSeekers
        profilePic {
          bucket
          region
          key
        }
        routeMaps(filter: $filterRouteMaps) {
          items {
            id
            visibility
            status
            destination
            createdAt
            coverPhoto {
              region
              key
              bucket
            }
            focusAreas
            category {
              name
              id
            }
            posts(filter: $filterPosts) {
              items {
                id
              }
            }
          }
        }
        posts(filter: $filterPosts) {
          items {
            id
            type
            caption
            status
            visibility
            blog {
              blogTitle
              blogDescription
              visibility
            }
            photo {
              bucket
              region
              key
            }
            video {
              bucket
              region
              key
            }
            milestone {
              title
              date
            }
            routeMap {
              id
            }
            seeker {
              id
              firstName
              lastName
              profilePic {
                bucket
                key
                region
              }
            }
            createdAt
            updatedAt
          }
        }
        friends(filter: $filterFriends) {
          items {
            id
            friendId
            seekerId
            createdAt
            status
            updatedAt
            friend {
              firstName
              lastName
              id
              profilePic {
                bucket
                key
                region
              }
            }
          }
        }
        createdAt
        updatedAt
      }
    }
  `;
  return API.graphql(
    graphqlOperation(getSeeker, {
      id: seekerId,
      filterRouteMaps: queryParams.filterRouteMaps,
      filterPosts: queryParams.filterPosts,
      filterFriends: queryParams.filterFriends,
    }),
  );
}

export function getFriendshipRequestsByRecipient(queryParams) {
  const listFriendshipRequests = /* GraphQL */ `
    query ListFriendshipRequests(
      $filter: ModelFriendshipRequestFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listFriendshipRequests(
        filter: $filter
        limit: $limit
        nextToken: $nextToken
      ) {
        items {
          requester {
            firstName
            lastName
            email
            id
            status
            username
            visibleToProviders
            visibleToSeekers
          }
          id
          createdAt
          recipientId
          status
          updatedAt
          requesterId
        }
        nextToken
      }
    }
  `;
  return API.graphql(
    graphqlOperation(listFriendshipRequests, {
      filter: queryParams.filter,
    }),
  );
}

export function getRouteMapById(routeMapId, queryParams) {
  const getRouteMap = /* GraphQL */ `
    query GetRouteMap(
      $id: ID!
      $filter: ModelPostFilterInput
      $limit: Int
      $nextToken: String
    ) {
      getRouteMap(id: $id) {
        id
        destination
        posts(filter: $filter, limit: $limit, nextToken: $nextToken) {
          items {
            id
            type
            caption
            blog {
              blogTitle
              blogDescription
              blogCoverPhoto {
                bucket
                key
                region
              }
            }
            photo {
              bucket
              key
              region
            }
            video {
              key
              region
              bucket
            }
            milestone {
              title
              date
            }
            routeMap {
              id
            }
            createdAt
            visibility
            status
            seeker {
              firstName
              lastName
              username
              id
              profilePic {
                bucket
                key
                region
              }
            }
          }
        }
        coverPhoto {
          bucket
          key
          region
        }
        focusAreas
        owner {
          firstName
          lastName
          biography
          dateOfBirth
          profilePic {
            bucket
            key
            region
          }
          posts {
            items {
              id
            }
          }
          routeMaps {
            items {
              id
            }
          }
          id
          postcodeArea
        }
      }
    }
  `;
  return API.graphql(
    graphqlOperation(getRouteMap, {id: routeMapId, filter: queryParams.filter}),
  );
}

export function createFriendship(friendship) {
  return API.graphql(
    graphqlOperation(apiCreateFriendship, {
      input: friendship,
    }),
  );
}

export function updateFriendship(friendship) {
  return API.graphql(
    graphqlOperation(apiUpdateFriendship, {
      input: friendship,
    }),
  );
}

export function createFriendshipRequest(friendshipRequest) {
  return API.graphql(
    graphqlOperation(apiCreateFriendshipRequest, {
      input: friendshipRequest,
    }),
  );
}

export function updateFriendshipRequest(friendshipRequest) {
  return API.graphql(
    graphqlOperation(apiUpdateFriendshipRequest, {
      input: friendshipRequest,
    }),
  );
}
