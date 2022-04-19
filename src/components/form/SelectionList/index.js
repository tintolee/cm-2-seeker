import React from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import {theme} from '../../../components/Theme';
import {FilledCheckmarkCircleFill, FilledCircle} from '../../svg/icons';
import styles from './styles';

export default function SelectionList({
  title,
  items,
  selected,
  setSelected,
  ...props
}) {
  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          const isSelected = selected ? selected === item.name : item.selected;
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
              <Text style={styles.itemText}>{item.name}</Text>
              <View style={styles.icon}>{icon}</View>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
}
