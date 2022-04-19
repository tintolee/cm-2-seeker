// Pass AnimatedListItem in the flatlist for animated to delete functionality

import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {API, graphqlOperation} from 'aws-amplify';
import {listSeekers} from '../../../../graphql/queries';
import ListItem from '../AnimatedListItem';

import UserItem from '../chatRoom/components/UserItem';
import {TouchableOpacity} from 'react-native';
import SearchBar from '../../../discover/screens/Search/components/SearchBar';

export default function ChatContacts(firstName, lastName, profilePic, id) {
  const [items, setUsers] = useState([]);

  // Seekers listed as a list once clicked will create a chatroom

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await API.graphql(graphqlOperation(listSeekers));
        setUsers(usersData.data.listSeekers.items);
        console.log(usersData);
      } catch (e) {
        console.log(e);
      }
    };

    fetchUsers();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={({id}, index) => id}
        renderItem={({item}) => (
          <UserItem
            firstName={item.firstName}
            lastName={item.lastName}
            id={item.id}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
