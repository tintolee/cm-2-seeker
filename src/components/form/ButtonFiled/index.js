import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import styles from './styles';

export default function ButtonFiled({
  title,
  onPress,
  backgroundColor,
  color,
  height,
  children,
  disabled,
}) {
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        TouchableOpacity={0.5}
        disabled={disabled}>
        <View
          style={[
            styles.container,
            backgroundColor && {backgroundColor: backgroundColor},
            disabled && {opacity: 0.6},
            {height: height ? height : 44},
          ]}>
          {children}
          <Text style={[styles.title, color && {color: color}]}>{title}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}
