import React from 'react';
import {Alert} from 'react-native';
import ModalBottom from '../../../../../../components/BottomActionModal';
import ActionItem from '../../../../../../components/BottomActionModal/ActionItem';
import Divider from '../../../../../../components/BottomActionModal/Divider';

export default function OpportunityOptionsModal({
  visible,
  toggleModal,
  seekerAttendeeStatus,
  opportunity,
  cancelAttendOnPress,
  onModalHide,
}) {
  const {applicationRequired} = opportunity;

  const shareToOnPress = () => {
    Alert.alert('Coming soon...');
  };

  const flagInappropriateOnPress = () => {
    Alert.alert('Coming soon...');
  };
  return (
    <ModalBottom
      visible={visible}
      toggleModal={toggleModal}
      onModalHide={onModalHide}>
      {/* <ActionItem
        icon={'flag'}
        name="Flag as inappropriate"
        onPress={flagInappropriateOnPress}
      />
      <Divider /> */}
      <ActionItem icon={'copy'} name="Share to…" onPress={shareToOnPress} />
      {seekerAttendeeStatus !== 0 && (
        <>
          <Divider />
          <ActionItem
            icon={'close'}
            name={
              applicationRequired
                ? 'Withdraw my application'
                : 'I can’t attend anymore'
            }
            isDestructiveButton={true}
            onPress={cancelAttendOnPress}
          />
        </>
      )}
    </ModalBottom>
  );
}
