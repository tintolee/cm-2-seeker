import React from 'react';
import {View, StyleSheet} from 'react-native';

function LineSeperator(props) {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#edf1f7',
    borderBottomWidth: 1,
    bottom: 20,
    marginHorizontal: 20,
  },
});

export default LineSeperator;
