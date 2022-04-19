import React, { useState, useEffect, useCallback } from 'react';
import { TouchableOpacity, Image, SafeAreaView ,Keyboard} from 'react-native';
import { TextInput } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import ImagePicker from 'react-native-image-crop-picker';
// import Feather from 'react-native-vector-icons/Feather';
import ModalBottom from '../../../../components/BottomActionModal';
import { palette, theme } from '../../../../components/Theme';
import Header from './Header';
import * as actions from '../../_redux/actions';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import '@aws-amplify/pubsub';
import { API, graphqlOperation } from 'aws-amplify';
import { onCreateMessageByConversationId, onCreateMessage } from '../../../../graphql/subscriptions';
import awsmobile from '../../../../aws-exports';
import VideoPlayer from '../../../../components/VideoPlayer/index';
import { s3Bucket, region, uploadImage } from '../../../../hooks/useUploadImage';
import { resizeImage } from '../../../../utils/FileResizer';
import ImageS3 from '../../../../components/Image/ImageS3';
import { ShapePencil } from '../../../../components/svg/icons';
import MessagePost from './components/MessagePost'
import CollabrationPost from './components/CollabrationPost'
import ContentPost from './components/ContentPost/ContentPost';


function ChatMessage({ navigation, route }) {
  const [messages, setMessages] = useState([]);
  const [visible, setVisible] = useState(false);
  const otherUser = route?.params?.otherUser;
  const seeker = route?.params?.seeker;
  const conversation = route?.params?.conversation;
  const dispatch = useDispatch();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);


  const CreateMessageByConversationId = /* GraphQL */ `
  subscription OnCreateMessageByConversationId($conversationId: ID!) {
    onCreateMessageByConversationId(conversationId: $conversationId) {
      id
      conversationId
      author
      body
      type
      content
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

    let queryParam = {};
    queryParam.filter = {}
    dispatch(actions.getConversationMessagelist(conversation.id, queryParam, callbackGetMessages))

  }, []);

  useEffect(() => {
    const subscription = API
      .graphql(graphqlOperation(CreateMessageByConversationId, { conversationId: conversation.id }))
      .subscribe({
        next: (event) => {

          var item = event.value.data.onCreateMessageByConversationId;
          if (item.conversationId === conversation.id) {
           
            var content = JSON.parse(item.content)
            let msg = {
              _id: item.id,
              text: content.message,
              createdAt: item.createdAt,
              user: {
                _id: item.seekerId,
                name:item.author?? item.seeker.firstName,
              }
            }
            if (item.seekerId === seeker.id) return;

            setMessages((previousMessages) =>
              GiftedChat.append(previousMessages, [msg]),
            );
          }



        },
        error: error => {
          console.warn(error);
        }
      });

    return () => {
      subscription.unsubscribe();
    };

  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const callbackGetMessages = (response) => {



    let msglist = []
    response.items.forEach((item) => {
      var content = JSON.parse(item.content)
     
      msglist.push(
        {
          _id: item.id,
          text: item.type == "TEXT" ? content.message : "",
          createdAt: item.createdAt,
          user: {
            _id: item.seekerId,
            name: item.seeker.firstName,
          },
          type: item.type,
          content
        },
      );
    })

    setMessages(msglist)
  }


  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderBubble = (props) => {

    const { currentMessage } = props;
    console.log(currentMessage)
    if (currentMessage.type === "IMAGE") {
      if(currentMessage.content.postType === "CONTENT"){
        var username = currentMessage.content.opportunityProvider.displayName;
        return (
          <View styles={styles.contentContainer}>
            <ContentPost content={currentMessage.content} logo={currentMessage.content.logo}
             firstName={currentMessage.content.opportunityProvider.displayName}
             lastName={''}
             seekerId={currentMessage.content.opportunityProviderId}
             caption ={currentMessage.content.title}
             username={username}
             messageAuthor={currentMessage.user.name}
             messageTime={currentMessage.createdAt}
             isSender ={currentMessage.user._id === seeker.id}
             />
          </View>
  
        );
      }else{
        return (
          <View styles={styles.contentContainer}>
            <ImageS3
              imageObj={currentMessage.content.messagePicture}
              style={styles.image}
            />
          </View>
  
        );
      }
     
     
    }
    if (currentMessage.type === "VIDEO") {
      return (
        <View styles={styles.contentContainer}>
          <VideoPlayer videoObj={currentMessage.content.messageVideo} style={styles.video} />
        </View>

      );
    }

    if (currentMessage.type === "SEEKER") {
      return (
        <View styles={styles.contentContainer}>
          <ContentPost content={currentMessage.content}
           firstName={currentMessage.content.owner.firstName}
           lastName={currentMessage.content.owner.lastName}
           seekerId={currentMessage.content.owner.id}
           messageAuthor={currentMessage.user.name} 
           messageTime={currentMessage.createdAt}
           isSender ={currentMessage.user._id === seeker.id}
           />
        </View>

      );
    }

    if (currentMessage.type === "COLLABORATION") {
      var username = currentMessage.content.owner.firstName +' '+ currentMessage.content.owner.lastName;
      return (
        <View styles={styles.contentContainer}>
          <ContentPost content={currentMessage.content} logo={currentMessage.content.owner.profilePic}
           firstName={currentMessage.content.owner.firstName}
           lastName={currentMessage.content.owner.lastName}
           seekerId={currentMessage.content.owner.id}
           caption ={currentMessage.content.description}
           username={username}
           messageAuthor={currentMessage.user.name}
           messageTime={currentMessage.createdAt}
           isSender ={currentMessage.user._id === seeker.id}
           />
        </View>

      );
    }

    if (currentMessage.type === "POST") {
     
      var username = currentMessage.content.seeker.firstName +' '+ currentMessage.content.seeker.lastName;
      return (
        <View styles={styles.contentContainer}>
          <ContentPost content={currentMessage.content} logo={currentMessage.content.seeker.profilePic}
           firstName={currentMessage.content.seeker.firstName}
           lastName={currentMessage.content.seeker.lastName}
           seekerId={currentMessage.content.seeker.id}
           caption ={currentMessage.content.caption}
           username={username}
           messageAuthor={currentMessage.user.name}
           messageTime={currentMessage.createdAt}
           isSender ={currentMessage.user._id === seeker.id}
           />
        </View>

      );
    }


    if (currentMessage.type === "OPPORTUNITY") {
    
        var username = currentMessage.content.opportunityProvider.name;
        return (
          <View styles={styles.contentContainer}>
            <ContentPost content={currentMessage.content} logo={currentMessage.content.opportunityProvider.logo}
             firstName={currentMessage.content.opportunityProvider.name}
             lastName={""}
            // seekerId={currentMessage.content.owner.id}
             caption ={currentMessage.content.description}
             username={username}
             messageAuthor={currentMessage.user.name}
             messageTime={currentMessage.createdAt}
             isSender ={currentMessage.user._id === seeker.id}
             />
          </View>
  
        );

      }

 
    return (
      <Bubble
        {...props}
        renderUsernameOnMessage={true}
      
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
        
          

        }}
      
      />
    );
  };

  const toggleModal = () => {
    setVisible(false);
  };

  const sendToAws = (item) => {


    var input = {
      conversationId: conversation.id,
      author: seeker.firstName,
      body: item.text,
      content: JSON.stringify({ message: item.text }),
      type: 'TEXT',
      seekerId: seeker.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      // members:users,
      //  messages:[]
    }
    console.log(input)
    dispatch(actions.createUserMessage(input))
  };

  const sendToContentMessage = (content, type) => {


    var input = {
      conversationId: conversation.id,
      author: seeker.firstName,
      body: "",
      content: JSON.stringify(content),
      type: type,
      seekerId: seeker.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      // members:users,
      //  messages:[]
    }

    dispatch(actions.createUserMessage(input, () => {
      let queryParam = {};
      queryParam.filter = {}
      dispatch(actions.getConversationMessagelist(conversation.id, queryParam, callbackGetMessages))
    }))
  };


  const imagePickerHandler = () => {
    try {
      ImagePicker.openPicker({
        width: 400,
        height: 500,
        cropping: false,
      }).then((image) => {
        toggleModal()
        if (image.duration != null) {
          handleVideoSubmit(image.path)
        } else {
          handleImageSubmit(image.path);
        }

      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageSubmit = async (imageUrl) => {
    try {
      if (imageUrl) {
        const config = {
          maxWidth: 500,
          maxHeight: 500,
          compressFormat: 'JPEG',
          quality: 100,
        };

        const resizedImage = await resizeImage(imageUrl, config);

        let image;
        if (resizedImage) {
          image = await uploadImage(resizedImage.path);

          const input = {

            messagePicture: {
              key: image,
              bucket: s3Bucket,
              region: region,
            },
          };

          sendToContentMessage(input, "IMAGE")
        }
      }
    } catch (e) {
      console.log(e);
    }
  };


  const handleVideoSubmit = async (imageUrl) => {
    try {
      if (imageUrl) {

        image = await uploadImage(imageUrl);

        const input = {

          messageVideo: {
            key: image,
            bucket: s3Bucket,
            region: region,
          },
        };

        sendToContentMessage(input, "VIDEO")
      }

    } catch (e) {
      console.log(e);
    }
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: palette.white }}>
      <Header otherUser={otherUser} navigation={navigation} conversation={conversation} />
      <View style={{ backgroundColor: theme.colors.background2, flex: 1 ,marginBottom: isKeyboardVisible?-40:0}}>
        <GiftedChat
          // maxComposerHeight = {100}

          messages={messages}
          onSend={(messages) => onSend(messages)}
          renderBubble={renderBubble}
          user={{
            _id: seeker.id,
            name:seeker.firstName
          }}
          showUserAvatar={true}
          renderAvatarOnTop={true}
          renderUsernameOnMessage={true}
          showAvatarForEveryMessage={true}
          renderInputToolbar={renderInputToolbar}
          renderActions={() => {
            return (
              <TouchableOpacity
                style={{ alignSelf: 'center' }}
                onPress={() => setVisible(!visible)}>
                <Image
                  source={require('../../../../assets/img/attach3x.png')}
                  style={{ width: 40, height: 40 }}
                />
              </TouchableOpacity>
            );
          }}
          renderSend={(props) => {
            const { text, messageIdGenerator, user, onSend } = props;

            const messageSend = (item) => {
              onSend(item, true);
              sendToAws(item)
            }

            return (
              <TouchableOpacity
                style={{ alignSelf: 'center', marginHorizontal: 4 }}
                onPress={() =>
                  text && messageSend
                    ? messageSend(
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
                    style={{ height: 28, width: 28 }}
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
          renderAvatar={(props) => {
            return <></>;
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
         // bottomOffset = {}
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
        <TouchableOpacity style={styles.row} onPress={imagePickerHandler}>
          <View style={styles.bg}>
            {/* <Feather name={'image'} color={palette.white} size={20} /> */}
          </View>
          <Text style={theme.typography.title6}>Photo/Video</Text>
        </TouchableOpacity>
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
  image: {
    width: '90%',

    aspectRatio: 4 / 3,

    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    alignItems: 'flex-end'
  },
  video: {
    width: '80%',
    flex: 1,
    aspectRatio: 9 / 16,
    height: '100%'
  },
  contentContainer: {
    //  alignContent:'flex-end',
    // justifyContent:'flex-end',
    //  flexDirection:'row-reverse'
    
    marginVertical:10,
    width:'90%',
    backgroundColor:'red'
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
