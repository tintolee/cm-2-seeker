import React from 'react';
import {Text} from 'react-native';
import styles from './styles';

export default function HintText({hint}) {
  return <Text style={styles.hint}>{hint}</Text>;
}
