import React from 'react';
import {View} from 'react-native';
import SearchInput from '../../../../../../components/Search/SearchInput';
import styles from './styles';

export default function SearchBar({search, setSearch}) {
  return (
    <View style={styles.container}>
      <SearchInput
        placeholder="Search..."
        value={search}
        onChangeText={setSearch}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="always"
        returnKeyType="search"
      />
    </View>
  );
}
