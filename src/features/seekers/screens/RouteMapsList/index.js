import React from 'react';
import {View} from 'react-native';
import {shallowEqual, useSelector} from 'react-redux';
import RouteMapItems from './components/RouteMapItems';
import styles from './styles';

export default function RouteMapsList({route}) {
  const {seekerDetail} = useSelector(
    (state) => ({
      seekerDetail: state.seekersReducer.seekerDetail,
    }),
    shallowEqual,
  );

  const routeMaps = seekerDetail?.routeMaps?.items;

  routeMaps?.sort(function (x, y) {
    let a = new Date(y.createdAt),
      b = new Date(x.createdAt);
    return a - b;
  });

  return (
    <View style={styles.container}>
      <RouteMapItems
        routeMaps={routeMaps}
        // listLoading={listLoading}
      />
    </View>
  );
}
