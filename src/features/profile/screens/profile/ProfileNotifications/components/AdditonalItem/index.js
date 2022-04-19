import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {EnterIcon} from '../../../../../../../components/svg/icons';
import {theme} from '../../../../../../../components/Theme';
import styles from './style';

export default function PreferenceItem({
  fieldTitle,
  placeholder,
  values,
  onPress,
  ...props
}) {
  return (
    <>
      <Text style={styles.title}>{fieldTitle}</Text>

      <TouchableOpacity
        style={styles.inputContainer}
        onPress={onPress}
        activeOpacity={0.5}>
        <Text
          style={[
            styles.text,
            !placeholder && {color: theme.colors.black},
          ]}>
          {placeholder ? placeholder : 'Settings Preference'}
        </Text>
        <Text style={{color:'#f59532'}}>Yes</Text>
        <EnterIcon height={28} width={28} color={theme.colors.fieldIcon} />
      </TouchableOpacity>
    </>
  );
}
