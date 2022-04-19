import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import PreferenceItem from './components/PreferenceItem';
import AdditonalItem from './components/AdditonalItem';
import {theme} from '../../../../../components/Theme';
import styles from './style';

export default function ProfileNotifications() {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: theme.colors.formFieldPlaceholder,
          marginHorizontal: theme.spacing.m,
          top: theme.spacing.m,
        }}>
        Notification Settings
      </Text>
      <PreferenceItem />
      <PreferenceItem />
      <PreferenceItem />
      <Text
        style={{
          color: theme.colors.formFieldPlaceholder,
          marginHorizontal: theme.spacing.m,
          top: theme.spacing.m,
        }}>
        Additional Options
      </Text>
      <AdditonalItem />
      <AdditonalItem />
    </View>
  );
}
