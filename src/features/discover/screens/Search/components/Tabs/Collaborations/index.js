import React, {useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import Item from '../../../../../../../components/Search/Collaborations/Item';
import NoResults from '../../NoResults';
import RecentSearch from '../../RecentSearch';
import styles from './styles';

export default function CollaborationsTab({collaborations, searchValue}) {
  return (
    <>
      {!collaborations && searchValue === '' && <RecentSearch />}
      {!collaborations && searchValue !== '' && (
        <NoResults searchValue={searchValue}/>
      )}
      {collaborations && (
        <View style={styles.container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={collaborations}
            renderItem={({item}) => <Item item={item} />}
            keyExtractor={({id}) => id.toString()}
            ListHeaderComponent={<Text style={styles.title}>Collaborations</Text>}
          />
        </View>
      )}
    </>
  );
}
