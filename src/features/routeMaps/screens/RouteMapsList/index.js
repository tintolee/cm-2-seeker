import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import * as actions from '../../_redux/actions';
import CongratsModal from './components/CongratsModal';
import RouteMapCategories from './components/RouteMapCategories';
import RouteMapItems from './components/RouteMapItems';
import styles from './styles';

export default function RouteMapsList({route}) {
  const [congratsModalVisible, setCongratsModalVisible] = useState(false);

  const dispatch = useDispatch();
  const {listLoading, routeMaps, user} = useSelector(
    (state) => ({
      listLoading: state.routeMapsReducer.listLoading,
      routeMaps: state.routeMapsReducer.entities,
      user: state.seekerReducer.seeker,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(actions.fetchRouteMaps(user.id));
  }, [dispatch]);

  useEffect(() => {
    if (route.params?.forceUpdate) {
      // Force update Routemap and posts if navigation has post param.
      dispatch(actions.fetchRouteMaps(user.id));
    }
  }, [route.params?.forceUpdate]);

  const pullToRefresh = () => {
    return dispatch(actions.fetchRouteMaps(user.id));
  };

  const toggleCongratsModal = () => {
    setCongratsModalVisible(!congratsModalVisible);
  };

  return (
    <View style={styles.container}>
      <RouteMapCategories />
      <RouteMapItems
        routeMaps={routeMaps}
        listLoading={listLoading}
        pullToRefresh={pullToRefresh}
      />
      <CongratsModal
        visible={congratsModalVisible}
        toggleModal={toggleCongratsModal}
      />
    </View>
  );
}
