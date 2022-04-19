import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SearchInput from '../../../../../../components/Search/SearchInput';
import styles from './styles';

export default function SearchBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <SearchInput
        placeholder="Search..."
        editable={true}
        onFocus={() => navigation.navigate('Search')}
      />
    </View>
  );
}
