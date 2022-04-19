import React from 'react';
import {Alert} from 'react-native';
import ModalBottom from '../../../../../../components/BottomActionModal';
import ActionItem from '../../../../../../components/BottomActionModal/ActionItem';
import Divider from '../../../../../../components/BottomActionModal/Divider';
import styles from './styles';

export default function RouteMapOptions({
  visible,
  toggleModal,
  deleteRouteMapOnPress,
  onModalHide,
}) {
  const anotherActionOnPress = () => {
    Alert.alert('Coming soon...');
  };

  const markCompleteOnPress = () => {
    Alert.alert('Coming soon...');
  };

  return (
    <ModalBottom
      visible={visible}
      toggleModal={toggleModal}
      onModalHide={onModalHide}>
      {/* <ActionItem
        icon={'cornerUpRight'}
        name="Another action…"
        onPress={anotherActionOnPress}
      />
      <Divider /> */}
      <ActionItem
        icon={'checkmark'}
        name="Mark as complete"
        onPress={markCompleteOnPress}
      />
      <Divider />
      <ActionItem
        icon={'close'}
        name="Delete route map"
        isDestructiveButton={true}
        onPress={deleteRouteMapOnPress}
      />
    </ModalBottom>
  );
}
