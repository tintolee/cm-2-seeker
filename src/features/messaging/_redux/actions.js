import * as types from './types';
import * as requestFromServer from './crud';
import { callTypes } from './reducers';

export const fetchUserConnections = (seekerId) => (dispatch) => {
  //Fetch active connection friendship
  const queryParams = { filter: { status: { eq: 1 } } };

  return requestFromServer
    .getFriendshipSeekers(seekerId, queryParams)
    .then((response) => {
      const { friends } = response.data.getSeeker;

      dispatch({
        type: types.USER_CONNECTION_LIST_FETCHED,
        payload: { friends },
      });
    })
    .catch((error) => {
      error.clientMessage = "Can't find friends";
      dispatch({
        type: types.USER_CONNECTION_LIST_FETCHED_ERROR,
        payload: { error, callType: callTypes.list },
      });
    });
};

export const fetchGroupConversations = (groupId, callBack) => (dispatch) => {
  return requestFromServer
    .getConversationsByGroupId(groupId)
    .then((response) => {

      if (callBack) callBack(response.data.listConversations.items);
    })
    .catch((error) => {

      console.log(error)
    });
};

export const fetchConversationById = (id, callBack) => (dispatch) => {
  return requestFromServer
    .getConversationsById(id)
    .then((response) => {

      if (callBack) callBack(response.data.getConversation);
    })
    .catch((error) => {

      console.log(error)
    });
};

