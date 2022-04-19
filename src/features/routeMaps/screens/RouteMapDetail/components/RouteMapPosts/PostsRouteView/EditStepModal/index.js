import React from 'react';
import ModalBottom from '../../../../../../../../components/BottomActionModal';
import ActionItem from '../../../../../../../../components/BottomActionModal/ActionItem';
import Divider from '../../../../../../../../components/BottomActionModal/Divider';
import styles from './styles';

export default function EditStepModal({visible, toggleModal}) {
  return (
    <ModalBottom visible={visible} toggleModal={toggleModal}>
      <ActionItem icon={'share'} name="Share step" />
      <Divider />
      <ActionItem icon={'eye'} name="View step" />
      <Divider />
      <ActionItem icon={'edit'} name="Edit step" />
      <Divider />
      <ActionItem
        icon={'close'}
        name="Delete step"
        isDestructiveButton={true}
      />
    </ModalBottom>
  );
}
