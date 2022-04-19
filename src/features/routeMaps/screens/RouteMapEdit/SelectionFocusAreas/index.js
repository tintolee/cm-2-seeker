import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SelectionList, Button} from '../../../../../components/form';
import styles from './styles';

export default function SelectionFocusAreas({route}) {
  const data = [
    {id: 1, name: 'Job coaching'},
    {id: 2, name: 'Work experience'},
    {id: 3, name: 'Study'},
    {id: 4, name: 'Verbal communication'},
  ];

  const [selectedItems, setSelectedItems] = useState(data);

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const focusAreas = route.params?.focusAreas;
      if (focusAreas.length) {
        const _setSelected = [];
        const rest = [...focusAreas];

        data.forEach((d, i) => {
          if (focusAreas.includes(d.name)) {
            rest.splice(rest.indexOf(d.name), 1);
            _setSelected.push({...d, selected: true});
          } else {
            _setSelected.push(d);
          }
        });

        rest.forEach((f, i) => {
          _setSelected.push({id: data.length + 1, name: f, selected: true});
        });

        setSelectedItems(_setSelected);
      }
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const onItemSelected = (item) => {
    let renderData = [...selectedItems];
    for (let data of renderData) {
      if (data.id == item.id) {
        data.selected = data.selected == null ? true : !data.selected;
        break;
      }
    }
    setSelectedItems(renderData);
  };

  const onPressDone = () => {
    var focusAreas = selectedItems
      .filter((i) => i.selected)
      .map(function (item) {
        return item['name'];
      });
    navigation.navigate('RouteMapsEdit', {
      focusAreas: focusAreas,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.selection}>
        <SelectionList
          title="Select your key focus areas"
          items={selectedItems}
          // selected = {selectedItems}
          setSelected={onItemSelected}
        />
        <View style={styles.field}>
          <Text style={styles.lookingForText}>
            Don’t see what you’re looking for?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('CustomFocus', {selectedItems})}
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
