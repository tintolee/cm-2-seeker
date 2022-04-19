import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FilledPlusCircleFill} from '../../../../../../components/svg/icons';
import {CircleIndicator} from '../../../../../../components/Indicator';
import Item from './Item';
import {theme} from '../../../../../../components/Theme';
import styles from './styles';
import {useDispatch} from 'react-redux';
import * as actions from '../../../../_redux/actions';

export default function RouteMapItems({routeMaps, listLoading, pullToRefresh}) {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [categories, setCategories] = useState([]);

  const noRouteMaps = routeMaps.length === 0;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchRouteMapCategories()).then((response) => {
      const {items} = response.data.listRouteMapCategorys;
      setCategories(items);
    });
  }, [dispatch]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    pullToRefresh().then(() => setRefreshing(false));
  }, []);

  const NoRouteMaps = () => (
    <View style={styles.noRouteMaps}>
      <Text style={styles.noRouteMapsText}>
        You don’t have any route maps yet. Choose a category above to get
        started
      </Text>
      {/* Make it work when Category selection is active */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('RouteMapsEdit', {category: categories[0]})
        }>
        <FilledPlusCircleFill
          width={30}
          height={30}
          color={theme.colors.primary}
        />
      </TouchableOpacity>
    </View>
  );

  if (listLoading && !refreshing) {
    return (
      <View style={styles.container}>
        <View style={styles.noRouteMaps}>
          <CircleIndicator size="large" />
        </View>
      </View>
    );
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
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      )}
    </View>
  );
}
