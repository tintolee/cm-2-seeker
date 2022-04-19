import React from 'react';
import {useNavigation} from '@react-navigation/native';
import PopupModal from '../../../../../../components/PopupModal';
import TitleText from '../../../../../../components/PopupModal/TitleText';
import MessageText from '../../../../../../components/PopupModal/MessageText';
import HintText from '../../../../../../components/PopupModal/HintText';
import {Button} from '../../../../../../components/form';
import styles from './styles';
import {View} from 'react-native';

export default function CongratsModal({visible, toggleModal}) {
  const navigation = useNavigation();

  return (
    <PopupModal visible={visible} toggleModal={toggleModal}>
      <View style={styles.title}>
        <TitleText title="YOU’RE ON A ROLL!" />
      </View>
      <View style={styles.message}>
        <MessageText message="Congrats on creating your first route map!" />
      </View>
      <View style={styles.hint}>
        <HintText hint="Now it’s time to look for opportunities that can help you achieve your goals…" />
      </View>
      <View style={styles.opportunitiesButton}>
        <Button title="View Opportunities" />
      </View>
      <View>
        <Button title="Add to route map" backgroundColor="#cdcdd2" />
      </View>
    </PopupModal>
  );
}
