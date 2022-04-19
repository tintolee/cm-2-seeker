import React from 'react';
import {View, FlatList, Text} from 'react-native';
import Item from '../../../../../../../components/Search/Seekers/Item';
import NoResults from '../../NoResults';
import RecentSearch from '../../RecentSearch';
import styles from './styles';

export default function SeekersTab({seekers, searchValue, jumpToTab}) {
  return (
    <>
      {!seekers && searchValue === '' && <RecentSearch />}
      {!seekers && searchValue !== '' && (
        <NoResults searchValue={searchValue} notifyMe={"seeker"} jumpToTab={jumpToTab} />
      )}
      {seekers && (
        <View style={styles.container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={seekers}
            renderItem={({item}) => <Item item={item} />}
            keyExtractor={({id}) => id.toString()}
            ListHeaderComponent={<Text style={styles.title}>Seekers</Text>}
          />
        </View>
      )}
    </>
  );
}
