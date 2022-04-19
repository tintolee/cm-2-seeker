import React from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';


export default function ModalBottom({
  visible,
  toggleModal,
  onModalHide,
  children,
}) {
  return (
    <Modal
      isVisible={visible}
      backdropTransitionInTiming= {100}
      backdropTransitionOutTiming= {100}
      swipeDirection={['down']}
      onBackdropPress={toggleModal}
      onSwipeComplete={toggleModal}
      onModalHide={onModalHide}
      style={styles.view}>
      <View style={styles.header}>
        <View style={styles.panelHeader}>
          <View style={styles.panelHandle} />
        </View>
      </View>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>{children}</View>
      </SafeAreaView>
    </Modal>
  );
}
