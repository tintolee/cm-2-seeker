import React, {useState} from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {API, graphqlOperation} from 'aws-amplify';
import {createReport} from '../../graphql/mutations';
import {Button, MultilineTextInputField} from '../form';
import MessageText from '../PopupModal/MessageText';
import HintText from '../PopupModal/HintText';
import styles from './styles';

export default function ReportContent({visible, about, type, toggleModal}) {
  const [isSubmitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [comment, setComment] = useState('');

  const handleSubmitOnPress = () => {
    setSubmitting(true);
    setError(false);

    if (comment === '' || !type) {
      setError(true);
      setSubmitting(false);
      return null;
    }

    setTimeout(() => {
      const input = {
        dateTime: new Date(),
        from: 'Seeker App',
        details: comment,
        typeId: type?.value,
        type: type?.label,
        about: about,
        status: 1,
      };

      API.graphql(
        graphqlOperation(createReport, {
          input,
        }),
      ).then(() => {
        setSubmitting(false);
        setSubmitted(true);
      });
    }, 300);
  };

  return (
    <Modal
      isVisible={visible}
      swipeDirection={['down']}
      onBackdropPress={toggleModal}
      onSwipeComplete={toggleModal}
      style={styles.view}>
      <View style={styles.content}>
        <View style={styles.message}>
          <MessageText message="Report inappropriate content" />
        </View>
        <View style={styles.hint}>
          <HintText hint="Reporting content is anonymous, so other users can't tell who made the report." />
        </View>
        {!submitted ? (
          <>
            <MultilineTextInputField
              caption="Describe the details"
              maxLength={150}
              autoCorrect={false}
              value={comment}
              onChangeText={setComment}
              hasError={error && 'The details is required'}
            />
            <View style={styles.opportunitiesButton}>
              <Button
                disabled={submitted}
                title={isSubmitting ? 'Submiting...' : 'Submit'}
                onPress={handleSubmitOnPress}
              />
            </View>
          </>
        ) : (
          <>
            <View style={styles.message}>
              <MessageText message="The report has been submitted." />
            </View>
            <View style={styles.button}>
              <Button title="Back" onPress={toggleModal} />
            </View>
          </>
        )}
      </View>
    </Modal>
  );
}
