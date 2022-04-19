import {API, graphqlOperation} from 'aws-amplify';

export const likeResource = /* GraphQL */ `
  mutation LikeResource(
    $input: CreateResourceReactionInput!
    $condition: ModelResourceReactionConditionInput
  ) {
    likeResource(input: $input, condition: $condition) {
      id
      postId
      contentId
      collaborationId
      opportunityId
      seeker {
        id
        firstName
        email
        profilePic {
          bucket
          region
          key
        }       
      }
      createdAt
      updatedAt
    }
  }
`;

export const unlikeResource = /* GraphQL */ `
  mutation UnlikeResource(
    $input: DeleteResourceReactionInput!
    $condition: ModelResourceReactionConditionInput
  ) {
    unlikeResource(input: $input, condition: $condition) {
      id
      postId
      contentId
      collaborationId
      opportunityId
      seekerId
      seeker {
        id
        firstName
        email
        profilePic {
          bucket
          region
          key
        }
      }
      createdAt
      updatedAt
    }
  }
`;