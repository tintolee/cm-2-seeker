import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {selectReportType} from '../../../../../../../utils/constants';
import {
  CollaborationPost,
  PostOptionsModal,
} from '../../../../../../../components/Post';
import FilterBar from '../../FilterBar';

export default function Collaborations({
  collaborations,
  postReactionHandlers,
  userId,
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
        data={collaborations}
        renderItem={({item}) => {
          let likesData = postReactionHandlers.getLikeDetails(item,userId),
          handler = postReactionHandlers.likeResourceHandler;
          return (
          <CollaborationPost
            collaboration={item}
            dispatch={dispatch}
            onPressOptions={() => toggleOptionsModal(item)}
            onPressShare={() => handleOnPressShare(item)}
            likesData={likesData}
            handler={handler}
            userId={userId}
          />
          )
        }}
        keyExtractor={({id}) => id.toString()}
        ListHeaderComponent={<FilterBar />}
      />
      <PostOptionsModal
        reportType={selectReportType('Collaboration')}
        title={`${selectedPost?.owner?.firstName} ${selectedPost?.owner?.lastName} - ${selectedPost?.title}`}
        visible={optionsModalVisible}
        toggleModal={toggleOptionsModal}
      />
    </>
  );
}
