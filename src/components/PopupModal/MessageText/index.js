import React from 'react';
import {Text} from 'react-native';
import styles from './styles';

export default function MessageText({message}) {
  return <Text style={styles.message}>{message}</Text>;
}
