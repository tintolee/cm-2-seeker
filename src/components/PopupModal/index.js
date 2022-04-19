import React from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';

export default function PopupModal({visible, toggleModal, children}) {
  return (
    <Modal
      isVisible={visible}
      swipeDirection={['down']}
      onBackdropPress={toggleModal}
      onSwipeComplete={toggleModal}
      style={styles.view}>
      <View style={styles.content}>{children}</View>
    </Modal>
  );
}
