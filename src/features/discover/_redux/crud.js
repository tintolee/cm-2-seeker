import {API, graphqlOperation} from 'aws-amplify';
import {
  createOpsNotInApp as apiCreateOpsNotInApp,
  updateOpsNotInApp as apiUpdateOpsNotInApp,
} from '../../../graphql/mutations';
import {listOpsNotInApps} from '../../../graphql/queries';
import {
  likeResource as apiLikeResource,
  unlikeResource as apiUnlikeResource
} from '../../../lib/postreactions/_redux/crud';

export function fetchProviders(queryParams) {
  const listOpportunityProviders = /* GraphQL */ `
    query ListOpportunityProviders(
      $filter: ModelOpportunityProviderFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listOpportunityProviders(
        filter: $filter
        limit: $limit
        nextToken: $nextToken
      ) {
        items {
          id
          name
          displayName
          companyNo
          parent
          email
          educationalInstitution
          status
          tagline
          address
          phone
          website
          logo {
            bucket
            region
            key
          }
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  `;
  return API.graphql(
    graphqlOperation(listOpportunityProviders, {filter: queryParams.filter}),
  );
}

export function createOpsNotInApp(opsNotInApp) {
  return API.graphql(
    graphqlOperation(apiCreateOpsNotInApp, {
      input: opsNotInApp,
    }),
  );
}

export function updateOpsNotInApp(opsNotInApp) {
  return API.graphql(
    graphqlOperation(apiUpdateOpsNotInApp, {
      input: opsNotInApp,
    }),
  );
}

export function getOpsNotInApps(queryParams) {
  return API.graphql(
    graphqlOperation(listOpsNotInApps, {
      filter: queryParams.filter,
    }),
  );
}

export function getContents(queryParams) {
  const listContents = /* GraphQL */ `
    query ListContents(
      $filter: ModelContentFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listContents(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
          createdAt
          description
          id
          opportunityProviderId
          opportunityProviderUserId
          status
          title
          type
          updatedAt
          video
          likes {
            items {
              id
              collaborationId
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
          opportunityProvider {
            id
            displayName
            name
            logo {
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
          blog {
            blogCoverPhoto {
              bucket
              key
              region
            }
            blogDescription
            blogTitle
            visibility
          }
        }
        nextToken
      }
    }
  `;
  return API.graphql(
    graphqlOperation(listContents, {
      filter: queryParams.filter,
    }),
  );
}

export function getOpportunities(queryParams) {
  const getOpportunities = /* GraphQL */ `
    query listOpportunitys(
      $filter: ModelOpportunityFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listOpportunitys(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
          id
          title
          location
          date
          description
          caption
          capacity
          status
          createdAt
          updatedAt
          cover {
            bucket
            region
            key
          }
          likes {
            items {
              id
              collaborationId
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
          applicationRequired
          applicationDeadline
          isLimitedCapacity
          opportunityType {
            id
            name
            status
            createdAt
            updatedAt
          }
          opportunityProvider {
            id
            name
            logo {
              bucket
              region
              key
            }
          }
          opportunityOpportunityProviderId
          attendees {
            items {
              id
              status
              seekerId
            }
          }
        }
        nextToken
      }
    }
  `;
  return API.graphql(
    graphqlOperation(getOpportunities, {filter: queryParams.filter}),
  );
}

export function getCollaborations(queryParams) {
  const getCollaborations = /* GraphQL */ `
    query ListCollaborations(
      $filter: ModelCollaborationFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listCollaborations(
        filter: $filter
        limit: $limit
        nextToken: $nextToken
      ) {
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
          likes {
            items {
              id
              collaborationId
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
  `;
  return API.graphql(
    graphqlOperation(getCollaborations, {filter: queryParams.filter}),
  );
}

export function getSeekers(queryParams) {
  const listSeekers = /* GraphQL */ `
    query ListSeekers(
      $filter: ModelSeekerFilterInput
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
          profilePic {
            bucket
            key
            region
          }
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  `;
  return API.graphql(
    graphqlOperation(listSeekers, {filter: queryParams.filter}),
  );
}

export function getFriendshipSeekers(seekerId, queryParams) {
  const getFriendshipSeekers = /* GraphQL */ `
    query GetFriendshipSeekers(
      $id: ID!
      $filter: ModelFriendshipFilterInput
      $filterPosts: ModelPostFilterInput
    ) {
      getSeeker(id: $id) {
        id
        friends(filter: $filter) {
          items {
            id
            friendId
            friend {
              firstName
              lastName
              id
              profilePic {
                bucket
                key
                region
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
      filterPosts: queryParams.filterPosts,
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
