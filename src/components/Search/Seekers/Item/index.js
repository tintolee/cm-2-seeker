import React from 'react';
import {TouchableOpacity, Image, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ImageS3 from '../../../Image/ImageS3';
import styles from './styles';
import { useSelector } from 'react-redux';

export default function Item({
  item,
  friendshipId,
  handleRemoveFriendshipOnPress,
}) {
  const {seeker} = useSelector(state => ({ seeker: state.seekerReducer.seeker}));
  const navigation = useNavigation();

  const handleSeekerOnPress = (id) => {
    if(seeker.id == id){
      navigation.navigate('Profile');
      return    
    }
    navigation.navigate('SeekerProfile', {seekerId: id});
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.avatarContainer}>
        {item.profilePic && (
            <ImageS3 imageObj={item.profilePic} style={styles.logo} />
          )}
        </View>
      </View>
      <View style={styles.right}>
        <TouchableOpacity
          style={styles.nameContainer}
          activeOpacity={0.5}
          onPress={() => handleSeekerOnPress(item.id)}>
          <Text style={styles.name}>
            {item.firstName} {item.lastName}
          </Text>
        </TouchableOpacity>
        <View style={styles.buttonsContainer}>
          {friendshipId && (
            <TouchableOpacity
              style={styles.removeButton}
              activeOpacity={0.5}
              onPress={() => handleRemoveFriendshipOnPress(friendshipId)}>
              <Text style={styles.removeButtonText}>remove</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
