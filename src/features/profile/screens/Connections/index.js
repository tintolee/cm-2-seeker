import React, {useState, useEffect} from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import * as actions from '../../_redux/actions';
import * as providersActions from '../../../providers/_redux/actions';
import SearchBar from './components/SearchBar';
import Providers from './components/Providers';
import Seekers from './components/Seekers';
import styles from './styles';

export default function Connections() {
  const layout = useWindowDimensions();
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();
  const {
    listLoading,
    connectionProviders,
    connectionSeekers,
    friendshipRequests,
    user,
  } = useSelector(
    (state) => ({
      listLoading: state.profileReducer.listLoading,
      connectionProviders: state.profileReducer.connectionProviders,
      connectionSeekers: state.profileReducer.connectionSeekers,
      friendshipRequests: state.profileReducer.friendshipRequests,
      user: state.seekerReducer.seeker,
    }),
    shallowEqual,
  );

  useEffect(() => {
    getAllData();
  }, [dispatch, user.id]);

  const getAllData = () => {
    return dispatch(actions.fetchConnectionProviders(user.id))
      .then(() => dispatch(actions.fetchConnectionSeekers(user.id)))
      .then(() => dispatch(actions.fetchFriendshipRequests(user.id)));
  };

  const filtredResult =
    search === ''
      ? connectionProviders
      : connectionProviders.filter((item) =>
          item.opportunityProvider.name
            .toLowerCase()
            .includes(search.toLowerCase()),
        );

  const filtredSeekersResult =
    search === ''
      ? connectionSeekers
      : connectionSeekers.filter(
          (item) =>
            item.friend.firstName
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            item.friend.lastName.toLowerCase().includes(search.toLowerCase()),
        );

  const filtredFrienshipRequestResult =
    search === ''
      ? friendshipRequests
      : friendshipRequests.filter(
          (item) =>
            item.requester.firstName
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            item.requester.lastName
              .toLowerCase()
              .includes(search.toLowerCase()),
        );

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'seekers', title: 'Seekers'},
    {key: 'providers', title: 'Providers'},
  ]);

  const handleFollowOnPress = (connectionId, isFollowing) => {
    const input = {
      id: connectionId,
      status: isFollowing ? 0 : 1,
    };

    if (connectionId) {
      dispatch(
        providersActions.updateProviderFollower(input, () => {
          dispatch(actions.fetchConnectionProviders(user.id));
        }),
      );
    }
  };

  const handleRemoveFriendship = (friendshipId, friendSeekerId) => {
    const input = {
      id: friendshipId,
      status: 0, //Removed Friendship
    };

    if (friendshipId) {
      //Fetch friend's Friendship item and remove it
      actions
        .fetchFriendshipFromFriend(friendSeekerId, user.id)
        .then((response) => {
          const {friends} = response.data.getSeeker;
          if (friends && friends?.items.length > 0) {
            const friendFriendshipId = friends?.items[0].id;

            const inputFriendSeeker = {
              id: friendFriendshipId,
              status: 0, //Removed Friendship
            };

            dispatch(
              actions.updateFriendship(input, () => {
                dispatch(
                  actions.updateFriendship(inputFriendSeeker, () => {
                    dispatch(actions.fetchConnectionSeekers(user.id));
                  }),
                );
              }),
            );
          }
        });
    }
  };

  const handleIgnoreFriendshipRequest = (friendshipRequestId) => {
    const input = {
      id: friendshipRequestId,
      status: 0, //Ignored Request
    };
    if (friendshipRequestId) {
      dispatch(
        actions.updateFriendshipRequest(input, () => {
          dispatch(actions.fetchFriendshipRequests(user.id));
        }),
      );
    }
  };

  const handleAcceptFriendshipRequest = (
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
                actions.updateFriendshipRequest(input, () => {
                  dispatch(actions.fetchFriendshipRequests(user.id));
                  dispatch(actions.fetchConnectionSeekers(user.id));
                }),
              );
            }),
          );
        }),
      );
    }
  };

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'seekers':
        return (
          <Seekers
            connectionSeekers={filtredSeekersResult}
            friendshipRequests={filtredFrienshipRequestResult}
            listLoading={listLoading}
            handleRemoveFriendship={handleRemoveFriendship}
            handleIgnoreFriendshipRequest={handleIgnoreFriendshipRequest}
            handleAcceptFriendshipRequest={handleAcceptFriendshipRequest}
            pullToRefresh={getAllData}
          />
        );
      case 'providers':
        return (
          <Providers
            connectionProviders={filtredResult}
            listLoading={listLoading}
            handleFollowOnPress={handleFollowOnPress}
            pullToRefresh={getAllData}
          />
        );
      default:
        return null;
    }
  };

  const renderTabBar = (props) => (
    <View style={{backgroundColor: 'white', paddingHorizontal: 100}}>
      <TabBar
        {...props}
        indicatorStyle={styles.tabIndicator}
        style={{backgroundColor: 'white'}}
        tabStyle={{width: 'auto', textAlign: 'center'}}
        scrollEnabled={true}
        renderLabel={({route, focused, color}) => (
          <Text style={styles.tabLabel}>{route.title}</Text>
        )}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <SearchBar search={search} setSearch={setSearch} />
      <View style={styles.content}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
        />
      </View>
    </View>
  );
}
