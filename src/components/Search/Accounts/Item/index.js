import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ImageS3 from '../../../Image/ImageS3';
import styles from './styles';

export default function Item({item}) {
  const navigation = useNavigation();

  const handleProviderOnPress = (id) => {
    navigation.navigate('ProviderProfile', {providerId: id});
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.5}
      onPress={() => handleProviderOnPress(item.id)}>
      <View style={styles.left}>
        <View style={styles.logoContainer}>
          <ImageS3 imageObj={item.logo} style={styles.logo} />
        </View>
      </View>
      <View style={styles.right}>
        <View style={styles.nameContainer}>
          <Text style={styles.displayName}>
            {item.displayName || item.name}
          </Text>
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
