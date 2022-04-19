import React, {useState, useEffect} from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import * as actions from '../../_redux/actions';

import CircleIndicator from '../../../../components/Indicator/CircleIndicator';
import SearchBar from './components/SearchBar';
import Top from './components/Tabs/Top';
import AccountsTab from './components/Tabs/Accounts';
import Collaborations from './components/Tabs/Collaborations';
import OpportunitiesTab from './components/Tabs/Opportunities';
import SeekersTab from './components/Tabs/Seekers';
import styles from './styles';

export default function Search() {
  const layout = useWindowDimensions();
  const [search, setSearch] = useState('');
  const [result, setResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const isTyping = search.replace(/\s+/, '').length > 0;

  const dispatch = useDispatch();
  const {searchResult} = useSelector(
    (state) => ({
      searchResult: state.discoverReducer.searchResult,
    }),
    shallowEqual,
  );
  useEffect(() => {
    if (isTyping) {
      setLoading(true);
      const getData = setTimeout(() => {
        // const filtredResult = data.filter((item) =>
        //   item.name.toLowerCase().includes(search.toLowerCase()),
        // );
        dispatch(actions.discoverSearch(search)).then(() => {
          setResult(
            searchResult.providers.length > 0 ||
              searchResult.opportunities.length > 0 ||
              searchResult.seekers.length > 0 ||
              searchResult.collaborations.length > 0
              ? searchResult
              : false,
          );
          setLoading(false);
        });
      }, 300);

      return () => {
        clearTimeout(getData);
        setLoading(false);
      };
    } else {
      setResult(false);
    }
  }, [search]);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'top', title: 'Top'},
    {key: 'providers', title: 'Providers'},
    {key: 'opportunities', title: 'Opportunities'},
    {key: 'seekers', title: 'Seekers'},
    {key: 'collaborations', title: 'Collaborations'},
  ]);

  const renderScene = ({route, jumpTo}) => {
    if (loading) {
      return (
        <View style={styles.loaderContainer}>
          <CircleIndicator />
        </View>
      );
    }
    const jumpToTab = (routeName) => {
      jumpTo(routeName);
    };

    switch (route.key) {
      case 'top':
        return (
          <Top result={result} searchValue={search} jumpToTab={jumpToTab} />
        );
      case 'providers':
        return (
          <AccountsTab providers={result.providers} searchValue={search} />
        );
      case 'opportunities':
        return (
          <OpportunitiesTab
            opportunities={result.opportunities}
            searchValue={search}
          />
        );
      case 'seekers':
        return (
          <SeekersTab
            seekers={result.seekers}
            searchValue={search}
            jumpToTab={jumpToTab}
          />
        );
      case 'collaborations':
        return (
          <Collaborations
            collaborations={result.collaborations}
            searchValue={search}
          />
        );
      default:
        return null;
    }
  };

  const renderTabBar = (props) => (
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
