import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {theme} from '../../../../components/Theme';
import RouteMapCard from '../../../../components/RouteMapCard';
import {getRouteMaps} from '../../../routeMaps/_redux/crud';

export default function SelectRouteMap({route}) {
  const [selected, setSelected] = useState('');
  const [routeMaps, setRouteMaps] = useState([]);

  const navigation = useNavigation();

  const previousScreen = route.params?.previousScreen;
  const seekerId = route.params?.seekerId;

  useEffect(() => {
    if (seekerId) {
      fetchRouteMaps(seekerId);
    }
  }, []);

  const fetchRouteMaps = (userId) => {
    const queryParams = {filter: {status: {eq: 1}}};

    getRouteMaps(userId, queryParams)
      .then((response) => {
        const {items} = response?.data.getSeeker?.routeMaps;
        setRouteMaps(items);
      })
      .catch(() => {
        setRouteMaps([]);
      });
  };

  const onRouteMapSelect = (routeMap) => {
    navigation.navigate(previousScreen, {
      routeMap: routeMap,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={routeMaps}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <RouteMapCard item={item} onPress={onRouteMapSelect} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background2,
    padding: theme.spacing.m,
  },
});
