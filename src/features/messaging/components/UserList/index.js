import React, { useState, useEffect } from 'react';
import { Image, FlatList, Text, View } from 'react-native';
import { theme } from '../../../../components/Theme';
import styles from './styles';
import * as actions from '../../_redux/actions';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import UserListItem from '../UserListItem';
export default function index({ navigation }) {

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

  useEffect(() => {
    dispatch(actions.fetchUserConnections(seeker.id));
  }, [dispatch, seeker.id]);


  const handleOnPress = (item) => {

    setSelected(item)

    dispatch(actions.getUserConversation(conversations,seeker.id, item.id, (response) => {
        dispatch(actions.fetchSeekerConversations(seeker.id));
      navigation.navigate('ChatMessage', { otherUser: item, seeker, conversation: response })
     
      }));



  }

  return (
    <View style={{marginTop:10}}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        legacyImplementation={false}
        data={userConnections}
        renderItem={({ item }) => <UserListItem {...item} handleOnPress={handleOnPress}></UserListItem>}
        keyExtractor={user => user.id}
       style={{marginLeft:5}}
      />
    </View>
  );
}

