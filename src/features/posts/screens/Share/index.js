import React, {useEffect, useState} from 'react';
import {Alert, View, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../profile/_redux/actions';
import * as actionsMessaging from '../../../messaging/_redux/actions';
import {Button} from '../../../../components/form';
import {FullScreenCircleIndicator} from '../../../../components/Indicator';
import SearchInput from '../../../../components/Search/SearchInput';
import SeekerItem from './components/SeekerItem';
import styles from './styles';

export default function Share({route}) {
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  const navigation = useNavigation();

  const post = route.params?.post;

  const dispatch = useDispatch();
  const {listLoading, friends, user} = useSelector(
    (state) => ({
      listLoading: state.profileReducer.listLoading,
      friends: state.profileReducer.connectionSeekers,
      user: state.seekerReducer.seeker,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(actions.fetchConnectionSeekers(user.id));
  }, [dispatch, user.id]);

  const filtredFriends =
    search === ''
      ? friends
      : friends.filter(
          (item) =>
            item.friend.firstName
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            item.friend.lastName.toLowerCase().includes(search.toLowerCase()),
        );

  const handleSelectOnPress = ({id, firstName}) => {
    const _selected = selectedItems;
    if (_selected.some((i) => i.id === id)) {
      const index = _selected.findIndex((i) => i.id === id);
      if (index > -1) {
        _selected.splice(index, 1);
      }
    } else {
      _selected.push({id, firstName});
    }

    setSelectedItems([..._selected]);
  };

  const handleShareOnPress = () => {
    try {
      const postType = post?.type || post?.postType;

      const receiverSeekerIds = selectedItems.map(({id}) => id);

      receiverSeekerIds.length > 0 &&
        dispatch(
          actionsMessaging.shareContentMessage(
            post,
            postType,
            user.id,
            receiverSeekerIds,
          ),
        );

      selectedItems.length > 0 && Alert.alert('Post`s shared');
      navigation.goBack();
    } catch (error) {
      console.log(error);
      navigation.goBack();
    }
  };

  if (listLoading) {
    return <FullScreenCircleIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <SearchInput
          placeholder="Search..."
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <View style={styles.content}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filtredFriends}
          style={styles.list}
          renderItem={({item}) => (
            <SeekerItem
              {...item}
              selectedItems={selectedItems}
              selectOnPress={handleSelectOnPress}
            />
          )}
          keyExtractor={({id}) => id.toString()}
        />
      </View>
      <View style={styles.footer}>
        <SafeAreaView edges={['bottom']}>
          <Button title="Share" onPress={handleShareOnPress} />
        </SafeAreaView>
      </View>
    </View>
  );
}
