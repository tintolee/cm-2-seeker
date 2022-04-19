import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text, ScrollView} from 'react-native';
import styles from './styles';
import Button from '../../../components/form/Button';
import {useNavigation} from '@react-navigation/native';
import CategoriesList from '../components/categoriesLIst';

const data = [
  {
    id: '1',
    name: 'Animals',
  },
  {
    id: '2',
    name: 'Food',
  },
  {
    id: '3',
    name: 'Art',
  },

  {
    id: '4',
    name: 'Film',
  },
  {
    id: '5',
    name: 'Music',
  },
  {
    id: '6',
    name: 'Gaming',
  },
  {
    id: '7',
    name: 'Reading',
  },
  {
    id: '8',
    name: 'Running',
  },
  {
    id: '9',
    name: 'Sports',
  },

  {
    id: '10',
    name: 'Studying',
  },
  {
    id: '11',
    name: 'Camping',
  },
  {
    id: '12',
    name: 'Watching',
  },
];

export default function Interests({route}) {
  const [selectedItems, setSelectedItems] = useState(data);
  const navigation = useNavigation();

  useEffect(() => {
    const interests = route.params?.interests;
    if (interests) {
      setSelectedItems(interests);
    }
  }, []);

  const onItemSelected = item => {
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
    navigation.navigate('Brands', {
      interests: selectedItems.filter(i => i.selected),
    });
  };
  return (
    <SafeAreaView>
      <ScrollView>

        <View style={{marginTop: '10%'}}>
          <Text style={styles.heading}>What interests you?</Text>
          <Text style={styles.subtext}>
            The topics you choose will help us match you with relevant
            opportunities.
          </Text>
        </View>
        <CategoriesList
          items={data}
          items={selectedItems}
          setSelected={onItemSelected}
        />

        <View style={{alignSelf: 'center'}}>
          <Button onPress={onPressDone} text="Next" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
