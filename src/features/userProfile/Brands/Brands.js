import React, {useState, useRef, useEffect} from 'react';
import {SafeAreaView, View, Text, ScrollView} from 'react-native';
import styles from './styles';
import Button from '../../../components/form/Button';
import {useNavigation} from '@react-navigation/native';
import CategoriesList from '../components/categoriesLIst';

const data = [
  {
    id: '1',
    name: 'Nike',
  },
  {
    id: '2',
    name: 'Samsung',
  },
  {
    id: '3',
    name: 'Art',
  },

  {
    id: '4',
    name: 'Apple',
  },
  {
    id: '5',
    name: 'Arsenal',
  },
  {
    id: '6',
    name: 'Polo',
  },
  {
    id: '7',
    name: 'Sony',
  },
  {
    id: '8',
    name: 'Tesco',
  },
  {
    id: '9',
    name: 'Amazon',
  },

  {
    id: '10',
    name: 'Sainsbury',
  },
  {
    id: '11',
    name: 'Transport',
  },
  {
    id: '12',
    name: 'Gucci',
  },
];

export default function Brands({route}) {
  const navigation = useNavigation();
  const refForm = useRef();

  const [selectedItems, setSelectedItems] = useState(data);

  useEffect(() => {
    const admireBrands = route.params?.admireBrands;
    if (admireBrands) {
      setSelectedItems(admireBrands);
    }
  }, []);

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
    navigation.navigate('AboutYourself', {
      admireBrands: selectedItems.filter((i) => i.selected),
    });
  };

  return (
    <SafeAreaView>
      <ScrollView>

        <View style={{marginTop: '10%'}}>
          <Text style={styles.heading}>What brands do you admire ?</Text>
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

        <View style={{marginLeft: '10%'}}>
          <Button onPress={onPressDone} text="Next" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
