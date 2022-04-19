import React, {useState, useRef, useEffect} from 'react';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import {SeekerPost} from '../../../../components/Post';
import PostOptionsModal from './components/PostOptionsModal';
import PostDeleteModal from './components/PostDeleteModal';

import * as postReactionHandlers from '../../../../lib/postreactions/postreactionhandlers';

export default function PostFeed({route}) {
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const [postDeleteModalVisible, setPostDeleteModalVisible] = useState(false);
  const [optionType, setOptionType] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const listRef = useRef();

  const {posts, user} = useSelector(
    (state) => ({
      posts: state.profileReducer.posts,
      user: state.seekerReducer.seeker,
    }),
    shallowEqual,
  );

  useEffect(() => {
    const postId = route.params?.postId;
    if (postId && posts) {
      const itemIndex = posts.findIndex((item) => item.id === postId);

      if (listRef.current !== null && itemIndex !== -1) {
        listRef.current.scrollToIndex({index: itemIndex});
      }
    }
  }, []);

  const toggleOptionsModal = (post) => {
    setOptionsModalVisible(!optionsModalVisible);
    setSelectedPost(post);
  };

  const togglePostDeleteModal = () => {
    setPostDeleteModalVisible(!postDeleteModalVisible);
  };

  const deletePostOnPress = () => {
    setOptionType('DeletePost');
    toggleOptionsModal(selectedPost);
  };

  const onOptionsModalHide = () => {
    if (optionType === 'DeletePost') {
      togglePostDeleteModal();
    }
    setOptionType('');
  };

  const handleOnPressShare = (post) => {
    navigation.navigate('Share', {post});
  };

  return (
    <>
      {posts && (
        <FlatList
          ref={listRef}
          showsVerticalScrollIndicator={false}
          data={posts}
          renderItem={({item}) => {
            let likesData = postReactionHandlers.getLikeDetails(item,user.id),
          handler = postReactionHandlers.likeResourceHandler;
            return (
            <SeekerPost
              post={item}
              postType="post"
              dispatch={dispatch}
              likesData={likesData}
              seekerId={user.id}
              handler={handler}
             //onPressOptions={() => toggleOptionsModal(item)}
              onPressShare={() => handleOnPressShare(item)}
            />
            )
          }}
          keyExtractor={({id}) => id.toString()}
          onScrollToIndexFailed={(info) => {
            const wait = new Promise((resolve) => setTimeout(resolve, 700));
            wait.then(() => {
              listRef.current?.scrollToIndex({
                index: info.index,
                animated: true / false,
              });
            });
          }}
        />
      )}
      <PostOptionsModal
        visible={optionsModalVisible}
        toggleModal={toggleOptionsModal}
        post={selectedPost}
        deletePostOnPress={deletePostOnPress}
        onModalHide={onOptionsModalHide}
      />
      <PostDeleteModal
        visible={postDeleteModalVisible}
        toggleModal={togglePostDeleteModal}
        post={selectedPost}
      />
    </>
  );
}
