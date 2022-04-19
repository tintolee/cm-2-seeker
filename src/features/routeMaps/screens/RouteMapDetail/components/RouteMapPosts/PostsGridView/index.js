import React from 'react';
import {View, ScrollView, StyleSheet,Text,TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PostGrid from '../../../../../../../components/PostGrid';
import { theme } from '../../../../../../../components/Theme';
import { FilledPlusCircleFill } from '../../../../../../../components/svg/icons';

export default function PostsGridView({posts, seeker, postFeedOnPress, toggleAddPostModal, isMine}) {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {
            posts && posts.length > 0 ?
            <>
              {/* {posts.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt)).map((item, index) => ( */}
              {posts.map((item, index) => (
                <PostGrid
                  key={index}
                  post={item}
                  onPress={() =>
                    postFeedOnPress(item.id, seeker.firstName, seeker.lastName)
                  }
                  // onPress={() =>
                  //   navigation.navigate('RouteMapPostFeed', {
                  //     postId: item.id,
                  //     title: `${seeker.firstName} ${seeker.lastName}`,
                  //   })
                  // }
                />
              ))}
            </>
            :
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: "40%"}}>
              <Text style={styles.noRouteMap}>This route map has no steps yet</Text>
              {
                isMine?
                <TouchableOpacity onPress={toggleAddPostModal} style={{marginTop: 10}}>
                  <FilledPlusCircleFill
                    width={30}
                    height={30}
                    color={theme.colors.primary}
                  />
                </TouchableOpacity>:<></>
              }
            </View>
          }
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
  noRouteMap: {
    ...theme.typography.title6,
                textAlign: 'center',
                color: theme.colors.noRouteMap,
                marginBottom: theme.spacing.s,
  }
});
