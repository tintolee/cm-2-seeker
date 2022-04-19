import React from 'react';
import {useNavigation} from '@react-navigation/native';
import PopupModal from '../../../../../../../components/PopupModal';
import TitleText from '../../../../../../../components/PopupModal/TitleText';
import MessageText from '../../../../../../../components/PopupModal/MessageText';
import HintText from '../../../../../../../components/PopupModal/HintText';
import {Button} from '../../../../../../../components/form';
import {LineUpload} from '../../../../../../../components/svg/icons';
import styles from './styles';
import {View} from 'react-native';

export default function WarningModal({visible, toggleModal}) {
  const navigation = useNavigation();

  return (
    <PopupModal visible={visible} toggleModal={toggleModal}>
      <View style={styles.title}>
        <TitleText title="WHOOPS!" />
      </View>
      <View style={styles.message}>
        <MessageText message="It looks like you haven’t uploaded your CV to your account yet." />
      </View>
      <View style={styles.hint}>
        <HintText hint="You must upload your CV in order to submit an application." />
      </View>
      <View style={styles.button}>
        <Button title="Upload CV">
          <LineUpload width={24} height={24} color="#fff" />
        </Button>
      </View>
      <View>
        <Button
          title="Cancel"
          backgroundColor="#fff"
          color="#c1c1c1"
          onPress={toggleModal}
        />
      </View>
    </PopupModal>
  );
}
