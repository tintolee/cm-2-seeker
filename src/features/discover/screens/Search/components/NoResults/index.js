import React, {useState} from 'react';
import {Share, Text, TouchableWithoutFeedback, View} from 'react-native';
import * as actions from '../../../../_redux/actions';
import {Button} from '../../../../../../components/form';
import NoResultsResponseModal from './NoResultsResponseModal';
import styles from './styles';
import {theme} from '../../../../../../components/Theme';

export default function NoResults({
  searchValue,
  notifyMe = false,
  jumpToTab,
  isShown,
}) {
  const [responseModalVisible, setResponseModalVisible] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const toggleResponseModal = () => {
    setResponseModalVisible(!responseModalVisible);
  };

  const handleNotifyMe = async () => {
    setSubmitting(true);

    const response = await actions.fetchProviderNotExists(searchValue);

    const {items} = response.data.listOpsNotInApps;

    if (items.length > 0) {
      const provider = items[0];

      const input = {
        id: provider.id,
        interested: parseInt(provider.interested) + 1,
        name: searchValue,
        status: provider.status,
      };

      actions
        .updateProviderNotExists(input)
        .then(() => {
          toggleResponseModal();
        })
        .catch((error) => {
          setSubmitting(false);
          console.log(error);
        });
    } else {
      const input = {
        interested: 1,
        name: searchValue,
        status: 1,
      };

      actions
        .createProviderNotExists(input)
        .then(() => {
          toggleResponseModal();
        })
        .catch((error) => {
          setSubmitting(false);
          console.log(error);
        });
    }
  };

  const shareHandler = async () => {
    try {
      const result = await Share.share({
        message: 'connecme2',
        url: Platform.select({
          ios: 'https://connecme2.com',
          android: 'https://connecme2.com',
        }),
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.title}>No Results</Text>
        {/* <View style={{}}> */}
        <Text style={styles.message}>
          We couldn’t find anything matching your search for {searchValue}.
        </Text>
        {/* </View> */}
        {isShown ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            <Text
              style={[
                styles.message,
                {marginBottom: 0},
              ]}>{`Is ${searchValue} a `}</Text>
            <TouchableWithoutFeedback onPress={() => jumpToTab('providers')}>
              <Text
                style={[
                  styles.message,
                  {marginBottom: 0, color: theme.colors.primary},
                ]}>
                {' '}
                Provider{' '}
              </Text>
            </TouchableWithoutFeedback>
            <Text style={[styles.message, {marginBottom: 0}]}>or </Text>
            <TouchableWithoutFeedback onPress={() => jumpToTab('seekers')}>
              <Text
                style={[
                  styles.message,
                  {marginBottom: 0, color: theme.colors.primary},
                ]}>
                {' '}
                Seeker?{' '}
              </Text>
            </TouchableWithoutFeedback>
          </View>
        ) : (
          <></>
        )}
        {notifyMe === true && (
          <>
            <Text style={styles.hint}>
              Would you like us to notify you when this changes?
            </Text>
            <Button
              title="Notify me"
              onPress={handleNotifyMe}
              disabled={isSubmitting}
            />
          </>
        )}

        {notifyMe == 'seeker' && (
          <>
            <Text style={styles.hint}>
              Would you like to invite them to join ConnecMe2?
            </Text>
            <Button
              title="Invite"
              onPress={shareHandler}
              disabled={isSubmitting}
            />
          </>
        )}
      </View>
      <NoResultsResponseModal
        visible={responseModalVisible}
        toggleModal={toggleResponseModal}
      />
    </View>
  );
}
