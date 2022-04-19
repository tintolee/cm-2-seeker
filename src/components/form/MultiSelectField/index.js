import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {EnterIcon} from '../../svg/icons';
import {renderIcon} from '../../svg/utils/renderIcon';
import {theme} from '../../../components/Theme';
import styles from './styles';

export default function MultiSelectField({
  fieldTitle,
  placeholder,
  values,
  text,
  multi,
  onPress,
  icon,
  iconColor = theme.colors.primary,
  hasError,
  disabled,
}) {
  const renderText = () => {
    if (text && multi) {
      return text.map((item) => item).join(', ');
    } else {
      return text;
    }
  };
  const isEmpty = (value, isMulti) => {
    if (isMulti) {
      return value.length > 0;
    } else {
      return value;
    }
  };
  return (
    <>
      <Text style={styles.title}>{fieldTitle}</Text>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={onPress}
        activeOpacity={0.5}
        disabled={disabled}>
        {renderIcon(icon, iconColor)}
        <Text
          style={[
            styles.text,
            !isEmpty(values, multi) && {
              color: theme.colors.formFieldPlaceholder,
            },
          ]}>
          {values && (!multi || values.length > 0)
            ? renderText()
            : placeholder
            ? placeholder
            : 'None selected'}
        </Text>
        {!disabled && (
          <EnterIcon height={28} width={28} color={theme.colors.fieldIcon} />
        )}
      </TouchableOpacity>
      {hasError && <Text style={styles.error}>{hasError}</Text>}
    </>
  );
}
