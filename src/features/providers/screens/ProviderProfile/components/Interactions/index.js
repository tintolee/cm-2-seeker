import React from 'react';
import {View, Text} from 'react-native';
import {Button} from '../../../../../../components/form';
import {theme} from '../../../../../../components/Theme';
import styles from './styles';

export default function Interactions({
  providerDetail,
  providerFollower,
  followOnPress,
}) {
  const isFollowing = providerFollower
    ? providerFollower.status === 1
      ? true
      : false
    : false;

  return (
    <View style={styles.container}>
      <View style={styles.interactions}>
        <View style={styles.interaction}>
          <Text style={styles.number}>
            {providerDetail.opportunities.items.length}
          </Text>
          <Text style={styles.text}>Opportunities</Text>
        </View>
        <View style={styles.interaction}>
          <Text style={styles.number}>
            {providerDetail.followers.items.length}
          </Text>
          <Text style={styles.text}>Followers</Text>
        </View>
      </View>
      <View style={styles.interactions}>
        <Button
          title={isFollowing ? 'Unfollow' : 'Follow'}
          onPress={() => followOnPress(isFollowing)}
          backgroundColor={isFollowing && theme.colors.buttonUnfollow}
          color={isFollowing && theme.colors.buttonUnfollowText}
          height={32}
        />
      </View>
    </View>
  );
}
