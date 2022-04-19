import {API, graphqlOperation} from 'aws-amplify';
import {updateRouteMap as apiUpdateRouteMap} from '../../../graphql/mutations';
import {listRouteMapCategorys} from '../../../graphql/queries';
export function getRouteMaps(userId, queryParams) {
  const getRouteMaps = /* GraphQL */ `
    query GetSeeker(
      $id: ID!
      $filter: ModelRouteMapFilterInput
      $filterPosts: ModelPostFilterInput
      $limit: Int
      $nextToken: String
    ) {
      getSeeker(id: $id) {
        routeMaps(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
          nextToken
        }
      }
    }
  `;
  return API.graphql(
    graphqlOperation(getRouteMaps, {
      id: userId,
      filter: queryParams.filter,
      filterPosts: queryParams.filterPosts,
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
            createdAt
            visibility
            routeMap {
              id
            }
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

export function createRouteMap(routeMap) {
  const apiCreateRouteMap = /* GraphQL */ `
    mutation CreateRouteMap(
      $input: CreateRouteMapInput!
      $condition: ModelRouteMapConditionInput
    ) {
      createRouteMap(input: $input, condition: $condition) {
        id
        visibility
        status
        coverPhoto {
          bucket
          region
          key
        }
        destination
        category {
          id
          name
          iconName
          bgColor
          status
          createdAt
          updatedAt
        }
        focusAreas
        createdAt
        updatedAt
      }
    }
  `;
  return API.graphql(graphqlOperation(apiCreateRouteMap, {input: routeMap}));
}

export function updateRouteMap(routeMap) {
  return API.graphql(graphqlOperation(apiUpdateRouteMap, {input: routeMap}));
}

export function getRouteMapCategories() {
  return API.graphql(graphqlOperation(listRouteMapCategorys, {}));
}
