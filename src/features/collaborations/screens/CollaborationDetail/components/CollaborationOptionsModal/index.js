import React, {useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import * as messagingActions from '../../../../../messaging/_redux/actions';
import ModalBottom from '../../../../../../components/BottomActionModal';
import ActionItem from '../../../../../../components/BottomActionModal/ActionItem';
import Divider from '../../../../../../components/BottomActionModal/Divider';
import ReportContent from '../../../../../../components/ReportContent';
export default function CollaborationOptionsModal({
  visible,
  toggleModal,
  leaveCollaborationOnPress,
  cancelApplicationOnPress,
  deleteCollaborationOnPress,
  reportType,
  title,
  onModalHide,
  isCollaborationOwner,
  memberSeeker,
  collaboration,
}) {
  const [reportVisible, setReportVisible] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const registeredMembers =
    collaboration?.members &&
    collaboration?.members?.items.filter((item) => item.status === 1);

  const viewApplicantsOnPress = () => {
    navigation.navigate('CollaborationApplicants');
    onModalHide();
  };

  const messageGroupOnPress = () => {
    dispatch(messagingActions.getGroupConversations(collaboration.id,collaboration.title,collaboration.cover,collaboration.owner.id,registeredMembers,(conversation)=>{
    

        navigation.navigate('ChatMessage', { otherUser: null, seeker:memberSeeker.seeker, conversation: conversation })
   
    
    }))
  };

 

  const shareToOnPress = () => {
    Alert.alert('Coming soon...');
  };

  const editDetailsOnPress = () => {
    Alert.alert('Coming soon...');
  };

  const flagInappropriateOnPress = () => {
    setReportVisible(!reportVisible);
  };

  return (
    <ModalBottom visible={visible} toggleModal={toggleModal}>
      {isCollaborationOwner && (
        <>
          <ActionItem
            icon={'edit'}
            name="Edit details"
            onPress={editDetailsOnPress}
          />
          <Divider />
          <ActionItem
            icon={'eye'}
            name="View applicants"
            onPress={viewApplicantsOnPress}
          />
          <Divider />
          {/* <ActionItem icon={'copy'} name="Share to…" onPress={shareToOnPress} />
          <Divider /> */}
          <ActionItem
            icon={'messageCircle'}
            name="Message group"
            onPress={messageGroupOnPress}
          />
          <Divider />
          <ActionItem
            icon={'close'}
            name="Delete collaboration"
            isDestructiveButton={true}
            onPress={deleteCollaborationOnPress}
          />
        </>
      )}
      {!isCollaborationOwner && (
        <>
          <ActionItem
            icon={'flag'}
            name="Flag as inappropriate"
            onPress={flagInappropriateOnPress}
          />
          <Divider />
          {/* <ActionItem icon={'copy'} name="Share to…" onPress={shareToOnPress} /> */}
          {/* After Seeker Applied the Collaboration */}
          {memberSeeker?.status === 3 && (
            <>
              <Divider />
              <ActionItem
                icon={'close'}
                name="Cancel application"
                isDestructiveButton={true}
                onPress={cancelApplicationOnPress}
              />
            </>
          )}
          {/* After Seeker Registered the Collaboration */}
          {memberSeeker?.status === 1 && (
            <>
              <Divider />
              <ActionItem
                icon={'messageCircle'}
                name="Message group"
                onPress={messageGroupOnPress}
              />
              <Divider />
              <ActionItem
                icon={'close'}
                name="Leave collaboration"
                isDestructiveButton={true}
                onPress={leaveCollaborationOnPress}
              />
            </>
          )}
        </>
      )}
      <ReportContent
        about={title}
        type={reportType}
        visible={reportVisible}
        toggleModal={() => setReportVisible(!reportVisible)}
      />
    </ModalBottom>
  );
}
