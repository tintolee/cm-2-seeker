import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {NavBarRoute, LineGrid} from '../../../../../../components/svg/icons';
import {theme} from '../../../../../../components/Theme';
import PostsGridView from './PostsGridView';
import PostsRouteView from './PostsRouteView';

export default function RouteMapPosts({isRouteMap,posts, seeker, postFeedOnPress,toggleAddPostModal, isMine = false}) {
  const [tab, setTab] = useState(isRouteMap?"routeView":'grid');

  return (
    <View style={styles.container}>
      <View style={styles.selection}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setTab('routeView')}>
          <NavBarRoute
            width={24}
            height={24}
            color={
              tab === 'routeView'
                ? theme.colors.primary
                : theme.colors.inactiveIcon
            }
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={() => setTab('grid')}>
          <LineGrid
            width={24}
            height={24}
            color={
              tab === 'grid' ? theme.colors.primary : theme.colors.inactiveIcon
            }
          />
        </TouchableOpacity>
      </View>
      {tab === 'grid' && (
        <PostsGridView
          posts={posts}
          seeker={seeker}
          isMine = {isMine}
          postFeedOnPress={postFeedOnPress}
          toggleAddPostModal={toggleAddPostModal}
        />
      )}
      {tab === 'routeView' && (
        <PostsRouteView tab = {tab} posts={posts} postFeedOnPress={postFeedOnPress} toggleAddPostModal={toggleAddPostModal} seeker={seeker} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: theme.spacing.sm,
  },
  icon: {
    marginHorizontal: 12,
  },
});
