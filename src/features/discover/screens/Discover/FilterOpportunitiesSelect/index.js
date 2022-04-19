import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LineArrowLeft} from '../../../../../components/svg/icons';
import {SelectionList, Button} from '../../../../../components/form';
import {theme} from '../../../../../components/Theme';
import styles from './styles';

const data = [
  {id: 1, name: 'Job coaching'},
  {id: 2, name: 'Work experience'},
  {id: 3, name: 'Study'},
  {id: 4, name: 'Verbal communication'},
  {id: 5, name: 'Focus area 5'},
  {id: 6, name: 'Focus area 6'},
  {id: 7, name: 'Focus area 7'},
];

export default function FilterOpportunitiesSelect() {
  const [selected, setSelected] = useState('');

  const navigation = useNavigation();

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
          <Text style={styles.header}>Filter by Brands</Text>
          <TouchableOpacity>
            <Text style={styles.clear}>Clear</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={styles.selection}>
        <SelectionList
          title="Select brands you would like to see"
          items={data}
          selected={selected}
          setSelected={setSelected}
        />
      </View>
      <View style={styles.footer}>
        <Button title={'Done'} />
      </View>
    </View>
  );
}
