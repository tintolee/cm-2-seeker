import React, {useState, useEffect, useCallback} from 'react';
import {TouchableOpacity, Image, SafeAreaView} from 'react-native';
import {TextInput} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import {GiftedChat, Bubble, InputToolbar} from 'react-native-gifted-chat';
// import Feather from 'react-native-vector-icons/Feather';
import ModalBottom from '../../../../components/BottomActionModal';
import {palette, theme} from '../../../../components/Theme';
import Header from './Header';

function ChatMessage({navigation, route}) {
  const [messages, setMessages] = useState([]);
  const [visible, setVisible] = useState(false);
  const otherUser = route?.params?.otherUser;

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: palette.orange,
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          // backgroundColor: "white",
          // borderTopColor: "#E8E8E8",
          // height: 60,
          justifyContent: 'center',
          borderTopWidth: 0,
          paddingHorizontal: 5,
          paddingVertical: 5,
          // padding: 8
        }}
      />
    );
  };

  const toggleModal = () => {
    setVisible(false);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: palette.white}}>
      <Header otherUser={otherUser} navigation={navigation} />
      <View style={{backgroundColor: theme.colors.background2, flex: 1}}>
        <GiftedChat
          // maxComposerHeight = {100}
          messages={messages}
          onSend={(messages) => onSend(messages)}
          renderBubble={renderBubble}
          user={{
            _id: 1,
          }}
          // isTyping = {true}
          renderInputToolbar={renderInputToolbar}
          renderActions={() => {
            return (
              <TouchableOpacity
                style={{alignSelf: 'center'}}
                onPress={() => setVisible(!visible)}>
                <Image
                  source={require('../../../../assets/img/attach3x.png')}
                  style={{width: 40, height: 40}}
                />
              </TouchableOpacity>
            );
          }}
          renderSend={(props) => {
            const {text, messageIdGenerator, user, onSend} = props;
            return (
              <TouchableOpacity
                style={{alignSelf: 'center', marginHorizontal: 4}}
                onPress={() =>
                  text && onSend
                    ? onSend(
                        {
                          text: text.trim(),
                          user: user,
                          _id: messageIdGenerator(),
                        },
                        true,
                      )
                    : null
                }>
                {text && onSend ? (
                  <Image
                    source={require('../../../../assets/img/send3x.png')}
                    style={{height: 28, width: 28}}
                  />
                ) : (
                  <></>
                )}
              </TouchableOpacity>
            );
          }}
          renderChatFooter={() => {
            return <Text></Text>;
          }}
          textInputProps={{
            textAlignVertical: 'center',
            style: {
              backgroundColor: 'pink',
              flex: 1,
              height: '85%',
              backgroundColor: palette.lighterGray,
              borderRadius: 100,
              paddingHorizontal: 20,
              paddingTop: 8,
              marginHorizontal: 5,
              alignSelf: 'center',
            },
          }}
          // bottomOffset = {30}
        />
      </View>

      <ModalBottom visible={visible} toggleModal={toggleModal}>
        <View style={styles.row}>
          <View style={styles.bg}>
            {/* <Feather name={'camera'} color={palette.white} size={20} /> */}
          </View>
          <Text style={theme.typography.title6}>Camera</Text>
        </View>
        <View style={styles.devider} />
        <View style={styles.row}>
          <View style={styles.bg}>
            {/* <Feather name={'image'} color={palette.white} size={20} /> */}
          </View>
          <Text style={theme.typography.title6}>Photo/Video</Text>
        </View>
      </ModalBottom>
    </SafeAreaView>
  );
}

export default ChatMessage;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  bg: {
    height: 35,
    width: 35,
    borderRadius: 100,
    backgroundColor: palette.orange,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  devider: {
    height: 1,
    backgroundColor: palette.lighterGray,
  },
});
