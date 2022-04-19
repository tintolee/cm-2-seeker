import React from 'react';
import {ActivityIndicator} from 'react-native';
import {theme} from '../../Theme';

export default function CircleIndicator({size}) {
  return (
    <ActivityIndicator
      size={size ? size : 'small'}
      color={theme.colors.primary}
    />
  );
}
