import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ImageS3 from '../../../../../../components/Image/ImageS3';
import {FullScreenCircleIndicator} from '../../../../../../components/Indicator';
import {
  LineArrowLeft,
  LineMoreHorizontal,
} from '../../../../../../components/svg/icons';
import styles from './styles';

export default function Header({collaboration, actionOnPress}) {
  const navigation = useNavigation();

  if (!collaboration) {
    return <FullScreenCircleIndicator />;
  }

  return (
    <View style={styles.header}>
      <View style={styles.image}>
        <View style={styles.layer} />
        <ImageS3
          imageObj={collaboration.cover}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.content}>
          <View style={styles.navigator}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <LineArrowLeft width={24} height={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={actionOnPress}>
              <LineMoreHorizontal width={24} height={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomContent}>
            {/* <View style={styles.attendContainer}>
              <Text style={styles.attendText}>Joined</Text>
            </View> */}
          </View>
        </View>
        {collaboration?.capacity > 0 && (
          <View style={styles.capacityContainer}>
            <Text style={styles.capacityText}>Limited availability</Text>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}
