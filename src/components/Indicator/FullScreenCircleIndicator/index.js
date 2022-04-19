import React from 'react';
import {ActivityIndicator, StyleSheet,View} from 'react-native';
import {theme} from '../../Theme';

export default function FullScreenCircleIndicator({size}) {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size={size ? size : 'large'}
        color={theme.colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems:'center',
    justifyContent:'center'
  },
});
