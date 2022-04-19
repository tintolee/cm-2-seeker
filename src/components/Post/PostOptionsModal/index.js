import React, {useState} from 'react';
import {Share, Platform, Alert} from 'react-native';
import ModalBottom from '../../BottomActionModal';
import ActionItem from '../../BottomActionModal/ActionItem';
import Divider from '../../BottomActionModal/Divider';
import ReportContent from '../../ReportContent';

export default function PostOptionsModal({
  reportType,
  visible,
  toggleModal,
  title,
}) {
  const [reportVisible, setReportVisible] = useState(false);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: title,
        url: Platform.select({
          ios: 'https://connecme2.com',
          android: 'https://connecme2.com',
        }),
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const messageGroupOnPress = () => {
    Alert.alert('Coming soon...');
  };

  const flagInappropriateOnPress = () => {
    setReportVisible(!reportVisible);
  };
  return (
    <>
      <ModalBottom visible={visible} toggleModal={toggleModal}>
        <ActionItem
          icon={'flag'}
          name="Flag as inappropriate"
          onPress={() => flagInappropriateOnPress()}
        />
        {/* <Divider /> */}
        {/* <ActionItem icon={'copy'} name="Share to…" onPress={onShare} />
      <Divider /> */}
        {/* <ActionItem
        icon={'messageCircle'}
        name="Message organiser"
        onPress={messageGroupOnPress}
      /> */}
        <ReportContent
          about={title}
          type={reportType}
          visible={reportVisible}
          toggleModal={() => setReportVisible(!reportVisible)}
        />
      </ModalBottom>
    </>
  );
}
