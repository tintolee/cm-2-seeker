import React from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {SafeAreaView} from 'react-native-safe-area-context';
import UploadCVItem from './UploadCVItem';
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
      swipeDirection={['down']}
      onBackdropPress={toggleModal}
      onSwipeComplete={toggleModal}
      onModalHide={onModalHide}
      style={styles.view}>
      <View style={styles.header}>
        <View style={styles.panelHeader}>
          <View style={styles.panelHandle} />
        </View>
        <UploadCVItem
          icon={'fileText'}
          name="Upload CV"
          onPress = {()=>{}}
        />
      </View>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>{children}</View>
      </SafeAreaView>
    </Modal>
  );
}
