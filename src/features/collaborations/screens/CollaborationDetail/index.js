import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import * as actions from '../../_redux/actions';
import * as discoverActions from '../../../discover/_redux/actions';

import {collaborationStatus} from '../../../../utils/constants';
import {Button} from '../../../../components/form';
import {FullScreenCircleIndicator} from '../../../../components/Indicator';
import {theme} from '../../../../components/Theme';
import {selectReportType} from '../../../../utils/constants';
import Header from './components/Header';
import Body from './components/Body';
import CollaborationOptionsModal from './components/CollaborationOptionsModal';
import CollaborationDeleteModal from './components/CollaborationDeleteModal';
import ResponseInviteModal from './components/ResponseInviteModal';
import styles from './styles';

import {getLikeDetails, likeResourceHandler} from '../../../../lib/postreactions/postreactionhandlers';


export default function CollaborationDetail({route}) {
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const [responseInviteModalVisible, setResponseInviteModalVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const navigation = useNavigation();

  const collaborationId = route.params?.collaborationId;
  const previousScreen = route.params?.previousScreen;

  const dispatch = useDispatch();
  const {collaborationDetail, actionsLoading, user} = useSelector(
    (state) => ({
      collaborationDetail: state.collaborationsReducer.collaborationDetail,
      actionsLoading: state.collaborationsReducer.actionsLoading,
      user: state.seekerReducer.seeker,
    }),
    shallowEqual,
  );
   
  const isOwner = collaborationDetail?.owner?.id === user.id;
  const memberSeeker = collaborationDetail?.members?.items.find(
    (m) => m.seekerId === user.id,
  );

  const getAllData = () => {
    return dispatch(discoverActions.fetchCollaborations())
           .then(() => dispatch(discoverActions.fetchDiscover()))
      //.then(() => setLoading(false));
  };

  useEffect(() => {
    if (route.params?.forceUpdate) {
      // Force update Routemap and posts if navigation has forceUpdate param.
      getAllData();
    }
  },[route.params?.forceUpdate]);

  useEffect(() => {
   if(route.params?.reload){
     navigation.pop();
   }
  },[route.params?.reload]);

  /**
   * Like details
   */
   // console.log("collaborationDetail: ", collaborationDetail);
    let likeData = getLikeDetails(collaborationDetail,user.id);

  

  useEffect(() => {
    dispatch(actions.fetchCollaboration(collaborationId));
  }, [dispatch, collaborationId]);

  const toggleOptionsModal = () => {
    setOptionsModalVisible(!optionsModalVisible);
  };

  const toggleResponseInviteModal = () => {
    setResponseInviteModalVisible(!responseInviteModalVisible);
  };

  const cancelApplicationOnPress = () => {
    if (memberSeeker?.id) {
      var input = {id: memberSeeker.id, status: 0};

      actions
        .updateCollaborationMember(input)
        .then(() => {
          dispatch(actions.fetchCollaboration(collaborationId));
          toggleOptionsModal();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      toggleOptionsModal();
    }
  };

  const deleteCollaborationOnPress = () => {
    if (collaborationId) {
      var input = {id: collaborationId, status: 0};

      dispatch(
        actions.updateCollaboration(input, () => {
          navigation.navigate('DiscoverFeed', {
            forceUpdate: new Date().toLocaleString(),
          });
          toggleOptionsModal();
        }),
      );
    }
  };

  const handleOnResponseInvitationPress = ({memberId, status}) => {
    const input = {
      id: memberId,
      status: status,
    };
    if (memberId) {
      actions
        .updateCollaborationMember(input)
        .then(() => {
          dispatch(actions.fetchCollaboration(collaborationId));
          toggleResponseInviteModal();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleCollaborationOnPress = (member) => {
    const status = member?.status;

    if (!status) {
      navigation.navigate('JoinCollaboration', {
        collaborationId: collaborationId,
        memberId: memberSeeker?.id,
      });
    } else if (status === collaborationStatus.invited) {
      toggleResponseInviteModal();
    }
  };

  const getButtonState = (member) => {
    const status = member?.status;

    if (!status)
      return {title: 'Join Collaboration', disabled: false, bgColor: null};

    switch (status) {
      case 1:
        return {
          title: 'Registered',
          disabled: true,
          bgColor: theme.colors.buttonDisabled,
        };
      case 2:
        return {
          title: 'Invited',
          disabled: false,
          bgColor: null,
        };
      case 3:
        return {
          title: 'Applied',
          disabled: true,
          bgColor: theme.colors.buttonDisabled,
        };
      case 4:
        return {
          title: 'Unregistered',
          disabled: true,
          bgColor: theme.colors.buttonDisabled,
        };
      default:
        return {title: 'Join Collaboration', disabled: false, bgColor: null};
    }
  };

  if (actionsLoading) {
    return <FullScreenCircleIndicator />;
  }

  if (!collaborationDetail) {
    return null;
  }

  const buttonState = getButtonState(memberSeeker);

  
  return (
    <View style={styles.container}>
      <Header
        collaboration={collaborationDetail}
        actionOnPress={toggleOptionsModal}
      />
      <Body 
       collaboration={collaborationDetail} 
       dispatch={dispatch}
       likeData={likeData}
       seekerId={user.id}
       navigation={navigation}
       handler={likeResourceHandler}
      />
      {!isOwner && (
        <View style={styles.footer}>
          <SafeAreaView edges={['bottom']}>
            <Button
              title={buttonState.title}
              onPress={() => handleCollaborationOnPress(memberSeeker)}
              disabled={buttonState.disabled}
              backgroundColor={buttonState.bgColor}
            />
          </SafeAreaView>
        </View>
      )}
      <CollaborationOptionsModal
        isCollaborationOwner={isOwner}
        memberSeeker={memberSeeker}
        reportType={selectReportType('Collaboration')}
        title={`${collaborationDetail?.owner?.firstName} ${collaborationDetail?.owner?.lastName} - ${collaborationDetail?.title}`}
        visible={optionsModalVisible}
        collaboration={collaborationDetail}
        toggleModal={toggleOptionsModal}
        leaveCollaborationOnPress={cancelApplicationOnPress}
        cancelApplicationOnPress={cancelApplicationOnPress}
        deleteCollaborationOnPress={() => {
          setOptionsModalVisible(false);
          setTimeout(() => {
            setIsVisible(true);
          }, 500);
        }}
        onModalHide={toggleOptionsModal}
      />
      <CollaborationDeleteModal
        visible={isVisible}
        toggleModal={() => {
          setIsVisible(false);
        }}
        handleDeleteOnPress={deleteCollaborationOnPress}
      />
      <ResponseInviteModal
        memberSeeker={memberSeeker}
        visible={responseInviteModalVisible}
        toggleModal={toggleResponseInviteModal}
        onAcceptInvitationPress={handleOnResponseInvitationPress}
        onDeclinedInvitationPress={handleOnResponseInvitationPress}
      />
    </View>
  );
}
