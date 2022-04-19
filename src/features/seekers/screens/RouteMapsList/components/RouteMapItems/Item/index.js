import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ImageS3 from '../../../../../../../components/Image/ImageS3';
import {LineCheckmark} from '../../../../../../../components/svg/icons';
import styles from './styles';

export default function Item({item}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.item}
      activeOpacity={0.5}
      onPress={() =>
        navigation.navigate('SeekerRouteMapDetail', {routeMapId: item.id})
      }>
      <View style={styles.image}>
        <ImageS3 imageObj={item.coverPhoto} style={styles.image} />
        <View style={styles.layer}/>
      </View>
      <View style={styles.content}>
        <Text style={styles.categoryText}>{item.category.name}</Text>
        <View style={styles.bottomContent}>
          
          <View style={{flex: 1}}>
            <Text style={styles.destinationText}>{item.destination}</Text>
            <Text style={styles.focusAreaText} numberOfLines= {3}>
              {item.focusAreas && item.focusAreas.length !== 0
                ? item.focusAreas.map((item) => item).join(', ')
                : ''}
            </Text>
          </View>

          <View style={styles.completeCircle}>
            {item.isCompleted && (
              <LineCheckmark height={19} width={19} color="#fff" />
            )}
            {!item.isCompleted && item?.posts?.items.length > 0 && (
              <>
                <Text style={styles.destinationText}>
                  {item?.posts?.items.length}
                </Text>
              </>
            )}
          </View>

        </View>
        
      </View>
    </TouchableOpacity>
  );
}
