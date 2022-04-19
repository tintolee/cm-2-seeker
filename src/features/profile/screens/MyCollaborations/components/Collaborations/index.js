import React, {useState} from 'react';
import {RefreshControl, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FullScreenCircleIndicator} from '../../../../../../components/Indicator';
import {CollaborationPost} from '../../../../../../components/Post';

export default function Collaborations({
  collaborations,
  listLoading,
  pullToRefresh,
}) {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    pullToRefresh().then(() => setRefreshing(false));
  }, []);

  const handleOnPressShare = (post) => {
    navigation.navigate('Share', {post});
  };

  if (listLoading && !refreshing) {
    return <FullScreenCircleIndicator />;
  }

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        pull
        data={collaborations}
        renderItem={({item}) => (
          <CollaborationPost
            collaboration={item.collaboration}
            onPressShare={() => handleOnPressShare(item.collaboration)}
          />
        )}
        keyExtractor={({id}) => id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </>
  );
}
