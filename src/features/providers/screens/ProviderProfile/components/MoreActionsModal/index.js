import React from 'react';
import {useNavigation} from '@react-navigation/native';
import ModalBottom from '../../../../../../components/BottomActionModal';
import ActionItem from '../../../../../../components/BottomActionModal/ActionItem';
import Divider from '../../../../../../components/BottomActionModal/Divider';
import styles from './styles';

export default function MoreActionsModal({visible, toggleModal, onModalHide}) {
  const navigation = useNavigation();

  return (
    <ModalBottom visible={visible} toggleModal={toggleModal}>
      <ActionItem icon={'flag'} name="Report provider" />
      <Divider />
      <ActionItem icon={'copy'} name="Share to…" />
    </ModalBottom>
  );
}
