import React  from 'react';
import PopupModal from '../../../../../../components/PopupModal';
import TitleText from '../../../../../../components/PopupModal/TitleText';
import MessageText from '../../../../../../components/PopupModal/MessageText';
import HintText from '../../../../../../components/PopupModal/HintText';
import {Button} from '../../../../../../components/form';
import styles from './styles';
import {View} from 'react-native';

export default function CollaborationDeleteModal({
  visible,
  toggleModal,
  handleDeleteOnPress,
}) {
  return (
    <PopupModal visible={visible} toggleModal={toggleModal}>
      <View style={styles.title}>
        <TitleText title="Delete Collaboration" />
      </View>
      <View style={styles.message}>
        <MessageText message="Are you sure you want to delete this collaboration?" />
      </View>
      <View style={styles.hint}>
        <HintText hint="This action can’t be undone." />
      </View>
      <View style={styles.opportunitiesButton}>
        <Button title={'I’m sure'} onPress={handleDeleteOnPress} />
      </View>
    </PopupModal>
  );
}
