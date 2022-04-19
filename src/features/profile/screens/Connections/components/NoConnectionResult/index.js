import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

export default function NoConnectionResult() {
  return (
    <View style={styles.emptyResult}>
      <Text style={styles.emptyResultText}>
        You don’t have any connections yet.
      </Text>
    </View>
  );
}
