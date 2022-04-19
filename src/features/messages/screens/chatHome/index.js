import React from 'react';
import {View, FlatList, ScrollView, StyleSheet} from 'react-native';
import ChatMessage from './components/chatMessage';
import ChatInput from './components/chatInput';
import chatRoomData from '../../data/Chats';
import {useRoute} from '@react-navigation/native';

function ChatHome() {
  const route = useRoute();
  console.log(route.params.chatRoomId);

  return (
    <View style={styles.container}>
      {/* Passing Chat Message component  */}
      <FlatList
        data={chatRoomData.messages}
        renderItem={({item}) => <ChatMessage message={item} />}
        inverted
      />

      {/* Chat TextInput defined from a component also passing params */}
      <ChatInput chatRoomId={route.params.chatRoomId} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatHome;
