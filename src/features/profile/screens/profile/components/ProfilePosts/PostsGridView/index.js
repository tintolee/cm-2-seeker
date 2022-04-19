import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {width} from '../../../../../../../components/Theme';
import PostGrid from '../../../../../../../components/PostGrid';

export default function PostsGridView({posts, seeker}) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {posts.map((item, index) => (
            <PostGrid
              key={index}
              post={item}
              onPress={() =>
                navigation.navigate('ProfilePostFeed', {
                  postId: item.id,
                  title: `${seeker.firstName} ${seeker.lastName}`,
                })
              }
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
