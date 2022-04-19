import React from 'react';
import {TouchableOpacity, Image, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button} from '../../../form';
import ImageS3 from '../../../Image/ImageS3';
import {theme} from '../../../Theme';
import styles from './styles';

export default function ListItem({
  opportunityProvider,
  status: connectionStatus,
  id: connectionId,
  handleFollowOnPress,
}) {
  const navigation = useNavigation();

  const isFollowing = connectionStatus
    ? connectionStatus === 1
      ? true
      : false
    : false;

  const handleProviderProfileOnPress = (id) => {
    navigation.navigate('ProviderProfile', {
      providerId: id,
      forceUpdate: (new Date()).toLocaleDateString()
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.logoContainer}>
          <ImageS3 imageObj={opportunityProvider.logo} style={styles.logo} />
        </View>
      </View>
      <View style={styles.right}>
        <TouchableOpacity
          style={styles.nameContainer}
          activeOpacity={0.5}
          onPress={() => handleProviderProfileOnPress(opportunityProvider.id)}>
          <Text style={styles.displayName}>
            {opportunityProvider.displayName || opportunityProvider.name}
          </Text>
          <Text style={styles.name}>{opportunityProvider.name}</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <Button
            title={isFollowing ? 'Unfollow' : 'Follow'}
            onPress={() => handleFollowOnPress(connectionId, isFollowing)}
            backgroundColor={isFollowing && theme.colors.buttonUnfollowText}
            color={isFollowing && theme.colors.white}
            height={32}
          />
        </View>
      </View>
    </View>
  );
}
