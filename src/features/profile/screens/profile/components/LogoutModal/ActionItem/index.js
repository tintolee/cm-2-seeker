import React from 'react';
import {TouchableOpacity} from 'react-native';
import {View, Text} from 'react-native';
import {renderIcon} from '../../../../../../../components/svg/utils/renderIcon';
import {EnterIcon} from '../../../../../../../components/svg/icons';
import {theme} from '../../../../../../../components/Theme';
import styles from './styles';

export default function ActionItem({icon, name, onPress, isDestructiveButton}) {
  const iconColor = isDestructiveButton
    ? theme.colors.primary
    : theme.colors.white;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <View style={styles.container}>
        <View
          style={[
            styles.oval,
            isDestructiveButton && {backgroundColor: '#fde9d8'},
          ]}>
          {renderIcon(icon, iconColor)}
        </View>
        <Text style={styles.name}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}
