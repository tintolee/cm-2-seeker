import moment from 'moment';
import React, { useState, useEffect, useRef } from 'react';
import { Linking } from 'react-native';
import { Image, View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import * as actions from '../../_redux/actions';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { palette, theme } from '../../../../components/Theme';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import ImageS3 from '../../../../components/Image/ImageS3/index';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { API, graphqlOperation } from 'aws-amplify';
export default function ConversationList({ navigation, route, type }) {
  const dispatch = useDispatch();

  const { seeker, userConnections, conversations } = useSelector(
    (state) => ({
      seeker: state.seekerReducer.seeker,
      userConnections: state.messagingReducer.connectionList,
      conversations: state.messagingReducer.conversations,
    }),
    shallowEqual,
  );

  const CreateConversationMemberBySeekerId = /* GraphQL */ `
    subscription OnCreateConversationMemberBySeekerId($seekerId: ID!) {
      onCreateConversationMemberBySeekerId(seekerId: $seekerId) {
        updatedAt
        createdAt
        conversationId
        status
        id
      }
    }
  `;

  const CreateMessageByConversationId = /* GraphQL */ `
    subscription OnCreateMessageByConversationId($conversationId: ID!) {
      onCreateMessageByConversationId(conversationId: $conversationId) {
        id
        conversationId
        author
        body
        seekerId
        seeker {
          firstName
          lastName
        }
        createdAt
        updatedAt
      }
    }
  `;

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(CreateConversationMemberBySeekerId, {
        seekerId: seeker.id,
      }),
    ).subscribe({
      next: (event) => {
        var item = event.value.data.onCreateConversationMemberBySeekerId;

        dispatch(actions.fetchSeekerConversations(seeker.id));
      },
      error: (error) => {
        console.warn(error);
      },
    });

    return () => {
      subscription.unsubscribe();

    };
  }, []);


  const DeleteConversation = (item) => {
    dispatch(actions.deleteConversationMember({ id: item.ConversationMemberId }, () => {
      dispatch(actions.fetchSeekerConversations(seeker.id));
    }));
  };

  const focused = useIsFocused();

  React.useEffect(() => {
    if (focused) dispatch(actions.fetchSeekerConversations(seeker.id));
  }, [focused]);

  const messages = [];
  return (
    <View style={{ flex: 1, marginHorizontal: 15 }}>
      {conversations.length > 0 && (
        <FlatList
          data={conversations}
          extraData={conversations}
          renderItem={({ item, index }) => {
            return (item.type == type  && item.messages.items.length > 0) || type==='All'? (
              <ChatRow
                item={item}
                navigation={navigation}
                seeker={seeker}
                conversation={item}
                onDelete={DeleteConversation}
              />
            ) : (
              // <AddRow item={item} />
              <></>
            );
          }}></FlatList>
      )}
    </View>
  );
}

const ChatRow = ({ item, navigation, seeker, conversation, onDelete }) => {
  const { title, members, messages, id } = item;
  const _swipeable = useRef(null);
  var member = members.items.find((x) => x.seekerId !== seeker.id);
  var latestMessage;
  if (messages.items.length > 0) {
    latestMessage = messages.items[0];
  }

  var toSeeker = member?.seeker;

  const RightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0.8, 0]
    })
    return (
      <>
        <TouchableOpacity onPress={() => onDelete(item)}>
          <View
            style={{ height: 90, backgroundColor: theme.colors.primary, justifyContent: 'center', borderBottomRightRadius: 5, borderTopRightRadius: 5 }}>
            <Animated.Text
              style={{
                color: 'white',
                paddingHorizontal: 10,
                fontSize: 24,
                width: 90,

                transform: [{ scale }],

              }}>
              Delete
            </Animated.Text>
          </View>
        </TouchableOpacity>

      </>
    )
  }

  return (


    <Swipeable renderRightActions={RightActions} ref={_swipeable}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() =>
          navigation.navigate('ChatMessage', {
            otherUser: toSeeker,
            seeker,
            conversation,
          })
        }
        style={styles.row}>
       { item.type === "CONNECTIONS" &&
       <View style={styles.avatarContainer}>
          {toSeeker?.profilePic && (
            <ImageS3 imageObj={toSeeker?.profilePic} style={styles.logo} />
          )}

          {/* <View
          style={[
            styles.status,
            {
              backgroundColor:
                toSeeker.status == '1'
                  ? theme.colors.green
                  : theme.colors.grayIcon,
            },
          ]}
        />*/}
        </View>   
       } 
         {conversation.type == 'GROUP' &&
          conversation.avatar &&
          (
            <View style={styles.avatarContainer}>
              <ImageS3 imageObj={JSON.parse( conversation.avatar)} style={styles.logo} />
            </View>
          )}

        <View style={{ flex: 1, marginHorizontal: 5 }}>
          {item.type === "CONNECTIONS" ? (<Text style={styles.name}>

            {toSeeker?.firstName} {toSeeker?.lastName}
          </Text>
          ) : (
            <Text style={styles.name}>

              {conversation.title}
            </Text>

          )

          }
          <View style={{ marginTop: 5 }}>
            {latestMessage && (
              <Text style={styles.message}>{latestMessage.type == "TEXT" ? latestMessage.body : "Sent a post"}</Text>
            )}
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          {latestMessage && (
            <Text style={styles.message}>
              {moment(latestMessage.createdAt).fromNow()}
            </Text>
          )}

        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background2,
  },
  addRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.orangebg,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  rowBack: {
    flex: 1,
    backgroundColor: palette.orange,
    borderRadius: 5,
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 50,
  },
  image: {
    width: 65,
    height: 65,
    marginRight: 5,
  },
  logo: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 100,
  },
  avatarContainer: {
    height: 65,
    width: 65,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 100,
  },
  userContainer: {
    alignItems: 'center',
    marginHorizontal: 3,
    width: 75,
  },
  status: {
    width: 12,
    height: 12,
    borderWidth: 2,
    borderColor: theme.colors.background,
    borderRadius: 100,
    position: 'absolute',
    bottom: 3,
    right: 3,
  },
  name: {
    ...theme.typography.title6,
    color: theme.colors.selectionItem,
    // fontFamily: "SFProDisplay-Semibold"
  },
  message: {
    ...theme.typography.title8,
    color: theme.colors.noRouteMap,
    // fontFamily: "SFProDisplay-Semibold"
  },
  counterText: {
    fontSize: 8,
    color: palette.white,
    // fontFamily: "SFProDisplay-Semibold"
  },
  counter: {
    backgroundColor: palette.orange,
    width: 20,
    height: 20,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
});
