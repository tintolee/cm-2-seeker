import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import ImageS3 from '../Image/ImageS3';
import styles from './styles';

export default function RouteMapCard({item, onPress}) {
  return (
    <TouchableOpacity
      style={styles.item}
      activeOpacity={0.5}
      onPress={() => onPress(item)}>
      <ImageS3 imageObj={item.coverPhoto} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.categoryText}>{item.category.name}</Text>
        <View style={styles.bottomContent}>
          <View>
            <Text style={styles.destinationText}>{item.destination}</Text>
            <Text style={styles.focusAreaText}>
              {item.focusAreas && item.focusAreas.length !== 0
                ? item.focusAreas.map((item) => item).join(', ')
                : ''}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
