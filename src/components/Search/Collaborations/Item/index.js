import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ImageS3 from '../../../Image/ImageS3';
import styles from './styles';

export default function Item({item}) {
  const navigation = useNavigation();

  const handleOnPress = (id) => {
    navigation.navigate('CollaborationDetail', {
      collaborationId: id,
      forceUpdate: new Date().toLocaleString()
    });
  };
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => handleOnPress(item.id)}>
      <View style={styles.logoContainer}>
        <ImageS3 imageObj={item?.owner?.profilePic} style={styles.logo} />
      </View>
      <View style={styles.container}>
        <ImageS3 imageObj={item.cover} style={styles.image} />
        <View style={styles.content}>
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.caption}>Created by {item.createdBy}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
