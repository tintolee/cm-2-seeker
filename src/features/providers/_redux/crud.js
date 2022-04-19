import {API, graphqlOperation} from 'aws-amplify';
import {
  createOpportunityProviderFollower as apiCreateOpportunityProviderFollower,
  updateOpportunityProviderFollower as apiUpdateOpportunityProviderFollower,
} from '../../../graphql/mutations';

export function getProviderById(providerId, queryParams) {
  const getProvider = /* GraphQL */ `
    query GetOpportunityProvider(
      $id: ID!
      $filterFollowers: ModelOpportunityProviderFollowerFilterInput
      $filterOpportunities: ModelOpportunityFilterInput
      $filterContents: ModelContentFilterInput
    ) {
      getOpportunityProvider(id: $id) {
        id
        name
        displayName
        companyNo
        parent
        email
        educationalInstitution
        status
        logo {
          bucket
          region
          key
        }
        tagline
        address
        phone
        website
        primarySector {
          id
          name
          status
          createdAt
          updatedAt
        }
        followers(filter: $filterFollowers) {
          items {
            id
            status
            seekerId
          }
          nextToken
        }
        opportunities(filter: $filterOpportunities) {
          items {
            id
            title
            location
            date
            description
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
            likes {
              items {
                id
                opportunityId
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
        contents(filter: $filterContents) {
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
        createdAt
        updatedAt
      }
    }
  `;
  return API.graphql(
    graphqlOperation(getProvider, {
      id: providerId,
      filterFollowers: queryParams.filterFollowers,
      filterOpportunities: queryParams.filterOpportunities,
      filterContents: queryParams.filterContents,
    }),
  );
}

export function createOpportunityProviderFollower(providerFollower) {
  return API.graphql(
    graphqlOperation(apiCreateOpportunityProviderFollower, {
      input: providerFollower,
    }),
  );
}

export function updateOpportunityProviderFollower(providerFollower) {
  return API.graphql(
    graphqlOperation(apiUpdateOpportunityProviderFollower, {
      input: providerFollower,
    }),
  );
}
