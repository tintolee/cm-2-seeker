/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../../_redux/actions';
import {FullScreenCircleIndicator} from '../../../../../../components/Indicator';
import All from './All';
import Collaborations from './Collaborations';
import Connections from './Connections';
import Opportunities from './Opportunities';
import styles from './styles';


export default function TabViews({
  route,
  dispatch,
  postReactionHandlers
}) {
  const layout = useWindowDimensions();
  const [loading, setLoading] = useState(true);

  const {contents, opportunities, connectionsPosts, collaborations, discover, user} = useSelector(
    (state) => ({
      discover: state.discoverReducer.discover,
      user: state.seekerReducer.seeker,
      contents: state.discoverReducer.contents,
      collaborations: state.discoverReducer.collaborations,
      opportunities: state.discoverReducer.opportunities,
      connectionsPosts: state.discoverReducer.connectionsPosts
    }),
    shallowEqual,
  );
  useEffect(() => {
    getAllData();
  }, [dispatch]);

  useEffect(() => {
    if (route.params?.forceUpdate) {
      // Force update Routemap and posts if navigation has forceUpdate param.
      getAllData();
    }
  }, [route.params?.forceUpdate]);

  const getAllData = () => {
    return dispatch(actions.fetchContents())
      .then(() => dispatch(actions.fetchOpportunities()))
      .then(() => dispatch(actions.fetchCollaborations()))
      .then(() => dispatch(actions.fetchConnectionPosts(user.id)))
      .then(() => dispatch(actions.fetchDiscover()))
      .then(() => setLoading(false));
  };

  let newDiscover = [].concat(contents,collaborations,opportunities,connectionsPosts);
   let allLikeDetails = [];
   discover.map(i => {
    let temp = postReactionHandlers.getLikeDetails(i,user.id);
    allLikeDetails.push(temp);
   });

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'all', title: 'All'},
    {key: 'opportunities', title: 'Opportunities'},
    {key: 'collaborations', title: 'Collaborations'},
    {key: 'connections', title: 'Connections'},
  ]);
  const [allPosts,setAllPosts] = useState(discover);

  const renderScene = ({route}) => {
    if (loading) {
      return <FullScreenCircleIndicator />;
    }
    switch (route.key) {
      case 'all':
        return (
          <All 
           allPosts={discover} 
           userId={user.id} 
           getAllData={getAllData} 
           dispatch={dispatch}
           postReactionHandlers={postReactionHandlers}
           />
        );
      case 'opportunities':
        return (
          <Opportunities
            opportunities={discover.filter((d) => d.postType === 'OPPORTUNITY')}
            postReactionHandlers={postReactionHandlers}
            dispatch={dispatch}
            userId={user.id}
          />
        );
      case 'collaborations':
        return (
          <Collaborations
            collaborations={discover.filter((d) => d.postType === 'COLLABORATION')}
            postReactionHandlers={postReactionHandlers}
            userId={user.id}
            dispatch={dispatch}
          />
        );
      case 'connections':
        return (
          <Connections 
          posts={discover.filter((d) => d.postType === 'POST')}
          postReactionHandlers={postReactionHandlers}
          userId={user.id}
          dispatch={dispatch}
           />
        );
      default:
        return null;
    }
  };

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
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      scrollEnabled={true}
      // lazy={true}
      // renderLazyPlaceholder={() => <FullScreenCircleIndicator />}
    />
  );
}
