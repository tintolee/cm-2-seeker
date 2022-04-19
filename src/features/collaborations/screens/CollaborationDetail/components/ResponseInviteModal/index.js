import React from 'react';
import {collaborationStatus} from '../../../../../../utils/constants';
import PopupModal from '../../../../../../components/PopupModal';
import TitleText from '../../../../../../components/PopupModal/TitleText';
import MessageText from '../../../../../../components/PopupModal/MessageText';
import {Button} from '../../../../../../components/form';
import styles from './styles';
import {View} from 'react-native';

export default function ResponseInviteModal({
  memberSeeker,
  visible,
  toggleModal,
  onAcceptInvitationPress,
  onDeclinedInvitationPress,
}) {
  return (
    <PopupModal visible={visible} toggleModal={toggleModal}>
      <View style={styles.title}>
        <TitleText title="You're Invited" />
      </View>
      <View style={styles.message}>
        <MessageText message="Respond to your invitation" />
      </View>
      <View style={styles.modalButton}>
        <Button
          title="No thanks"
          backgroundColor="#cdcdd2"
          onPress={() =>
            onDeclinedInvitationPress({
              memberId: memberSeeker?.id,
              status: collaborationStatus.unsuccessful,
            })
          }
        />
      </View>
      <Button
        title={'I’m in'}
        onPress={() =>
          onAcceptInvitationPress({
            memberId: memberSeeker?.id,
            status: collaborationStatus.registered,
          })
        }
      />
    </PopupModal>
  );
}
