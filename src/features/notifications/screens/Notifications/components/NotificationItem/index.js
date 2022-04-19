import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {renderIcon} from '../../../../../../components/svg/utils/renderIcon';
import {theme} from '../../../../../../components/Theme';
import styles from './styles';

export default function NotificationItem({message, date}) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.5}>
      <View style={styles.icon}>
        {renderIcon('bell', theme.colors.primary)}
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.message}>
          {message}
          <Text style={{fontWeight: 'bold'}}>View…</Text>
        </Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
}
