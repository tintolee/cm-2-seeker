import {API, graphqlOperation} from 'aws-amplify';
import {
  createOpportunityAttendee as apiCreateOpportunityAttendee,
  updateOpportunityAttendee as apiUpdateOpportunityAttendee,
} from '../../../graphql/mutations';
import {listRouteMapCategorys} from '../../../graphql/queries';
import {
  likeResource as apiLikeResource,
  unlikeResource as apiUnlikeResource
} from '../../../lib/postreactions/_redux/crud';

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
          cover {
            bucket
            region
            key
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

export function getOpportunity(opportunityId, queryParams) {
  const getOpportunity = /* GraphQL */ `
    query GetOpportunity($id: ID!) {
      getOpportunity(id: $id) {
        id
        title
        location
        date
        description
        caption
        capacity
        status
        cover {
          bucket
          region
          key
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
        opportunityCreatedSteps {
          nextToken
        }
        organiser {
          id
          firstName
          lastName
          email
          status
          opportunityProviderUserOpportunityProviderId
          createdAt
          updatedAt
        }
        opportunityProvider {
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
          createdAt
          updatedAt
        }
        opportunityOpportunityProviderId
        attendees {
          items {
            id
            status
            seeker {
              id
              firstName
              lastName
              status
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
    graphqlOperation(getOpportunity, {
      id: opportunityId,
      filter: queryParams.filter,
    }),
  );
}

export function createOpportunityAttendee(opportunityAttendee) {
  return API.graphql(
    graphqlOperation(apiCreateOpportunityAttendee, {
      input: opportunityAttendee,
    }),
  );
}

export function updateOpportunityAttendee(opportunityAttendee) {
  return API.graphql(
    graphqlOperation(apiUpdateOpportunityAttendee, {
      input: opportunityAttendee,
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