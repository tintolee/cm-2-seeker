import React from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../../_redux/actions';
import {LineClose} from '../../../../../../components/svg/icons';
import styles from './styles';

const recentSearch = ['barclays', 'finance', 'spacex', 'elon musk', 'london'];

export default function RecentSearch() {
  const dispatch = useDispatch();
  const {recentSearches} = useSelector(
    (state) => ({
      recentSearches: state.discoverReducer.recentSearches,
    }),
    shallowEqual,
  );

  const Item = ({name}) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.nameContainer}>
        <Text style={styles.name}>{name}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon}>
        <LineClose height={24} width={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
  return (
    <>
      {recentSearches.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={recentSearches}
          renderItem={({item, index}) => <Item key={index} name={item} />}
          keyExtractor={(item) => item}
          ListHeaderComponent={
            <Text style={styles.title}>Recent searches</Text>
          }
        />
      ) : (
        <Text style={styles.title}>Begin typing to see results</Text>
      )}
    </>
  );
}
