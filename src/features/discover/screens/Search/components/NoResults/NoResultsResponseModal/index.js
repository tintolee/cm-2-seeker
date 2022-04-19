import React from 'react';
import {View} from 'react-native';
import PopupModal from '../../../../../../../components/PopupModal';
import TitleText from '../../../../../../../components/PopupModal/TitleText';
import MessageText from '../../../../../../../components/PopupModal/MessageText';
import {Button} from '../../../../../../../components/form';
import styles from './styles';

export default function NoResultsResponseModal({visible, toggleModal}) {
  return (
    <PopupModal visible={visible} toggleModal={toggleModal}>
      <View style={styles.title}>
        <TitleText title="Thanks!" />
      </View>
      <View style={styles.message}>
        <MessageText message="We’ll let you know as soon as this changes" />
      </View>
      <View style={styles.opportunitiesButton}>
        <Button title="OK" onPress={toggleModal} />
      </View>
    </PopupModal>
  );
}
