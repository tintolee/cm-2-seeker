import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import * as actions from '../../../_redux/actions';
import {opportunityAttendeeStatus} from '../../../../../utils/constants';
import {LineArrowLeft} from '../../../../../components/svg/icons';
import {Button, MultilineTextInputField} from '../../../../../components/form';
import {FullScreenCircleIndicator} from '../../../../../components/Indicator';
import {theme} from '../../../../../components/Theme';
import WarningModal from './components/WarningModal';
import SuccessModal from './components/SuccessModal';
import styles from './styles';

export default function JobApply({route}) {
  const [warningModalVisible, setWarningModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {opportunityDetail, user} = useSelector(
    (state) => ({
      opportunityDetail: state.opportunitiesReducer.opportunityDetail,
      user: state.seekerReducer.seeker,
    }),
    shallowEqual,
  );

  const {opportunityId, opportunityAttendeeId} = route.params;
  const opportunity =
    opportunityDetail.id === opportunityId ? opportunityDetail : null;

  const toggleWarningModal = () => {
    setWarningModalVisible(!warningModalVisible);
  };

  const toggleSuccessModal = () => {
    setSuccessModalVisible(!successModalVisible);
  };

  const submitOnPress = (id) => {
    setSubmitting(true);
    setError(false);

    if (comment === '') {
      setError(true);
      setSubmitting(false);
      return null;
    }

    const input = {
      status: opportunityAttendeeStatus.applied,
      seekerComment: comment,
      opportunityId: id,
      seekerId: user.id,
      opportunityAttendeeOpportunityProviderId:
        opportunity.opportunityProvider.id,
    };

    if (opportunityAttendeeId) {
      input.id = opportunityAttendeeId;
      dispatch(actions.updateOpportunityAttendee(input))
        .then(() => {
          toggleSuccessModal();
        })
        .catch((error) => {
          setSubmitting(false);
          console.log(error);
        });
    } else {
      dispatch(actions.createOpportunityAttendee(input))
        .then(() => {
          toggleSuccessModal();
        })
        .catch((error) => {
          setSubmitting(false);
          console.log(error);
        });
    }
  };

  if (!opportunity) {
    return <FullScreenCircleIndicator />;
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <SafeAreaView edges={['top']}>
          <View style={styles.navigator}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <LineArrowLeft
                width={24}
                height={24}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <View style={styles.content}>
          <Text style={styles.hostedBy}>
            Opportunity by{' '}
            <Text style={{fontWeight: 'bold'}}>
              {opportunity.opportunityProvider.name}
            </Text>
          </Text>
          <Text style={styles.title}>{opportunity.title}</Text>
          <Text style={styles.caption}>
            Please take a moment to let us know why you are interested in this
            opportunity.
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <MultilineTextInputField
            caption="Why are you the best person for this role?"
            maxLength={300}
            autoCorrect={false}
            value={comment}
            onChangeText={setComment}
            hasError={error && 'reason is required'}
          />
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.footer}>
        <SafeAreaView edges={['bottom']}>
          <Button
            title={'Submit Application'}
            onPress={() => submitOnPress(opportunity.id)}
            disabled={isSubmitting}
          />
        </SafeAreaView>
      </View>
      <WarningModal
        visible={warningModalVisible}
        toggleModal={toggleWarningModal}
      />
      <SuccessModal
        visible={successModalVisible}
        toggleModal={toggleSuccessModal}
      />
    </View>
  );
}
