import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../../_redux/actions';
import {theme, width} from '../../../../../../components/Theme';
import {FilledPlusCircleFill} from '../../../../../../components/svg/icons';

const mockData = [
  {
    id: '1',
    name: 'Finance',
    bgColor: '#f59532',
    status: 0,
  },
  {
    id: '2',
    name: 'Health',
    bgColor: '#d6700a',
    status: 0,
  },
  {
    id: '3',
    name: 'Skills',
    bgColor: '#753d06',
    status: 0,
  },
];
export default function RouteMapCategories() {
  const [categories, setCategories] = useState([]);

  const navigation = useNavigation();

  const dispatch = useDispatch();
  const {routeMapCategories} = useSelector(
    (state) => ({
      routeMapCategories: state.routeMapsReducer.routeMapCategories,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(actions.fetchRouteMapCategories()).then((response) => {
      const {items} = response.data.listRouteMapCategorys;
      setCategories(items.concat(mockData));
    });
  }, [dispatch]);

  renderTypes = (item, index) => {
    const isLastItem = index === categories.length - 1;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('RouteMapsEdit', {category: item})}
        disabled={!item.status}
        style={[
          styles.typeBox,
          index === 1 ? {marginLeft: theme.spacing.m} : null,
          isLastItem ? {marginRight: theme.spacing.m / 2} : null,
          {backgroundColor: item.bgColor ? item.bgColor : theme.colors.primary},
          item.status === 0 ? {opacity: 0.15} : 1,
        ]}>
        <View style={styles.type}>
          <Text style={styles.typeText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Text style={styles.title}>Add a route map...</Text>
      <View style={{alignItems: 'center', flexDirection: 'row'}}>
        <TouchableOpacity style={{marginHorizontal: theme.spacing.m/2}} 
          onPress={() => navigation.navigate('RouteMapsEdit', {category: categories[0]})}
        >
          <FilledPlusCircleFill
            width={30}
            height={30}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
        <FlatList
          horizontal
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToAlignment="center"
          data={categories}
          keyExtractor={(item, index) => `${item.id}`}
          renderItem={({item, index}) => this.renderTypes(item, index)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    ...theme.typography.title4,
    paddingHorizontal: theme.spacing.m,
  },
  typeBox: {
    width: (width - theme.spacing.xl * 2) / 3,
    marginHorizontal: theme.spacing.sm / 2,
    overflow: 'hidden',
    borderRadius: theme.radius.m,
    marginVertical: theme.spacing.m,
  },
  type: {
    height: (width - theme.spacing.xl * 2) / 3.5,
    padding: theme.spacing.s,
    justifyContent: 'flex-end',
  },
  typeText: {
    ...theme.typography.title6,
    color: theme.colors.white,
  },
});
