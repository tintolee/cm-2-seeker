import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {EnterIcon} from '../../svg/icons';
import {theme} from '../../../components/Theme';
import styles from './styles';

export default function LinkSelectionField({
  fieldTitle,
  placeholder,
  values,
  onPress,
  ...props
}) {
  return (
    <>
      <Text style={styles.title}>{fieldTitle}</Text>

      <TouchableOpacity style={styles.inputContainer} onPress={onPress} activeOpacity={0.5}>
        <Text
          style={[
            styles.text,
            !placeholder && {color: theme.colors.formFieldPlaceholder},
          ]}>
          {placeholder ? placeholder : 'None selected'}
        </Text>
        <EnterIcon height={28} width={28} color={theme.colors.fieldIcon} />
      </TouchableOpacity>
    </>
  );
}
