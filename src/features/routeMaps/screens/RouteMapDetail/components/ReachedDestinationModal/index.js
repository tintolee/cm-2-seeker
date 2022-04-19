import React from 'react';
import PopupModal from '../../../../../../components/PopupModal';
import TitleText from '../../../../../../components/PopupModal/TitleText';
import MessageText from '../../../../../../components/PopupModal/MessageText';
import {Button} from '../../../../../../components/form';
import styles from './styles';
import {View} from 'react-native';

export default function ReachedDestinationModal({visible, toggleModal}) {
  return (
    <PopupModal visible={visible} toggleModal={toggleModal}>
      <View style={styles.title}>
        <TitleText title="Great Work!" />
      </View>
      <View style={styles.message}>
        <MessageText message="Nice one, you’ve reached your destination." />
      </View>
      <View style={styles.button}>
        <Button title="Notify my connections" />
      </View>
      <View style={styles.button}>
        <Button title="Don’t notify my connections" backgroundColor="#cdcdd2" />
      </View>
      <View>
        <Button title="Cancel" backgroundColor="#fff" color="#c1c1c1" />
      </View>
    </PopupModal>
  );
}
