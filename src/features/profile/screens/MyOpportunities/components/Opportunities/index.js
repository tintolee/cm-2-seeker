import React, {useState, useEffect} from 'react';
import {RefreshControl, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FullScreenCircleIndicator} from '../../../../../../components/Indicator';
import OpportunityPost from '../../../../../../components/Post/OpportunityPost';

export default function Opportunities({
  opportunities,
  listLoading,
  userId,
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
        data={opportunities}
        renderItem={({item}) => (
          <OpportunityPost
            opportunity={item.opportunity}
            userId={userId}
            onPressShare={() => handleOnPressShare(item.opportunity)}
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
