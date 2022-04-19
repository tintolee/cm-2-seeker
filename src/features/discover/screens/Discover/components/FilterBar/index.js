import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {LineFilter} from '../../../../../../components/svg/icons';
import {theme} from '../../../../../../components/Theme';
import styles from './styles';

export default function FilterBar() {
  const [selected, setSelected] = useState(1);
  const navigation = useNavigation();

  const filters = [
    {id: 1, name: 'Newest'},
    // {id: 2, name: 'Trending'},
    // {id: 3, name: 'Near me'},
  ];

  const Item = ({id, name}) => {
    const isSelected = selected === id ? true : false;
    return (
      <TouchableOpacity
        style={[
          styles.itemContainer,
          isSelected && {borderColor: theme.colors.primary},
        ]}
        onPress={() => setSelected(id)}>
        <Text
          style={[
            styles.itemName,
            isSelected && {color: theme.colors.primary},
          ]}>
          {name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        horizontal={true}
        data={filters}
        renderItem={({item}) => <Item {...item} />}
        keyExtractor={({id}) => id.toString()}
      />
      {/* <TouchableOpacity
        onPress={() => navigation.navigate('OpportunitiesFilter')}>
        <LineFilter width={24} height={24} color={theme.colors.primary} />
      </TouchableOpacity> */}
    </View>
  );
}
