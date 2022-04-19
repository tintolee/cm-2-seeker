import React, {useState, useEffect} from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import * as actions from '../../_redux/actions';
import SearchBar from './components/SearchBar';
import Collaborations from './components/Collaborations';
import styles from './styles';

export default function MyCollaborations() {
  const layout = useWindowDimensions();
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();
  const {listLoading, collaborations, seeker} = useSelector(
    (state) => ({
      listLoading: state.profileReducer.listLoading,
      collaborations: state.profileReducer.collaborations,
      seeker: state.seekerReducer.seeker,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(actions.fetchMyCollaborations(seeker.id));
  }, []);

  const pullToRefresh = () => {
    return dispatch(actions.fetchMyCollaborations(seeker.id));
  };

  const filtredResult =
    search === ''
      ? collaborations
      : collaborations.filter((item) =>
          item.collaboration.title.toLowerCase().includes(search.toLowerCase()),
        );

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'all', title: 'All'},
    {key: 'registered', title: 'Registered'},
    {key: 'applied', title: 'Applied'},
    {key: 'invited', title: 'Invited'},
    {key: 'created', title: 'Created'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'all':
        return (
          <Collaborations
            collaborations={filtredResult}
            listLoading={listLoading}
            pullToRefresh={pullToRefresh}
          />
        );
      case 'registered':
        return (
          <Collaborations
            collaborations={filtredResult.filter((item) => item.status === 1)}
            pullToRefresh={pullToRefresh}
          />
        );
      case 'applied':
        return (
          <Collaborations
            collaborations={filtredResult.filter((item) => item.status === 3)}
            pullToRefresh={pullToRefresh}
          />
        );
      case 'invited':
        return (
          <Collaborations
            collaborations={filtredResult.filter((item) => item.status === 2)}
            pullToRefresh={pullToRefresh}
          />
        );
      case 'created':
        return (
          <Collaborations
            collaborations={filtredResult.filter((item) => item.status === 5)}
            pullToRefresh={pullToRefresh}
          />
        );
      default:
        return null;
    }
  };

  const noCollaborations = filtredResult.length === 0;

  const NoCollaborations = () => (
    <View style={styles.emptyResult}>
      <Text style={styles.emptyResultText}>
        You don’t have any collaborations yet.
      </Text>
    </View>
  );

  const renderTabBar = (props) => (
    <View style={{backgroundColor: 'white', paddingHorizontal: 16}}>
      <TabBar
        {...props}
        indicatorStyle={styles.tabIndicator}
        style={{backgroundColor: 'white'}}
        tabStyle={{width: 'auto'}}
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
        {noCollaborations ? (
          <NoCollaborations />
        ) : (
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={{width: layout.width}}
          />
        )}
      </View>
    </View>
  );
}
