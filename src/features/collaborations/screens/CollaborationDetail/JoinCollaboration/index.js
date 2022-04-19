import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../_redux/actions';
import {LineArrowLeft} from '../../../../../components/svg/icons';
import {Button, MultilineTextInputField} from '../../../../../components/form';
import {theme} from '../../../../../components/Theme';
import WarningModal from './components/WarningModal';
import SuccessModal from './components/SuccessModal';
import styles from './styles';

export default function JoinCollaboration({route}) {
  const [warningModalVisible, setWarningModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const navigation = useNavigation();
  const collaborationId = route.params?.collaborationId;
  const memberId = route.params?.memberId;

  const dispatch = useDispatch();
  const {collaborationDetail, seeker} = useSelector(
    (state) => ({
      collaborationDetail: state.collaborationsReducer.collaborationDetail,
      seeker: state.seekerReducer.seeker,
    }),
    shallowEqual,
  );

  const toggleWarningModal = () => {
    setWarningModalVisible(!warningModalVisible);
  };

  const toggleSuccessModal = () => {
    setSuccessModalVisible(!successModalVisible);
  };

  const submitOnPress = () => {
    setSubmitting(true);
    setError(false);

    if (comment === '') {
      setError(true);
      setSubmitting(false);
      return null;
    }

   // 1:Registered, 2:Invited, 3:Applied, 4:Unsuccessful

    const input = {
      status: 3, //APPLIED
      comment: comment,
      collaborationId: collaborationId,
      seekerId: seeker.id,
    };

    if (memberId) {
      input.id = memberId;
      actions
        .updateCollaborationMember(input)
        .then(() => {
          toggleSuccessModal();
        })
        .catch((error) => {
          setSubmitting(false);
          console.log(error);
        });
    } else {
      actions
        .createCollaborationMember(input)
        .then(() => {
          toggleSuccessModal();
        })
        .catch((error) => {
          setSubmitting(false);
          console.log(error);
        });
    }
  };

  const onPressBackToDetail = () => {
    dispatch(actions.fetchCollaboration(collaborationId));
    
    navigation.navigate('CollaborationDetail', {
      collaborationId: collaborationId,
      forceUpdate: new Date().toLocaleString()
    });
  };

  if (!collaborationDetail) {
    return <FullScreenCircleIndicator />;
  }

  return (
    <View style={styles.container}>
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
          Created by{' '}
          <Text style={{fontWeight: 'bold'}}>
            {collaborationDetail.owner?.firstName}{' '}
            {collaborationDetail.owner?.lastName}
          </Text>
        </Text>
        <Text style={styles.title}>{collaborationDetail.title}</Text>
        <Text style={styles.caption}>
          Please take a moment to let us know why you are interested in this
          collaborations.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <MultilineTextInputField
          caption="What do you think you will bring to this group?"
          maxLength={150}
          autoCorrect={false}
          value={comment}
          onChangeText={setComment}
          hasError={error && 'Comment section is required'}
        />
      </View>
      <View style={styles.footer}>
        <SafeAreaView edges={['bottom']}>
          <Button
            title={'Join Collaboration'}
            onPress={() => submitOnPress()}
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
        onPressBackToDetail={onPressBackToDetail}
      />
    </View>
  );
}
