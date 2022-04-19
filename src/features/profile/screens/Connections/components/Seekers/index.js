import React, {useState} from 'react';
import {View, RefreshControl, FlatList} from 'react-native';
import {FullScreenCircleIndicator} from '../../../../../../components/Indicator';
import ListItem from '../../../../../../components/Connection/Seeker/ListItem';
import FriendRequestItem from '../../../../../../components/Connection/Seeker/FriendshipRequest/ListItem';
import NoConnectionResult from '../NoConnectionResult';
import styles from './styles';

export default function Seekers({
  connectionSeekers,
  friendshipRequests,
  listLoading,
  handleRemoveFriendship,
  handleAcceptFriendshipRequest,
  handleIgnoreFriendshipRequest,
  pullToRefresh,
}) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    pullToRefresh().then(() => setRefreshing(false));
  }, []);

  const noConnections =
    connectionSeekers.length === 0 && friendshipRequests.length === 0;

  const Seeker = (item) => {
    return (
      <View style={styles.itemContainer}>
        <ListItem
          {...item}
          handleRemoveFriendshipOnPress={handleRemoveFriendship}
        />
      </View>
    );
  };

  const FriendRequest = (item, index) => {
    return (
      <View index={index.toString()} style={styles.itemContainer}>
        <FriendRequestItem
          {...item}
          handleAcceptFriendshipRequest={handleAcceptFriendshipRequest}
          handleIgnoreFriendshipRequest={handleIgnoreFriendshipRequest}
        />
      </View>
    );
  };

  const FriendRequestsList = ({requestsList}) => {
    return (
      requestsList &&
      requestsList.length !== 0 &&
      requestsList.map((item, index) => (
        <FriendRequest index={index} {...item} />
      ))
    );
  };

  if (listLoading && !refreshing) {
    return <FullScreenCircleIndicator />;
  }

  if (noConnections) {
    return <NoConnectionResult />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={connectionSeekers}
          style={styles.list}
          renderItem={({item}) => <Seeker {...item} />}
          keyExtractor={({id}) => id.toString()}
          ListHeaderComponent={
            <FriendRequestsList requestsList={friendshipRequests} />
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </View>
  );
}
