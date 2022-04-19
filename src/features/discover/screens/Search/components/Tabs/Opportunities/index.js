import React, {useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import Item from '../../../../../../../components/Search/Opportunities/Item';
import NoResults from '../../NoResults';
import RecentSearch from '../../RecentSearch';
import styles from './styles';

export default function OpportunitiesTab({opportunities, searchValue}) {
  return (
    <>
      {!opportunities && searchValue === '' && <RecentSearch />}
      {!opportunities && searchValue !== '' && (
        <NoResults searchValue={searchValue}/>
      )}
      {opportunities && (
        <View style={styles.container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={opportunities}
            renderItem={({item}) => <Item item={item} />}
            keyExtractor={({id}) => id.toString()}
            ListHeaderComponent={<Text style={styles.title}>Opportunities</Text>}
          />
        </View>
      )}
    </>
  );
}
