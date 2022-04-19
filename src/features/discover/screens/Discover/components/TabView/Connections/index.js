import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {selectReportType} from '../../../../../../../utils/constants';
import {
  PostOptionsModal,
  SeekerPost,
} from '../../../../../../../components/Post';
import FilterBar from '../../FilterBar';

export default function Connections({
  posts,
  userId,
  postReactionHandlers,
  dispatch
}) {
  const navigation = useNavigation();
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const toggleOptionsModal = (post) => {
    setSelectedPost(post);
    setOptionsModalVisible(!optionsModalVisible);
  };

  const handleOnPressShare = (post) => {
    navigation.navigate('Share', {post});
  };

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={posts}
        renderItem={({item}) => {
          let likesData = postReactionHandlers.getLikeDetails(item,userId),
          handler = postReactionHandlers.likeResourceHandler;
          return (
          <SeekerPost
            post={item}
            postType="discover-post"
            dispatch={dispatch}
            likesData={likesData}
            seekerId={userId}
            handler={handler}
            onPressOptions={() => toggleOptionsModal(item)}
            onPressShare={() => handleOnPressShare(item)}
          />
        )
        }}
        keyExtractor={({id}) => id.toString()}
        ListHeaderComponent={<FilterBar />}
      />
      <PostOptionsModal
        reportType={selectReportType('Seeker Post')}
        title={`${selectedPost?.seeker?.firstName} ${selectedPost?.seeker?.lastName} - ${selectedPost?.caption}`}
        visible={optionsModalVisible}
        toggleModal={toggleOptionsModal}
      />
    </>
  );
}
