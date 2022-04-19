import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import PopupModal from '../../../../../../components/PopupModal';
import TitleText from '../../../../../../components/PopupModal/TitleText';
import MessageText from '../../../../../../components/PopupModal/MessageText';
import {Button} from '../../../../../../components/form';
import styles from './styles';

export default function SuccessCreatedModal({visible, toggleModal}) {
  const navigation = useNavigation();

  const onPressGoToDiscover = () => {
    navigation.navigate('DiscoverFeed', {
      forceUpdate: new Date().toLocaleString(),
    });
  };

  return (
    <PopupModal visible={visible}>
      <View style={styles.title}>
        <TitleText title="SUCCESS" />
      </View>
      <View style={styles.message}>
        <MessageText message="You have created a collaboration" />
      </View>
      <View style={styles.button}>
        <Button title="Go to Discover" onPress={onPressGoToDiscover} />
      </View>
    </PopupModal>
  );
}
