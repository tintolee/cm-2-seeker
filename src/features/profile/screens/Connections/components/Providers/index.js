import React, {useState} from 'react';
import {View, RefreshControl, FlatList} from 'react-native';
import {FullScreenCircleIndicator} from '../../../../../../components/Indicator';
import ListItem from '../../../../../../components/Connection/Provider/ListItem';
import NoConnectionResult from '../NoConnectionResult';
import styles from './styles';

export default function Providers({
  connectionProviders,
  listLoading,
  handleFollowOnPress,
  pullToRefresh,
}) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    pullToRefresh().then(() => setRefreshing(false));
  }, []);

  const noConnections = connectionProviders.length === 0;

  const Provider = (item) => {
    return (
      <View style={styles.itemContainer}>
        <ListItem {...item} handleFollowOnPress={handleFollowOnPress} />
      </View>
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
          data={connectionProviders}
          style={styles.list}
          renderItem={({item}) => <Provider {...item} />}
          keyExtractor={({id}) => id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </View>
  );
}
