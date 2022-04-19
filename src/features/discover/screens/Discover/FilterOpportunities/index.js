import React, {useState} from 'react';
import {View, TouchableOpacity, FlatList, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LineArrowLeft, EnterIcon} from '../../../../../components/svg/icons';
import {Button} from '../../../../../components/form';
import {theme} from '../../../../../components/Theme';
import styles from './styles';

const data = [
  {id: 1, name: 'Time', select: 'Newest'},
  {id: 2, name: 'Location', select: 'All'},
  {id: 3, name: 'Brand/Company', select: 'All'},
  {id: 4, name: 'Sector', select: 'All'},
  {id: 5, name: 'Filter 5', select: 'All'},
  {id: 6, name: 'Filter6', select: 'All'},
  {id: 7, name: 'Filter 7', select: 'All'},
];

export default function FilterOpportunities() {
  const [selected, setSelected] = useState('');

  const navigation = useNavigation();

  const selectFilterOnPress = () => {
    navigation.navigate('FilterOpportunitiesSelect');
  };

  const Item = ({name, select}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => selectFilterOnPress()}>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.selectContainer}>
        <Text style={styles.select}>{select}</Text>
        <EnterIcon height={24} width={24} color="#babcc4" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']}>
        <View style={styles.navigator}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <LineArrowLeft
              width={24}
              height={24}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
          <Text style={styles.header}>Filter Opportunities</Text>
          <TouchableOpacity>
            <Text style={styles.clear}>Clear</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={styles.selection}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({item, index}) => <Item key={index} {...item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <View style={styles.footer}>
        <Button title={'Done'} />
      </View>
    </View>
  );
}
