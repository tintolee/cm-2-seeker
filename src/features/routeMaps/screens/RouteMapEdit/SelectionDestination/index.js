import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SelectionList, Button} from '../../../../../components/form';
import styles from './styles';

const data = [
  {id: 1, name: 'Get dream job'},
  {id: 2, name: 'Get promoted'},
  {id: 3, name: 'Retrain skills'},
  {id: 4, name: 'Build my CV'},
  // {id: 5, name: 'Get promoted 2'},
  // {id: 6, name: 'Get promoted 3'},
  // {id: 7, name: 'Get promoted 4'},
];

export default function SelectionDestination({route}) {
  const [selected, setSelected] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const destination = route.params?.destination;
    if (destination) {
      if (!data.find((d) => d.name === destination)) {
        data.push({id: 10, name: destination});
      }
      setSelected(destination);
    }
  }, []);

  const onSelected = (value) => {
    setSelected(value.name);
  };

  const onPressDone = () => {
    navigation.navigate('RouteMapsEdit', {destination: selected});
  };

  return (
    <View style={styles.container}>
      <View style={styles.selection}>
        <SelectionList
          title="Select your destination"
          items={data}
          selected={selected}
          setSelected={onSelected}
        />
        <View style={styles.field}>
          <Text style={styles.lookingForText}>
            Don’t see what you’re looking for?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('CustomDestination')}
            activeOpacity={0.5}>
            <Text style={styles.createOwnText}>Create your own</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <SafeAreaView edges={['bottom']}>
          <Button title={'Done'} onPress={onPressDone} />
        </SafeAreaView>
      </View>
    </View>
  );
}
