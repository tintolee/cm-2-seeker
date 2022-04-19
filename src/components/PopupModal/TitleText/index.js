import React from 'react';
import {Text} from 'react-native';
import styles from './styles';

export default function TitleText({title}) {
  return <Text style={styles.title}>{title}</Text>;
}
