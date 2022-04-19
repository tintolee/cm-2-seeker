import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';

import * as actions from '../../_redux/actions';
import ImageS3 from '../../../../components/Image/ImageS3';
import {FullScreenCircleIndicator} from '../../../../components/Indicator';
import Interactions from './components/Interactions';
import SeekerPosts from './components/SeekerPosts';
import styles from './styles';

export default function SeekerProfile({route}) {
  const [friendshipRequest, setFriendshipRequest] = useState(undefined);
  const [seekerSentFriendshipRequest, setSeekerSentFriendshipRequest] =
    useState(undefined);

  const navigation = useNavigation();

  const dispatch = useDispatch();
  const {seekerDetail, actionsLoading, user} = useSelector(
    (state) => ({
      seekerDetail: state.seekersReducer.seekerDetail,
      actionsLoading: state.seekersReducer.actionsLoading,
      user: state.seekerReducer.seeker,
    }),
    shallowEqual,
  );

  const {seekerId} = route.params;

  useEffect(() => {
    if (seekerId === user.id) {
      navigation.navigate('Profile');
    }
  }, [seekerId, user.id]);

  useEffect(() => {
    dispatch(actions.fetchSeeker(seekerId, user.id)).then(() => {
      fetchFriendshipRequest(seekerId, user.id);
      fetchSeekerSentFriendshipRequest(seekerId, user.id);
    });
  }, [dispatch, seekerId, user.id]);

  const fetchFriendshipRequest = (seekerId, userId) => {
    actions
      .fetchFriendshipRequests({recipientId: seekerId, requesterId: userId})
      .then((response) => {
        const {items} = response.data.listFriendshipRequests;
        if (items && items.length > 0) {
          setFriendshipRequest(items[0]);
        }
      });
  };

  const fetchSeekerSentFriendshipRequest = (seekerId, userId) => {
    actions
      .fetchFriendshipRequests({recipientId: userId, requesterId: seekerId})
      .then((response) => {
        const {items} = response.data.listFriendshipRequests;
        if (items && items.length > 0) {
          setSeekerSentFriendshipRequest(items[0]);
        }
      });
  };

  const handleConnectRequest = (friendshipRequestId, recipientSeekerId) => {
    const input = {
      recipientId: recipientSeekerId,
      requesterId: user.id,
      status: 1, //Request Sent
    };

    if (friendshipRequestId) {
      input.id = friendshipRequestId;

      dispatch(
        actions.updateFriendshipRequest(input, () => {
          dispatch(actions.fetchSeeker(seekerId, user.id)).then(() =>
            fetchFriendshipRequest(seekerId, user.id),
          );
        }),
      );
    } else {
      dispatch(
        actions.createFriendshipRequest(input, () => {
          dispatch(actions.fetchSeeker(seekerId, user.id)).then(() =>
            fetchFriendshipRequest(seekerId, user.id),
          );
        }),
      );
    }
  };

  const handleIgnoreFriendshipRequestOnPress = (friendshipRequestId) => {
    const input = {
      id: friendshipRequestId,
      status: 0, //Ignored Request
    };
    if (friendshipRequestId) {
      dispatch(
        actions.updateFriendshipRequest(input, () => {
          fetchFriendshipRequest(seekerId, user.id);
          fetchSeekerSentFriendshipRequest(seekerId, user.id);
        }),
      );
    }
  };

  const handleAcceptFriendshipRequestOnPress = (
    friendshipRequestId,
    recipientId,
    requesterId,
  ) => {
    // If Friendship Request accepted by User, Create two Friendship object for both side.
    // Then Update Friendship Request object as Accepted
    const inputFriendship = {
      friendId: requesterId,
      seekerId: recipientId,
      status: 1, //Friend
    };
    const inputFriendshipFriend = {
      friendId: recipientId,
      seekerId: requesterId,
      status: 1, //Friend
    };
    const input = {
      id: friendshipRequestId,
      status: 2, //Accepted
    };

    if (friendshipRequestId) {
      dispatch(
        actions.createFriendship(inputFriendship, () => {
          dispatch(
            actions.createFriendship(inputFriendshipFriend, () => {
              dispatch(
                actions.updateFriendshipRequest(input, () =>
                  dispatch(actions.fetchSeeker(seekerId, user.id)).then(() => {
                    fetchFriendshipRequest(seekerId, user.id);
                    fetchSeekerSentFriendshipRequest(seekerId, user.id);
                  }),
                ),
              );
            }),
          );
        }),
      );
    }
  };

  const isFriend =
    seekerDetail?.friends?.items.find((f) => f.friendId === user.id)?.status ===
    1;

  if (actionsLoading) {
    return <FullScreenCircleIndicator />;
  }

  if (!seekerDetail) {
    return null;
  }

  const isPrivateProfile =
    seekerDetail.visibleToSeekers === null
      ? false
      : !seekerDetail.visibleToSeekers;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <ImageS3 imageObj={seekerDetail.profilePic} style={styles.logo} />
          </View>
          <Text style={styles.title}>
            {seekerDetail.firstName} {seekerDetail.lastName}
          </Text>
          <Text style={styles.caption}>{seekerDetail.biography}</Text>
          <View style={styles.interactions}>
            <Interactions
              seekerDetail={seekerDetail}
              user={user}
              isFriend={isFriend}
              isPrivateProfile={isPrivateProfile}
              friendshipRequest={friendshipRequest}
              friendshipRequestSentBySeeker={seekerSentFriendshipRequest}
              connectOnPress={handleConnectRequest}
              ignoreFriendshipRequestOnPress={
                handleIgnoreFriendshipRequestOnPress
              }
              acceptFriendshipRequestOnPress={
                handleAcceptFriendshipRequestOnPress
              }
            />
          </View>
        </View>
        <View style={styles.contents}>
          <SafeAreaView style={{flex: 1}} edges={['bottom']}>
            <SeekerPosts isFriend={isFriend} {...seekerDetail} />
          </SafeAreaView>
        </View>
      </ScrollView>
    </View>
  );
}
