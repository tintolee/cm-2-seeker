import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../../_redux/actions';
import PopupModal from '../../../../../../components/PopupModal';
import TitleText from '../../../../../../components/PopupModal/TitleText';
import MessageText from '../../../../../../components/PopupModal/MessageText';
import HintText from '../../../../../../components/PopupModal/HintText';
import {Button} from '../../../../../../components/form';
import styles from './styles';
import {View} from 'react-native';

export default function RouteMapDeleteModal({visible, toggleModal, routeMap}) {
  const [isLoading, setLoading] = useState(false);

  const navigation = useNavigation();

  const dispatch = useDispatch();
  const {seeker} = useSelector(
    state => ({
      seeker: state.seekerReducer.seeker,
    }),
    shallowEqual,
  );

  const handleDeleteOnPress = routeMap => {
    setLoading(true);

    setTimeout(() => {
      var input = {id: routeMap.id, status: 0};

      dispatch(actions.updateRouteMap(input)).then(() => {
        dispatch(actions.fetchRouteMaps(seeker.id));
        navigation.navigate('RouteMapsList');
      });
    }, 500);
  };

  return (
    <PopupModal visible={visible} toggleModal={toggleModal}>
      <View style={styles.title}>
        <TitleText title="Delete Route Map" />
      </View>
      <View style={styles.message}>
        <MessageText message="Are you sure you want to delete this route map?" />
      </View>
      <View style={styles.hint}>
        <HintText hint="This action can’t be undone." />
      </View>
      <View style={styles.opportunitiesButton}>
        <Button
          title={isLoading ? 'Deleting...' : 'I’m sure'}
          onPress={() => handleDeleteOnPress(routeMap)}
        />
      </View>
    </PopupModal>
  );
}
