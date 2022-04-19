import React, {useRef, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {shallowEqual, useSelector} from 'react-redux';
import {selectReportType} from '../../../../utils/constants';
import {PostOptionsModal, SeekerPost} from '../../../../components/Post';

export default function PostFeed({route}) {
  const listRef = useRef();
  const navigation = useNavigation();

  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const {seekerDetail, routeMapDetail} = useSelector(
    (state) => ({
      seekerDetail: state.seekersReducer.seekerDetail,
      routeMapDetail: state.seekersReducer.routeMapDetail,
    }),
    shallowEqual,
  );

  const routeMapId = route.params?.routeMapId;

  const posts = routeMapId
    ? routeMapDetail?.posts?.items
    : seekerDetail?.posts?.items;

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
    setSelectedPost(post);
    setOptionsModalVisible(!optionsModalVisible);
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
            return (
              <SeekerPost
                post={item}
                onPressOptions={() => toggleOptionsModal(item)}
                onPressShare={() => handleOnPressShare(item)}
              />
            );
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
        reportType={selectReportType('Seeker Profile')}
        title={`${selectedPost?.seeker?.firstName} ${selectedPost?.seeker?.lastName} - ${selectedPost?.caption}`}
        visible={optionsModalVisible}
        toggleModal={toggleOptionsModal}
      />
    </>
  );
}
