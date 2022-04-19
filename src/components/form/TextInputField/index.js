import React from 'react';
import {View, TextInput, Text} from 'react-native';
import {renderIcon} from '../../svg/utils/renderIcon';
import {theme} from '../../../components/Theme';
import styles from './styles';

export default function TextInputField({
  fieldTitle,
  icon,
  iconColor = theme.colors.primary,
  hasError,
  ...props
}) {
  return (
    <>
      <Text style={styles.title}>{fieldTitle}</Text>
      <View style={styles.inputContainer}>
        {renderIcon(icon, iconColor)}
        <TextInput
          style={styles.input}
          placeholderTextColor={theme.colors.formFieldPlaceholder}
          underlineColorAndroid="transparent"
          returnKeyType="done"
          autoCorrect={false}
          {...props}
        />
      </View>
      {hasError && <Text style={styles.error}>{hasError}</Text>}
    </>
  );
}
