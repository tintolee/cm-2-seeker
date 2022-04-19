import React from 'react';
import {useNavigation} from '@react-navigation/native';
import PopupModal from '../../../../../../../components/PopupModal';
import TitleText from '../../../../../../../components/PopupModal/TitleText';
import MessageText from '../../../../../../../components/PopupModal/MessageText';
import HintText from '../../../../../../../components/PopupModal/HintText';
import {Button} from '../../../../../../../components/form';
import styles from './styles';
import {View} from 'react-native';

export default function SuccessModal({visible, toggleModal}) {
  const navigation = useNavigation();

  const onPressViewOpportunities = () => {
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
        <MessageText message="Your application for this role has been submitted." />
      </View>
      <View style={styles.hint}>
        <HintText hint="Keep your eye on your notifications for updates on your application status." />
      </View>
      <View style={styles.button}>
        <Button
          title="View more opportunities"
          onPress={onPressViewOpportunities}
        />
      </View>
      {/* <View>
        <Button
          title="Add to route map"
          backgroundColor="#cdcdd2"
          disabled={true}
        />
      </View> */}
    </PopupModal>
  );
}
