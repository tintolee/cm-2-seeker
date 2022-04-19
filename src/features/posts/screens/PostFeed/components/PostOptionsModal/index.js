import React from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ModalBottom from '../../../../../../components/BottomActionModal';
import ActionItem from '../../../../../../components/BottomActionModal/ActionItem';
import Divider from '../../../../../../components/BottomActionModal/Divider';

export default function PostOptionsModal({
  visible,
  toggleModal,
  post,
  deletePostOnPress,
  onModalHide,
}) {
  const navigation = useNavigation();

  const shareStepOnPress = () => {
    Alert.alert('Coming soon...');
  };

  const editStepOnPress = () => {
    if (post) {
      toggleModal();

      switch (post.type) {
        case 'MILESTONE':
          return setTimeout(() => {
            navigation.navigate('MilestoneEdit', {
              id: post.id,
              previousScreen: 'RouteMapDetail',
            });
          }, 250);
        case 'BLOG':
          return setTimeout(() => {
            navigation.navigate('BlogEdit', {
              id: post.id,
              previousScreen: 'RouteMapDetail',
            });
          }, 250);
        case 'PHOTO':
          return setTimeout(() => {
            navigation.navigate('PhotoEdit', {
              id: post.id,
              previousScreen: 'RouteMapDetail',
            });
          }, 250);
        case 'VIDEO':
          return setTimeout(() => {
            navigation.navigate('VideoEdit', {
              id: post.id,
              previousScreen: 'RouteMapDetail',
            });
          }, 250);
        default:
          return Alert.alert('Coming soon...');
      }
    }
  };

  return (
    <ModalBottom
      visible={visible}
      toggleModal={toggleModal}
      onModalHide={onModalHide}>
      <ActionItem icon={'share'} name="Share step" onPress={shareStepOnPress} />
      <Divider />
      <ActionItem icon={'edit'} name="Edit step" onPress={editStepOnPress} />
      <Divider />
      <ActionItem
        icon={'close'}
        name="Delete step"
        isDestructiveButton={true}
        onPress={deletePostOnPress}
      />
    </ModalBottom>
  );
}
