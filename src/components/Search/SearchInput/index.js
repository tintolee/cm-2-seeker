import React from 'react';
import {View, TextInput} from 'react-native';
import {LineSearch} from '../../svg/icons';
import {theme} from '../../Theme';
import styles from './styles';

export default function SearchInput({...props}) {
  return (
    <View style={styles.container}>
      <View style={styles.opacityBg}></View>
      <LineSearch height={24} width={24} color={theme.colors.primary} />
      <TextInput
        style={styles.input}
        placeholderTextColor={theme.colors.primary}
        underlineColorAndroid="transparent"
        autoCorrect={false}
        clearButtonMode="always"
        returnKeyType="search"
        {...props}
      />
    </View>
  );
}
