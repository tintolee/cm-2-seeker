import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ImageS3 from '../../../../../../components/Image/ImageS3';
import {
  LineArrowLeft,
  LineMoreHorizontal,
} from '../../../../../../components/svg/icons';
import styles from './styles';

export default function RouteMapDetailHeader({routeMap, actionOnPress}) {
  const navigation = useNavigation();

  if (!routeMap) {
    return null;
  }

  return (
    <View style={styles.header}>
      <View style={styles.image}>
        <ImageS3 imageObj={routeMap.coverPhoto} style={styles.image} />
        <View style={styles.layer} />
      </View>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.content}>
          <View style={styles.navigator}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <LineArrowLeft width={24} height={24} color="#fff" />
            </TouchableOpacity>
            {actionOnPress && (
              <TouchableOpacity onPress={actionOnPress}>
                <LineMoreHorizontal width={24} height={24} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.bottomContent}>
            <Text style={styles.destinationHeader}>Your destination:</Text>
            <Text style={styles.destinationText}>{routeMap.destination}</Text>
            <Text style={styles.focusAreaText}>
              {routeMap.focusAreas && routeMap.focusAreas.length !== 0
                ? routeMap.focusAreas.map((item) => item).join(', ')
                : ''}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
