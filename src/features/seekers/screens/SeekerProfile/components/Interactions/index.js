import React, { useState, useEffect } from 'react';
import {View, Text, Alert, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button} from '../../../../../../components/form';
import {theme} from '../../../../../../components/Theme';
import styles from './styles';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

export default function Interactions({
  seekerDetail,
  friendshipRequest,
  friendshipRequestSentBySeeker,
  isFriend,
  isPrivateProfile,
  user,
  acceptFriendshipRequestOnPress,
  ignoreFriendshipRequestOnPress,
  connectOnPress,
}) {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null)
  const dispatch = useDispatch();
  const {
    seeker,
    userConnections,
    conversations
  } = useSelector(
    (state) => ({
      seeker: state.seekerReducer.seeker,
      userConnections: state.messagingReducer.connectionList,
      conversations: state.messagingReducer.conversations
    }),
    shallowEqual,
  );


  const messageOnPress = () => {
    //navigation.navigate('Messages');
  //  setSelected(item)

    var exist = false;
    var existingConversation;

    conversations.forEach((conversation) => {
    
      if (conversation.type === "CONNECTIONS") {

        conversation.members.items.forEach((member) => {
    
          if (seekerDetail.id === member.seekerId) {
            existingConversation = conversation;
            exist = true;
          }
        });
      }
    });


    if (exist && existingConversation) {
      navigation.navigate('ChatMessage', { otherUser: seekerDetail, seeker, conversation: existingConversation })

    } else {
      var input = {
        type: 'CONNECTIONS',
        title: ``,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      dispatch(actions.createUserConversation(input, (response) => {

        CreateConverstaionCallback(response, item)
      }));
    }


  };


  const CreateConverstaionCallback = (conversation, selectedUser) => {

    var input = {
      status: 1,
      comment: "",
      conversationId: conversation.id,
      seekerId: seeker.id
    }
    dispatch(actions.createConversationMember(input));

    var friend = {
      status: 1,
      comment: "",
      conversationId: conversation.id,
      seekerId: selectedUser.id,
    }
    dispatch(actions.createConversationMember(friend, (response) => {
      dispatch(actions.fetchSeekerConversations(seeker.id));
      navigation.navigate('ChatMessage', { otherUser: selectedUser, seeker, conversation: conversation })
    }));

  }



  const ButtonInteractions = () => (
    <View style={styles.interactions}>
      {/* Show Route Maps button if profile is public or seekers are friends */}
      {(!isPrivateProfile || isFriend) && (
        <View style={styles.interactionLeftButton}>
          <Button
            title={'Route Maps'}
            onPress={() => navigation.navigate('SeekerRouteMaps')}
            height={32}
          />
        </View>
      )}
      {isFriend ? (
        <Button title={'Message'} onPress={messageOnPress} height={32} />
      ) : friendshipRequest?.status === 1 ? (
        <Button
          title="Request Sent"
          onPress={() => null}
          backgroundColor={theme.colors.buttonUnfollow}
          color={theme.colors.buttonUnfollowText}
          height={32}
        />
      ) : friendshipRequestSentBySeeker?.status === 1 ? (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.removeButton}
            activeOpacity={0.5}
            onPress={() =>
              ignoreFriendshipRequestOnPress(friendshipRequestSentBySeeker?.id)
            }>
            <Text style={styles.removeButtonText}>Ignore</Text>
          </TouchableOpacity>
          <Button
            title="Accept"
            height={32}
            onPress={() =>
              acceptFriendshipRequestOnPress(
                friendshipRequestSentBySeeker?.id,
                seekerDetail.id,
                user.id,
              )
            }
          />
        </View>
      ) : (
        <Button
          title={'Connect'}
          onPress={() => connectOnPress(friendshipRequest?.id, seekerDetail.id)}
          height={32}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.interactions}>
        <TouchableOpacity
          style={styles.interaction}
          onPress={() => navigation.navigate('SeekerRouteMaps')}>
          <Text style={styles.number}>
            {seekerDetail?.routeMaps?.items?.length
              ? seekerDetail.routeMaps.items.length
              : 0}
          </Text>
          <Text style={styles.text}>Route Maps</Text>
        </TouchableOpacity>
        <View style={styles.interaction}>
          <Text style={styles.number}>
            {seekerDetail?.posts?.items?.length
              ? seekerDetail.posts.items.length
              : 0}
          </Text>
          <Text style={styles.text}>Steps</Text>
        </View>
        <View style={styles.interaction}>
          <Text style={styles.number}>
            {seekerDetail?.friends?.items?.length
              ? seekerDetail.friends.items.length
              : 0}
          </Text>
          <Text style={styles.text}>Connections</Text>
        </View>
      </View>
      <ButtonInteractions />
    </View>
  );
}
