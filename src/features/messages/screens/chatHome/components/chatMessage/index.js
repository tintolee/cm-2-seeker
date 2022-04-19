import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import styles from './styles';
import {User1} from '../../../../customData.json';
import Message from '../../../../data/types';
import {theme} from '../../../../../../components/Theme';

function ChatMessage(props) {
  const {firstName, lastName} = props;
  message: Message;
  const {message} = props;
  const isMyMessage = () => {
    return message.user.id === 'u1';
  };
  return (
    <View style={styles.container}>
      <View
        style={[
          {
            marginLeft: isMyMessage() ? '20%' : 0,
            marginRight: isMyMessage() ? 0 : '20%',
          },
        ]}>
        <View
          style={{
            ...styles.messageBox,
            alignSelf: isMyMessage() ? 'flex-end' : 'flex-start',
            backgroundColor: isMyMessage() ? '#f59532' : 'white',
          }}>
          <Text
            style={{
              color: isMyMessage() ? 'white' : 'black',
              fontWeight: 'bold',
              marginBottom: 5,
            }}>
            {firstName}asdsad
            {lastName}
          </Text>
          <Text style={{color: isMyMessage() ? 'white' : 'black'}}>
            {message.content}
          </Text>
          <Text
            style={{
              color: isMyMessage() ? 'white' : 'black',
              alignSelf: 'flex-end',
            }}>
            {User1.lastSeen}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default ChatMessage;
