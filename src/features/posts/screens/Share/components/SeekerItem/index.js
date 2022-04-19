import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {
  FilledCheckmarkCircleFill,
  FilledCircle,
} from '../../../../../../components/svg/icons';
import {theme} from '../../../../../../components/Theme';
import {ImageS3} from '../../../../../../components';
import styles from './styles';

export default function SeekerItem({friend, selectedItems, selectOnPress}) {
  const {id, firstName, lastName, profilePic} = friend;

  const isSelected = selectedItems.some((i) => i.id === id);

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
    <TouchableOpacity activeOpacity={1} onPress={() => selectOnPress(friend)}>
      <View style={styles.container}>
        <View style={styles.left}>
          <View style={styles.avatarContainer}>
            {profilePic && (
              <ImageS3 imageObj={profilePic} style={styles.logo} />
            )}
          </View>
        </View>
        <View style={styles.right}>
          <Text style={styles.name}>
            {firstName} {lastName}
          </Text>
          <View style={styles.buttonsContainer}>{icon}</View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
