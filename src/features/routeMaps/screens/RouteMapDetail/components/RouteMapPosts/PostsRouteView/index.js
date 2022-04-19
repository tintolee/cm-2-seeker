import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import EditStepModal from './EditStepModal';
import RouteMapDesign from '../../../../RouteMapDesign';
import styles from './styles';

export default function PostsRouteView({tab,posts, postFeedOnPress, seeker, toggleAddPostModal}) {
  const [editStepModalVisible, setEditStepModalVisible] = useState(false);

  const toggleEditStepModal = () => {
    setEditStepModalVisible(!editStepModalVisible);
  };

  console.log(posts, "<---POST ROUTEVIWW-")

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <RouteMapDesign tab={tab} seeker={seeker} posts = {posts} postFeedOnPress= {postFeedOnPress} toggleAddPostModal={toggleAddPostModal} />
        <EditStepModal
          visible={editStepModalVisible}
          toggleModal={toggleEditStepModal}
        />
      </ScrollView>
    </View>
  );
}
