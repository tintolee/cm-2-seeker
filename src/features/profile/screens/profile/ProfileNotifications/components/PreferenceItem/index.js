import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {theme} from '../../../../../../../components/Theme';
import ToggleButton from '../../../EditProfile/components/ToggleButton';
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

      <View
        style={styles.inputContainer}
        onPress={onPress}
        activeOpacity={0.5}>
        <Text
          style={[
            styles.text,
            !placeholder && {color: theme.colors.black},
          ]}>
          {placeholder ? placeholder : 'Notification Preference'}
        </Text>
        <ToggleButton />
        {/* <EnterIcon height={28} width={28} color={theme.colors.fieldIcon} /> */}
      </View>
    </>
  );
}
