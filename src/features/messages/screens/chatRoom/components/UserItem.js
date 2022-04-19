import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {User1, User2, User3, User4, User5} from '../../../customData.json';
import {useNavigation} from '@react-navigation/native';
import LineSeperator from '../../../../profile/screens/profile/EditProfile/components/LineSeperator';
import {theme} from '../.././../../../components/Theme';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {shallowEqual, dispatch, useSelector} from 'react-redux';
import {
  createChatRoom,
  createChatRoomUser,
} from '../../../../../graphql/mutations';

export default function UserItem({firstName, lastName, id}) {
  const {seeker} = useSelector(
    (state) => ({
      seeker: state.seekerReducer.seeker,
    }),
    shallowEqual,
  );
  const onClick = async () => {
    try {
      //  1. Create a new Chat Room for the two users to chat
      const newChatRoomData = await API.graphql(
        graphqlOperation(
          `
        mutation CreateChatRoom(
          $input: CreateChatRoomInput!
          $condition: ModelChatRoomConditionInput
        ) {
          createChatRoom(input: $input, condition: $condition) {
            id
            messages {
              nextToken
            }
            chatRoomUsers {
              nextToken
            }
            createdAt
            updatedAt
          }
        }
      `,
          {
            input: {},
          },
        ),
      );

      if (!newChatRoomData.data) {
        console.log(' Failed to create a chat room');
        return;
      }

      const newChatRoom = newChatRoomData.data.createChatRoom;
      console.log(newChatRoom);
      const createChatRoomUser = {
        seekerId: id,
        chatRoomId: newChatRoom.id,
      };
      console.log(createChatRoomUser);

      // 2. Add a seeker to the Chat Room
      await API.graphql(
        graphqlOperation(
          `
        mutation CreateChatRoomUser(
          $input: CreateChatRoomUserInput!
          $condition: ModelChatRoomUserConditionInput
        ) {
          createChatRoomUser(input: $input, condition: $condition) {
            id
            seekerId
            chatRoomId
            seeker {
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
              createdAt
              updatedAt
            }
            chatRoom {
              id
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
        }
      `,
          {
            input: {seekerId: id, chatRoomId: newChatRoom.id},
          },
        ),
      );

      //  3. Get seeker state to add as chatroom user

      await API.graphql(
        graphqlOperation(
          `
        mutation CreateChatRoomUser(
          $input: CreateChatRoomUserInput!
          $condition: ModelChatRoomUserConditionInput
        ) {
          createChatRoomUser(input: $input, condition: $condition) {
            id
            seekerId
            chatRoomId
            seeker {
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
              createdAt
              updatedAt
            }
            chatRoom {
              id
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
        }
      `,
          {
            input: {
              seekerId: seeker.id,
              chatRoomId: newChatRoom.id,
            },
          },
        ),
      );

      navigation.navigate('ChatHome', {chatRoomId: newChatRoom.id});
    } catch (e) {
      console.log(e);
    }
  };

  const navigation = useNavigation();
  return (
    <View style={{backgroundColor: theme.colors.background}}>
      <TouchableOpacity activeOpacity={0.5} onPress={onClick}>
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <Image
              source={require('../../../../../assets/img/avatar.jpeg')}
              style={styles.avatar}
            />

            <View style={styles.midContainer}>
              <Text style={styles.username}>
                {firstName}   {lastName} wws
              </Text>
            </View>
          </View>
        </View>
        <LineSeperator />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  leftContainer: {
    flexDirection: 'row',
  },
  midContainer: {
    justifyContent: 'space-around',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 15,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  lastMessage: {
    fontSize: 16,
    color: 'grey',
  },
  time: {
    fontSize: 16,
    color: 'grey',
  },
});
