import React from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {LineEyeOff} from '../../../../../../components/svg/icons';
import PostGrid from '../../../../../../components/PostGrid';
import styles from './styles';

export default function SeekerPosts({
  firstName,
  lastName,
  visibleToSeekers,
  isFriend,
  posts,
}) {
  const navigation = useNavigation();

  const privateProfile = visibleToSeekers === null ? false : !visibleToSeekers;

  const hasPosts = posts?.items.length > 0;

  const PrivateProfile = () => (
    <View style={styles.noResult}>
      <View style={styles.noResultIcon}>
        <LineEyeOff width={42} height={42} color="#8f9bb3" />
      </View>
      <Text style={styles.noResultText}>
        This seeker’s profile is private. Connect to see activity.
      </Text>
    </View>
  );

  const NoPosts = () => (
    <View style={styles.noResult}>
      <Text style={styles.noResultText}>No activity yet.</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {privateProfile && !isFriend ? (
        <PrivateProfile />
      ) : !hasPosts ? (
        <NoPosts />
      ) : (
        <View style={styles.grid}>
          {posts.items.map((item, index) => (
            <PostGrid
              key={index}
              post={item}
              onPress={() =>
                navigation.navigate('SeekerPostFeed', {
                  postId: item.id,
                  title: `${firstName} ${lastName}`,
                })
              }
            />
          ))}
        </View>
      )}
    </View>
  );
}
