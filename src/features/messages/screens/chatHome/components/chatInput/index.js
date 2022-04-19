import React, {useState, useEffect} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {API, graphqlOperation} from 'aws-amplify';
import {shallowEqual, dispatch, useSelector} from 'react-redux';
import {createChatMessage} from '../../.././../../../graphql/mutations';
// import {listChatRooms} from '../../.././../../../graphql/queries';
import {useRoute} from '@react-navigation/native';

function ChatInput({props}) {
  // const {chatRoomId} = props;
  const route = useRoute();
  // console.log(route.params.chatRoomId);

  const {seeker} = useSelector(
    (state) => ({
      seeker: state.seekerReducer.seeker,
    }),
    shallowEqual,
  );

  const [message, setMessage] = useState('');
  const [items, setUsers] = useState([]);

  //Sending a message to the backend
  const onSendPress = async () => {
    try {
      const newMessageData = await API.graphql(
        graphqlOperation(createChatMessage, {
          input: {
            content: message,
            seekerId: seeker.id,
            chatRoomId: route.params.chatRoomId,
          },
        }),
      );

      console.log(newMessageData);
      await updateChatRoomLastMessage(newMessageData.data.createMessage.id);
    } catch (e) {
      console.log(e);
    }

    setMessage('');
  };

  const onPress = () => {
    if (!message) {
    } else {
      onSendPress();
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.mainContainer}>
        <TouchableOpacity>
          <Image
            source={require('../../../../../../assets/img/attach3x.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TextInput
          placeholder={'Type a message'}
          style={styles.textInput}
          numberOfLines={3}
          multiline
          value={message}
          onChangeText={setMessage}
          textAlignVertical="center"
        />

        <TouchableOpacity onPress={onPress}>
          <View style={styles.buttonContainer}>
            <Image
              source={require('../../../../../../assets/img/send3x.png')}
              style={{height: 28, width: 28}}
            />
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default ChatInput;
