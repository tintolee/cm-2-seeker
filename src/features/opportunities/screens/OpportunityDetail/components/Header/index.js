import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {getAttandeeState} from '../../../../../../utils/constants';
import ImageS3 from '../../../../../../components/Image/ImageS3';
import {
  LineArrowLeft,
  LineMoreHorizontal,
} from '../../../../../../components/svg/icons';
import styles from './styles';

export default function Header({
  opportunity,
  seekerAttendeeStatus,
  actionOnPress,
}) {
  const navigation = useNavigation();

  if (!opportunity) {
    return null;
  }

  const attandeeState = getAttandeeState({
    status: seekerAttendeeStatus,
    opportunity,
  });

  return (
    <View style={styles.header}>
      <View style={styles.image}>
        <View style={styles.layer} />
        <ImageS3 imageObj={opportunity.cover} style={styles.image} />
      </View>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.content}>
          <View style={styles.navigator}>
            <TouchableOpacity
              style={styles.elevation}
              onPress={() => navigation.goBack()}>
              <LineArrowLeft width={24} height={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.elevation} onPress={actionOnPress}>
              <LineMoreHorizontal width={24} height={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomContent}>
            {seekerAttendeeStatus > 0 && (
              <View style={styles.attendContainer}>
                <Text style={styles.attendText}>
                {attandeeState.title}
                </Text>
              </View>
            )}
          </View>
        </View>
        {opportunity.applicationRequired && (
          <View style={styles.capacityContainer}>
            <Text style={styles.capacityText}>Limited availability</Text>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}
