import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './styles';

export default function VisibilityChangeField({value, setValue}) {
  const handleOnPress = () => {
    setValue(value === 0 ? 1 : 0);
  };
  return (
    <>
      <TouchableOpacity onPress={handleOnPress} activeOpacity={0.5}>
        <Text style={styles.text}>
          Visibility: {value === 1 ? 'Public' : 'Friends Only'}
        </Text>
      </TouchableOpacity>
    </>
  );
}
