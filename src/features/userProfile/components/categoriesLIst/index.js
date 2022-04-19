import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import styles from './style';
import {theme} from '../../../../components/Theme';
import Svg, {Path} from 'react-native-svg';
import {
  FilledCheckmarkCircleFill,
  FilledCircle,
} from '../../../../components/svg/icons';
import selectImage from '../../../../hooks/selectImage';

export default function CategoriesList({
  title,
  items,
  selected,
  setSelected,
  ...props
}) {
  return (
    <SafeAreaView>
      <Svg
        height="50%"
        width="100%"
        style={styles.svg1}
        viewBox="30 100 1200 500">
        <Path
          fill="#edf1f7"
          d="M0,256L48,261.3C96,267,192,277,288,245.3C384,213,480,139,576,101.3C672,64,768,64,864,101.3C960,139,1056,213,1152,218.7C1248,224,1344,160,1392,128L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />
      </Svg>

      <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{backgroundColor: '#edf1f7', marginTop: '20%', paddingTop: 20}}>
        <FlatList
          data={items}
          numColumns={4}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            console.log(item)
            const isSelected = selected
              ? selected === item.name
              : item.selected;
            const icon = isSelected ? (
              <FilledCheckmarkCircleFill
                width="24"
                height="24"
                color={theme.colors.primary}
              />
            ) : (
              <FilledCircle
                width="24"
                height="24"
                color={theme.colors.iconNotChecked}
              />
            );
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.5}
                style={styles.item}
                onPress={() => setSelected(item)}>
                <Image source = {selectImage(item.name)} style={{height: 18, width: 18}} tintColor = {"#7f7f7f"} />
                <Text style={styles.itemText}>{item.name}</Text>
                <View style={styles.icon}>{icon}</View>
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
      <Svg
        height="50%"
        width="100%"
        style={styles.svg}
        viewBox="200 0 1100 200">
        <Path
          fill="#edf1f7"
          d="M0,256L48,261.3C96,267,192,277,288,245.3C384,213,480,139,576,101.3C672,64,768,64,864,101.3C960,139,1056,213,1152,218.7C1248,224,1344,160,1392,128L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />
      </Svg>
    </SafeAreaView>
  );
}
