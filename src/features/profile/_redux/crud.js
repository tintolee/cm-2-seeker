import {API, graphqlOperation} from 'aws-amplify';
import {
  createFriendship as apiCreateFriendship,
  updateFriendship as apiUpdateFriendship,
  createFriendshipRequest as apiCreateFriendshipRequest,
  updateFriendshipRequest as apiUpdateFriendshipRequest,
} from '../../../graphql/mutations';
import {
  likeResource as apiLikeResource,
  unlikeResource as apiUnlikeResource
} from '../../../lib/postreactions/_redux/crud';
import * as mutations from '../../../graphql/mutations';

export function getSeeker(userId, queryParams) {
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
        profilePic {
          bucket
          region
          key
        }
        interests
        admireBrands
        profileCompleted
        visibleToProviders
        visibleToSeekers
        createdAt
        updatedAt
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
      }
    }
  `;
  return API.graphql(
    graphqlOperation(getSeeker, {
      id: userId,
      filterRouteMaps: queryParams.filterRouteMaps,
      filterPosts: queryParams.filterPosts,
      filterFriends: queryParams.filterFriends,
    }),
  );
}

export function getMyOpportunities(seekerId, queryParams) {
  const getMyOpportunities = /* GraphQL */ `
    query GetMyOpportunities($id: ID!) {
      getSeeker(id: $id) {
        id
        opportunities {
          items {
            id
            createdAt
            opportunityId
            seekerComment
            seekerId
            status
            updatedAt
            opportunity {
              id
              location
              description
              caption
              date
              title
              cover {
                bucket
                key
                region
              }
              opportunityProvider {
                id
                name
                logo {
                  bucket
                  key
                  region
                }
              }
              attendees {
                items {
                  id
                  status
                  seekerId
                }
              }
            }
          }
        }
      }
    }
  `;
  return API.graphql(
    graphqlOperation(getMyOpportunities, {
      id: seekerId,
      filter: queryParams.filter,
    }),
  );
}

export function getMyCollaborations(seekerId, queryParams) {
  const getMyCollaborations = /* GraphQL */ `
    query GetMyCollaborations(
      $id: ID!
      $filter: ModelCollaborationFilterInput
    ) {
      getSeeker(id: $id) {
        id
        lastName
        firstName
        profilePic {
          bucket
          region
          key
        }
        collaborationMembers {
          items {
            collaborationId
            id
            seekerId
            comment
            status
            collaboration {
              capacity
              createdAt
              description
              caption
              endDate
              id
              inviteOnly
              location
              startDate
              status
              title
              updatedAt
              cover {
                bucket
                key
                region
              }
              coverThumb {
                bucket
                key
                region
              }
              owner {
                id
                firstName
                lastName
                profilePic {
                  bucket
                  key
                  region
                }
              }
            }
          }
        }
        collaborations(filter: $filter) {
          items {
            capacity
            createdAt
            description
            caption
            endDate
            id
            inviteOnly
            location
            startDate
            status
            title
            updatedAt
            cover {
              bucket
              key
              region
            }
            coverThumb {
              bucket
              key
              region
            }
            owner {
              id
              firstName
              lastName
              profilePic {
                bucket
                key
                region
              }
            }
          }
          nextToken
        }
      }
    }
  `;
  return API.graphql(
    graphqlOperation(getMyCollaborations, {
      id: seekerId,
      filter: queryParams.filter,
    }),
  );
}

export function getSeekerPosts(userId, queryParams) {
  const getRouteMaps = /* GraphQL */ `
    query GetSeeker(
      $id: ID!
      $filter: ModelPostFilterInput
      $limit: Int
      $nextToken: String
    ) {
      getSeeker(id: $id) {
        posts(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
            videoThumbnail{
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
            likes {
              items {
                id
                postId
                seeker{
                  id
                  firstName
                  profilePic {
                    bucket
                    key
                    region
                  }
                }
              }
              nextToken
            }
            createdAt
            updatedAt
          }
        }
      }
    }
  `;
  return API.graphql(
    graphqlOperation(getRouteMaps, {id: userId, filter: queryParams.filter}),
  );
}

export function updateSeeker(updateSeeker) {
  return API.graphql(
    graphqlOperation(mutations.updateSeeker, {input: updateSeeker}),
  );
}

export function getConnectionProviders(queryParams) {
  const listOpportunityProviderFollowers = /* GraphQL */ `
    query ListOpportunityProviderFollowers(
      $filter: ModelOpportunityProviderFollowerFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listOpportunityProviderFollowers(
        filter: $filter
        limit: $limit
        nextToken: $nextToken
      ) {
        items {
          id
          status
          startedAt
          opportunityProviderId
          seekerId
          createdAt
          updatedAt
          opportunityProvider {
            displayName
            name
            id
            companyNo
            status
            logo {
              bucket
              key
              region
            }
          }
        }
        nextToken
      }
    }
  `;
  return API.graphql(
    graphqlOperation(listOpportunityProviderFollowers, {
      filter: queryParams.filter,
    }),
  );
}

export function getFriendshipSeekers(seekerId, queryParams) {
  const getFriendshipSeekers = /* GraphQL */ `
    query GetFriendshipSeekers($id: ID!, $filter: ModelFriendshipFilterInput) {
      getSeeker(id: $id) {
        id
        friends(filter: $filter) {
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
      }
    }
  `;
  return API.graphql(
    graphqlOperation(getFriendshipSeekers, {
      id: seekerId,
      filter: queryParams.filter,
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
            profilePic {
              bucket
              key
              region
            }
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

export function likeResource(updateResource) {

  return API.graphql(
    graphqlOperation(apiLikeResource, {input: updateResource}),
  );
}

export function unlikeResource(updateResource) {
  return API.graphql(
    graphqlOperation(apiUnlikeResource, {input: updateResource}),
  );
}
