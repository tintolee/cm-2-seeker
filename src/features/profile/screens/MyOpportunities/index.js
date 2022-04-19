import React, {useState, useEffect} from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import * as actions from '../../_redux/actions';
import SearchBar from './components/SearchBar';
import Opportunities from './components/Opportunities';
import styles from './styles';

export default function MyOpportunities() {
  const layout = useWindowDimensions();
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();
  const {listLoading, opportunities, seeker} = useSelector(
    (state) => ({
      listLoading: state.profileReducer.listLoading,
      opportunities: state.profileReducer.opportunities,
      seeker: state.seekerReducer.seeker,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(actions.fetchMyOpportunities(seeker.id, search));
  }, []);

  const pullToRefresh = () => {
    return dispatch(actions.fetchMyOpportunities(seeker.id, search));
  };

  const filtredResult =
    search === ''
      ? opportunities
      : opportunities.filter((item) =>
          item.opportunity.title.toLowerCase().includes(search.toLowerCase()),
        );

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'all', title: 'All'},
    {key: 'registered', title: 'Registered'},
    {key: 'applied', title: 'Applied'},
    {key: 'invited', title: 'Invited'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'all':
        return (
          <Opportunities
            opportunities={filtredResult}
            listLoading={listLoading}
            userId={seeker.id}
            pullToRefresh={pullToRefresh}
          />
        );
      case 'registered':
        return (
          <Opportunities
            opportunities={filtredResult.filter((item) => item.status === 1)}
            pullToRefresh={pullToRefresh}
          />
        );
      case 'applied':
        return (
          <Opportunities
            opportunities={filtredResult.filter((item) => item.status === 3)}
            pullToRefresh={pullToRefresh}
          />
        );
      case 'invited':
        return (
          <Opportunities
            opportunities={filtredResult.filter((item) => item.status === 2)}
            pullToRefresh={pullToRefresh}
          />
        );
      default:
        return null;
    }
  };

  const noOpportunuties = filtredResult.length === 0;

  const NoOpportunuties = () => (
    <View style={styles.emptyResult}>
      <Text style={styles.emptyResultText}>
        You don’t have any opportunuties yet.
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
        {noOpportunuties ? (
          <NoOpportunuties />
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
