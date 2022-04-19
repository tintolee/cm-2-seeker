import React from 'react';
import {View, FlatList, Text} from 'react-native';
import Item from '../../../../../../../components/Search/Accounts/Item';
import NoResults from '../../NoResults';
import RecentSearch from '../../RecentSearch';
import styles from './styles';

export default function AccountsTab({providers, searchValue}) {
  return (
    <>
      {!providers && searchValue === '' && <RecentSearch />}
      {!providers && searchValue !== '' && (
        <NoResults searchValue={searchValue} notifyMe={true} />
      )}
      {providers && (
        <View style={styles.container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={providers}
            renderItem={({item}) => <Item item={item} />}
            keyExtractor={({id}) => id.toString()}
            ListHeaderComponent={<Text style={styles.title}>Providers</Text>}
          />
        </View>
      )}
    </>
  );
}
