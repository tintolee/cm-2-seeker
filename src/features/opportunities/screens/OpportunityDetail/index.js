import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import moment from 'moment';

import * as actions from '../../_redux/actions';
import {
  getAttandeeState,
  opportunityAttendeeStatus,
} from '../../../../utils/constants';
import {Button} from '../../../../components/form';
import {FullScreenCircleIndicator} from '../../../../components/Indicator';
import Header from './components/Header';
import Body from './components/Body';
import OpportunityOptionsModal from './components/OpportunityOptionsModal';
import OpportunityCancelAttendModal from './components/OpportunityCancelAttendModal';
import {theme} from '../../../../components/Theme';
import styles from './styles';

import * as discoverActions from '../../../discover/_redux/actions';
import {getLikeDetails, likeResourceHandler} from '../../../../lib/postreactions/postreactionhandlers';


export default function OpportunityDetail({route}) {
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const [
    opportunityCancelAttendModalVisible,
    setOpportunityCancelAttendModalVisible,
  ] = useState(false);
  const [optionType, setOptionType] = useState('');
  const [seekerAttendeeStatus, setSeekerAttendeeStatus] = useState(0);
  const [opportunityAttendee, setOpportunityAttendee] = useState(undefined);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {opportunityDetail, actionsLoading, user} = useSelector(
    (state) => ({
      opportunityDetail: state.opportunitiesReducer.opportunityDetail,
      actionsLoading: state.opportunitiesReducer.actionsLoading,
      user: state.seekerReducer.seeker,
    }),
    shallowEqual,
  );

  const {opportunityId, likesData} = route.params;


  const getAllData = () => {
    console.log("refresh");
    return dispatch(discoverActions.fetchOpportunities())
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

     let likeData = getLikeDetails(opportunityDetail,user.id);
     console.log("likesData in OpportunityDetail route: ", likesData);

  useEffect(() => {
    dispatch(actions.fetchOpportunity(opportunityId));
  }, [dispatch, opportunityId]);

  useEffect(() => {
    if (opportunityDetail) {
      let _seekerAttendee =
        opportunityDetail &&
        opportunityDetail.attendees &&
        opportunityDetail.attendees.items.find((a) => a.seeker.id === user.id);
      if (_seekerAttendee) {
        setSeekerAttendeeStatus(_seekerAttendee.status);
        setOpportunityAttendee(_seekerAttendee);
      } else {
        setSeekerAttendeeStatus(0);
        setOpportunityAttendee(undefined);
      }
    }
  }, [opportunityDetail, opportunityId]);

  const toggleOptionsModal = () => {
    setOptionsModalVisible(!optionsModalVisible);
  };

  const toggleOpportunityCancelAttendModalVisible = () => {
    setOpportunityCancelAttendModalVisible(
      !opportunityCancelAttendModalVisible,
    );
  };

  const cancelAttendOnPress = () => {
    setOptionType('CancelAttend');

    toggleOptionsModal();
  };

  const onOptionsModalHide = () => {
    if (optionType === 'CancelAttend') {
      toggleOpportunityCancelAttendModalVisible();
    }
    setOptionType('');
  };

  const applyNowOnPress = ({opportunity}) => {
    const {applicationRequired} = opportunity;

    //If application required navigate to JobApply screen
    if (applicationRequired) {
      navigation.navigate('JobApply', {
        opportunityId: opportunityId,
        opportunityAttendeeId: opportunityAttendee && opportunityAttendee.id,
      });
    }
    //If not required make seeker registered
    else {
      const input = {
        status: opportunityAttendeeStatus.registered,
        seekerComment: 'RSVP',
        opportunityId: opportunityId,
        seekerId: user.id,
        opportunityAttendeeOpportunityProviderId:
          opportunity.opportunityProvider.id,
      };

      if (opportunityAttendee) {
        input.id = opportunityAttendee.id;
        dispatch(actions.updateOpportunityAttendee(input))
          .then(() => {
            dispatch(actions.fetchOpportunity(opportunityId));
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        dispatch(actions.createOpportunityAttendee(input))
          .then(() => {
            dispatch(actions.fetchOpportunity(opportunityId));
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  const getButtonState = ({status, opportunity}) => {
    const {
      applicationDeadline,
      applicationRequired,
      capacity,
      isLimitedCapacity,
    } = opportunity;

    const opportunityAttendees =
      opportunity?.attendees?.items.filter((item) => item.status === 1) || 0;

    if (applicationDeadline) {
      const isClosed = moment(applicationDeadline).isBefore(
        moment().format('YYYY-MM-DD'),
        'day',
      );

      if (isClosed)
        return {
          title: applicationRequired ? 'Applications Closed' : 'RSVP Closed',
          disabled: true,
          bgColor: theme.colors.buttonDisabled,
        };
    }

    if (
      !applicationRequired &&
      isLimitedCapacity &&
      capacity === opportunityAttendees.length
    ) {
      return {
        title: 'At Capacity',
        disabled: true,
        bgColor: theme.colors.buttonDisabled,
      };
    } else if (
      applicationRequired &&
      capacity > 0 &&
      capacity === opportunityAttendees.length
    ) {
      return {
        title: 'At Capacity',
        disabled: true,
        bgColor: theme.colors.buttonDisabled,
      };
    }

    return getAttandeeState({status, applicationRequired});
  };

  if (actionsLoading) {
    return <FullScreenCircleIndicator />;
  }

  if (!opportunityDetail) {
    return null;
  }

  const buttonState = getButtonState({
    status: seekerAttendeeStatus,
    opportunity: opportunityDetail,
  });

  return (
    <View style={styles.container}>
      <Header
        opportunity={opportunityDetail}
        actionOnPress={toggleOptionsModal}
        seekerAttendeeStatus={seekerAttendeeStatus}
      />
      <Body 
      opportunity={opportunityDetail}
      dispatch={dispatch}
      likeData={likesData}
       seekerId={user.id}
       handler={likeResourceHandler}
       navigation={navigation}
      />
      <View style={styles.footer}>
        <SafeAreaView edges={['bottom']}>
          <Button
            title={buttonState.title}
            onPress={() => applyNowOnPress({opportunity: opportunityDetail})}
            disabled={buttonState.disabled}
            backgroundColor={buttonState.bgColor}
          />
        </SafeAreaView>
      </View>
      <OpportunityOptionsModal
        visible={optionsModalVisible}
        toggleModal={toggleOptionsModal}
        opportunity={opportunityDetail}
        seekerAttendeeStatus={seekerAttendeeStatus}
        cancelAttendOnPress={cancelAttendOnPress}
        onModalHide={onOptionsModalHide}
      />
      <OpportunityCancelAttendModal
        visible={opportunityCancelAttendModalVisible}
        toggleModal={toggleOpportunityCancelAttendModalVisible}
        opportunity={opportunityDetail}
        opportunityAttendee={opportunityAttendee}
      />
    </View>
  );
}
