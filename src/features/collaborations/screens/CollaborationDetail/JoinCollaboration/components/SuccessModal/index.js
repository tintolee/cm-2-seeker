import React from 'react';
import PopupModal from '../../../../../../../components/PopupModal';
import TitleText from '../../../../../../../components/PopupModal/TitleText';
import MessageText from '../../../../../../../components/PopupModal/MessageText';
import HintText from '../../../../../../../components/PopupModal/HintText';
import {Button} from '../../../../../../../components/form';
import styles from './styles';
import {View} from 'react-native';

export default function SuccessModal({
  visible,
  toggleModal,
  onPressBackToDetail,
}) {
  return (
    <PopupModal visible={visible} toggleModal={toggleModal}>
      <View style={styles.title}>
        <TitleText title="SUCCESS" />
      </View>
      <View style={styles.message}>
        <MessageText message="Your application has been submitted." />
      </View>
      <View style={styles.hint}>
        <HintText hint="We’ll notify you shortly if you have been accepted." />
      </View>
      <View style={styles.button}>
        <Button title="Back" onPress={onPressBackToDetail} />
      </View>
    </PopupModal>
  );
}
