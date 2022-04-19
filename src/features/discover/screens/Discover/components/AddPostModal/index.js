import React from 'react';
import {useNavigation} from '@react-navigation/native';
import ModalBottom from '../../../../../../components/BottomActionModal';
import ActionItem from '../../../../../../components/BottomActionModal/ActionItem';
import Divider from '../../../../../../components/BottomActionModal/Divider';

export default function AddPostModal({visible, toggleModal}) {
  const navigation = useNavigation();

  return (
    <ModalBottom visible={visible} toggleModal={toggleModal}>
      <ActionItem
        icon={'flag'}
        name="New Milestone"
        onPress={() => {
          navigation.navigate('MilestoneEdit', {
            previousScreen: 'DiscoverFeed',
          });
          toggleModal();
        }}
      />
      <Divider />
      <ActionItem
        icon={'fileText'}
        name="New Blog"
        onPress={() => {
          navigation.navigate('BlogEdit', {previousScreen: 'DiscoverFeed'});
          toggleModal();
        }}
      />
      <Divider />
      <ActionItem
        icon={'video'}
        name="New Video"
        onPress={() => {
          navigation.navigate('VideoEdit', {previousScreen: 'DiscoverFeed'});
          toggleModal();
        }}
      />
      <Divider />
      <ActionItem
        icon={'camera'}
        name="New Photo"
        onPress={() => {
          navigation.navigate('PhotoEdit', {previousScreen: 'DiscoverFeed'});
          toggleModal();
        }}
      />
      <Divider />
      <ActionItem
        icon={'people'}
        name="New Collaboration"
        onPress={() => {
          navigation.navigate('CollaborationEdit', {
            previousScreen: 'DiscoverFeed',
          });
          toggleModal();
        }}
      />
    </ModalBottom>
  );
}
