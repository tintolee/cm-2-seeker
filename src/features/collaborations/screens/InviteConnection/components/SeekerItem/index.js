import React, {useEffect} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  FilledCheckmarkCircleFill,
  FilledCircle,
} from '../../../../../../components/svg/icons';
import {theme} from '../../../../../../components/Theme';
import {ImageS3} from '../../../../../../components';
import styles from './styles';

export default function SeekerItem({friend, selectedItems, selectOnPress}) {
  const navigation = useNavigation();
  const {id, firstName, lastName, profilePic} = friend;

  const isSelected = selectedItems.some((i) => i.id === id);

  const handleSeekerOnPress = (id) => {
    navigation.navigate('SeekerProfile', {seekerId: id});
  };

  const icon = isSelected ? (
    <FilledCheckmarkCircleFill
      width="24"
      height="24"
      color={theme.colors.primary}
    />
  ) : (
    <FilledCircle width="24" height="24" color={theme.colors.iconNotChecked} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.avatarContainer}>
          {profilePic && <ImageS3 imageObj={profilePic} style={styles.logo} />}
        </View>
      </View>
      <View style={styles.right}>
        <TouchableOpacity
          style={styles.nameContainer}
          activeOpacity={0.5}
          onPress={() => handleSeekerOnPress(id)}>
          <Text style={styles.name}>
            {firstName} {lastName}
          </Text>
        </TouchableOpacity>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => selectOnPress(friend)}>
            {icon}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
