import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import * as actions from '../../../../_redux/actions';
import PopupModal from '../../../../../../components/PopupModal';
import TitleText from '../../../../../../components/PopupModal/TitleText';
import MessageText from '../../../../../../components/PopupModal/MessageText';
import HintText from '../../../../../../components/PopupModal/HintText';
import {Button} from '../../../../../../components/form';
import styles from './styles';
import {View} from 'react-native';

export default function OpportunityCancelAttendModal({
  visible,
  toggleModal,
  opportunity,
  opportunityAttendee,
}) {
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleDeleteOnPress = (opportunityAttendee) => {
    setLoading(true);

    setTimeout(() => {
      var input = {id: opportunityAttendee.id, status: 0};
      dispatch(actions.updateOpportunityAttendee(input)).then(() => {
        setLoading(false);
        dispatch(actions.fetchOpportunity(opportunity.id));
        toggleModal();
      });
    }, 500);
  };

  return (
    <PopupModal visible={visible} toggleModal={toggleModal}>
      <View style={styles.title}>
        <TitleText title="Can't Attend" />
      </View>
      <View style={styles.message}>
        <MessageText message="Are you sure you want to cancel your attendance?" />
      </View>
      <View style={styles.hint}>
        <HintText hint="This action can’t be undone." />
      </View>
      <View style={styles.opportunitiesButton}>
        <Button
          title={isLoading ? 'Canceling...' : 'I’m sure'}
          onPress={() => handleDeleteOnPress(opportunityAttendee)}
        />
      </View>
    </PopupModal>
  );
}