export const getGroupConversations = (groupId, title, avatar, seekerId, members, callBack) => (dispatch) => {

  dispatch(

    fetchGroupConversations(groupId, (response) => {
      if (response && response.length > 0) {
        if (callBack) callBack(response[0])
      } else {
        var input = {
          type: 'GROUP',
          title: title,
          groupId: groupId,
          avatar: JSON.stringify(avatar),
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        dispatch(
          createUserConversation(input, (response) => {
            console.log("conversation Created :", response.id)

            dispatch(CreateConverstaionGroupCallback(response, seekerId, members));
            if (callBack) callBack(response)

          }),
        );
      }
    }),
  );


}

const CreateConverstaionGroupCallback = (conversation, seekerId, members) => (dispatch) => {
  console.log("CreateConverstaionGroupCallback:")
  console.log(seekerId)
  console.log(members)
  var input = {
    status: 1,
    comment: '',
    conversationId: conversation.id,
    seekerId: seekerId,
  };
  dispatch(createConversationMember(input));

  members.forEach((value) => {
    var input = {
      status: 1,
      comment: '',
      conversationId: conversation.id,
      seekerId: value.seekerId,
    };
    dispatch(createConversationMember(input));
  });

  console.log("CreateConverstaionGroupCallback:")
};


export const addUserToGroupConversations = (groupId, seekerId, callBack) => (dispatch) => {

  dispatch(
    fetchGroupConversations(groupId, (response) => {
      if (response && response.length > 0) {
        var input = {
          status: 1,
          comment: "",
          conversationId: response.id,
          seekerId: seekerId
        }
        dispatch(createConversationMember(input));
      } else {
        var input = {
          type: 'GROUP',
          title: title,
          groupId: groupId,
          avatar: JSON.stringify(avatar),
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        dispatch(
          createUserConversation(input, (response) => {
            console.log("conversation Created :", response.id)

            var input = {
              status: 1,
              comment: "",
              conversationId: conversation.id,
              seekerId: seekerId
            }
            dispatch(createConversationMember(input));
            if (callBack) callBack(response)

          }),
        );
      }
    }),
  );


}


export const fetchSeekerConversations = (seekerId, callBack) => (dispatch) => {
  return requestFromServer
    .getSeekerConversations(seekerId)
    .then((response) => {
      var exist = false;
      var conversations = [];
      response.data.getSeeker.conversationMembers.items.forEach((item) => {

        var conversation = item.conversation;

        conversation.ConversationMemberId = item.id;

        conversation.lastMessageDate = conversation.updatedAt
        if (conversation.messages.items.length > 0) {
          conversation.lastMessageDate = conversation.messages.items[0].createdAt;
        }

        conversations.push(conversation);

      });

      const sorted = conversations.sort((a, b) => {
        const dateA = new Date(`${a.lastMessageDate}`).valueOf();
        const dateB = new Date(`${b.lastMessageDate}`).valueOf();
        if (dateA > dateB) {
          return -1; // return -1 here for DESC order
        }
        return 1 // return 1 here for DESC Order
      });

      dispatch({
        type: types.USER_CONVERSATION_LIST_FETCHED,
        payload: sorted,
      });

      if (callBack) callBack(sorted);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const createUserConversation =
  (conversationForCreation, callBack) => (dispatch) => {
    return requestFromServer
      .createConversation(conversationForCreation)
      .then((response) => {
        if (callBack) callBack(response.data.createConversation);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  export const createConversation =
  (conversationForCreation, callBack) => (dispatch) => {
    return requestFromServer
      .createConversation(conversationForCreation)
  };
export const createConversationMember =
  (conversationMemberForCreation, callBack) => (dispatch) => {
    return requestFromServer
      .createConversationmember(conversationMemberForCreation)
      .then((response) => {
        if (callBack) callBack(response.data.createConversationMember);
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const deleteConversationMember =
  (conversationMemberForDelete, callBack) => (dispatch) => {
    return requestFromServer
      .deleteConversationMember(conversationMemberForDelete)
      .then((response) => {
        if (callBack) callBack(response.data.deleteConversationMember);
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const createUserMessage =
  (messageForCreation, callBack) => (dispatch) => {
    return requestFromServer
      .createMessage(messageForCreation)
      .then((response) => {
        if (callBack) callBack(response.data.createConversation)
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const shareContentMessage = (content, contentType, seekerId, toSeekerIds) => (dispatch) => {

  dispatch(fetchSeekerConversations(seekerId, (conversations) => {
    toSeekerIds.forEach((val) => {
      
      dispatch(getUserConversation(conversations, seekerId, val, (conversation) => {
        var input = {
          conversationId: conversation.id,
          author: '',
          body: '',
          content: JSON.stringify(content),
          type: GetMessageType(contentType),
          seekerId: seekerId,
          createdAt: new Date(),
          updatedAt: new Date(),
          // members:users,
          //  messages:[]
        };

        dispatch(createUserMessage(input, () => { }));


      }))
    })
  }));
};

const GetMessageType=(contentType)=>{
  switch(contentType.toLowerCase()){
    case 'blog' : return 'POST'
    case 'photo': return 'IMAGE'
    case 'video' : return 'VIDEO'
    case 'milestone' : return 'POST'
    case 'collaboration' : return 'COLLABORATION'
    case 'opportunity' : return 'OPPORTUNITY'
  }
}


export const getUserConversation = (conversations, seekerId, toSeekerId, callBack) => (dispatch) => {
  console.log('getUserConversation');

  var exist = false;
  var existingConversation;

  conversations.forEach((conversation) => {

    if (conversation.type === "CONNECTIONS") {

      conversation.members.items.forEach((member) => {

        if (toSeekerId === member.seekerId) {
          existingConversation = conversation;
          exist = true;
        }
      });
    }
  });
console.log(exist)
  if (exist && existingConversation) {

    if (callBack) callBack(existingConversation)

  } else {
    var input = {
      type: 'CONNECTIONS',
      title: ``,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    dispatch(createUserConversation(input, (response) => {
      dispatch(CreateConverstaionCallback(response, seekerId, toSeekerId))

      if (callBack) callBack(response)
    }));
  }

}

const CreateConverstaionCallback = (conversation, seekerId, toSeekerId) => (dispatch) => {

  var input = {
    status: 1,
    comment: "",
    conversationId: conversation.id,
    seekerId: seekerId
  }
  dispatch(createConversationMember(input));

  var friend = {
    status: 1,
    comment: "",
    conversationId: conversation.id,
    seekerId: toSeekerId,
  }
  dispatch(createConversationMember(friend));

}

export const getConversationMessagelist =
  (conversationId, queryParams, callBack) => (dispatch) => {
    return requestFromServer
      .getConversationMessages(conversationId, queryParams)
      .then((response) => {
        if (callBack) callBack(response.data.messagesByConversationId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  export const clear = () => (dispatch) => {
    dispatch({
      type: types.MESSAGING_CLEAR,
    });
  };