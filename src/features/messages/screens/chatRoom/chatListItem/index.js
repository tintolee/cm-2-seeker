import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {API, graphqlOperation} from 'aws-amplify';
import {listChatRooms} from '../../../../../graphql/queries';
import UserItem from '../components/UserItem';

export default function ChatListItem(props) {
  const [items, setChatRooms] = useState([]);
  // const [ otherUser, setOtherUser] = useState(null);

  // ChatRooms listed for main screen of messages
  useEffect(() => {
    const fetchChatrooms = async () => {
      try {
        const chatroooms = await API.graphql(
          graphqlOperation(`
        query ListChatRooms(
          $filter: ModelChatRoomFilterInput
          $limit: Int
          $nextToken: String
        ) {
          listChatRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
              id
              createdAt
              updatedAt
            }
            nextToken
          }
        }
      `),
        );
        setChatRooms(chatroooms.data.listChatRooms.items);
        console.log(chatroooms.data.listChatRooms.id);
      } catch (e) {
        console.log(e);
      }
    };

    fetchChatrooms();
  }, []);

  // useEffect(() => {
  //   const getOtherUser = async () => {
  //     const seekerInfo = await Auth.currentAuthenticatedUser();
  //     if (chatRoom.chatRoomUsers.items[0].user.id === userInfo.attributes.sub) {
  //       setOtherUser(chatRoom.chatRoomUsers.items[1].user);
  //     } else {
  //       setOtherUser(chatRoom.chatRoomUsers.items[0].user);
  //     }
  //   }
  //   getOtherUser();
  // }, [])

  // ChatRooms displayed as a list
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={({id}, index) => id}
        // UserItem defined as the component
        renderItem={({item}) => <UserItem />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
