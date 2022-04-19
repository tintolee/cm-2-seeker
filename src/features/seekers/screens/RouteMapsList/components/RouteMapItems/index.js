import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FullScreenCircleIndicator} from '../../../../../../components/Indicator';
import Item from './Item';
import styles from './styles';

export default function RouteMapItems({routeMaps, listLoading}) {
  const navigation = useNavigation();

  const noRouteMaps = routeMaps.length === 0;

  const NoRouteMaps = () => (
    <View style={styles.noRouteMaps}>
      <Text style={styles.noRouteMapsText}>No route maps yet.</Text>
    </View>
  );

  if (listLoading) {
    return <FullScreenCircleIndicator />;
  }

  return (
    <View style={styles.container}>
      {noRouteMaps ? (
        <NoRouteMaps />
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            data={routeMaps}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => <Item item={item} />}
          />
        </View>
      )}
    </View>
  );
}
