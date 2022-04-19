import {API, graphqlOperation} from 'aws-amplify';

import * as mutations from '../../../graphql/mutations';
import * as queries from '../../../graphql/queries';
import {createConversation as apiCreateConversation} from '../../../graphql/mutations';
import {createConversationMember as apiCreateConversationMember} from '../../../graphql/mutations';
import {deleteConversationMember as apiDeleteConversationMember} from '../../../graphql/mutations';
import {createMessage as apiCreateMessage} from '../../../graphql/mutations';

export function getSeeker(id) {
  return API.graphql(graphqlOperation(queries.getSeeker, {id: id}));
}

export function getConversationsById(id) {
  return API.graphql(graphqlOperation(queries.getConversation, {id: id}));
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

export function getConversationsByGroupId(groupId) {
  const getConversations = /* GraphQL */ `
    query GetConversations(
    $filter: ModelConversationFilterInput
    $limit: Int
    $nextToken: String
  ) {
      
      listConversations (filter: $filter, limit: $limit, nextToken: $nextToken){
        items  {
          title
          id
          createdAt
          type
          avatar
          groupId
          updatedAt
          members {
            items {
              status
              updatedAt
              seeker {
                firstName
                lastName
                status
                profilePic {
                  bucket
                  key
                  region
                }
                id
              }
            }
          }
        }
      }
    }
  `;
  return API.graphql(graphqlOperation(getConversations,{filter: {groupId :{eq:groupId}} }));

  // return API.graphql(graphqlOperation(queries.listConversations,{limit:20}));
}



export function getSeekerConversations(seekerId) {
  const getSeekerConversations = /* GraphQL */ `
    query GetSeekerConversations($id: ID!) {
      getSeeker(id: $id) {
        firstName
        lastName

        conversationMembers(sortDirection: DESC, filter: {status: {eq: 1}}) {
          items {
            id
            conversation {
              title
              type
              updatedAt
              avatar
              groupId
              id
              members {
                items {
                  seekerId
                  seeker {
                    lastName
                    firstName
                    profilePic {
                      bucket
                      key
                      region
                    }
                  }
                }
              }
              messages(limit: 1, sortDirection: DESC) {
                items {
                  body
                  createdAt
                  type
                }
              }
            }
          }
        }
      }
    }
  `;
  return API.graphql(graphqlOperation(getSeekerConversations, {id: seekerId}));
}

export function createConversation(conversationForCreation) {
  return API.graphql(
    graphqlOperation(apiCreateConversation, {input: conversationForCreation}),
  );
}

export function createConversationmember(conversationMemberForCreation) {
  return API.graphql(
    graphqlOperation(apiCreateConversationMember, {
      input: conversationMemberForCreation,
    }),
  );
}

export function deleteConversationMember(conversationMemberForDelete) {
  return API.graphql(
    graphqlOperation(apiDeleteConversationMember, {
      input: conversationMemberForDelete,
    }),
  );
}

export function createMessage(messageForCreation) {
  return API.graphql(
    graphqlOperation(apiCreateMessage, {input: messageForCreation}),
  );
}

export function getConversationMessages(conversatonId, queryParams) {
  return API.graphql(
    graphqlOperation(queries.messagesByConversationId, {
      conversationId: conversatonId,
      sortDirection: 'DESC',
    }),
  );
}
