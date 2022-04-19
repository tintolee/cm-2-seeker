import React, {useEffect, useState} from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import * as actions from '../../_redux/actions';
import * as messagingActions from '../../../messaging/_redux/actions';
import {FullScreenCircleIndicator} from '../../../../components/Indicator';
import SearchInput from '../../../../components/Search/SearchInput';
import ApplicantsList from './components/ApplicantsList';
import styles from './styles';

export default function CollaborationApplicants({route}) {
  const layout = useWindowDimensions();
  const [search, setSearch] = useState('');

  const {collaborationId} = route.params;

  const dispatch = useDispatch();
  const {collaborationDetail, actionsLoading, user} = useSelector(
    (state) => ({
      collaborationDetail: state.collaborationsReducer.collaborationDetail,
      actionsLoading: state.collaborationsReducer.actionsLoading,
      user: state.seekerReducer.seeker,
    }),
    shallowEqual,
  );

  const isOwner = collaborationDetail?.owner?.id === user.id;

  useEffect(() => {
    dispatch(actions.fetchCollaboration(collaborationId));
  }, [dispatch, collaborationId]);

  const filtredResult =
    search === ''
      ? collaborationDetail?.members?.items
      : collaborationDetail?.members?.items.filter((item) =>
          item.seeker.firstName.toLowerCase().includes(search.toLowerCase()),
        );

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'all', title: 'All'},
    {key: 'accepted', title: 'Accepted'},
    {key: 'invited', title: 'Invited'},
    {key: 'rejected', title: 'Rejected'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'all':
        return (
          <ApplicantsList
            applicants={filtredResult}
            applicantActionOnPress={handleApplicantAction}
          />
        );
      case 'accepted':
        return (
          <ApplicantsList
            applicants={filtredResult.filter((item) => item.status === 1)}
          />
        );
      case 'invited':
        return (
          <ApplicantsList
            applicants={filtredResult.filter((item) => item.status === 2)}
          />
        );
      case 'rejected':
        return (
          <ApplicantsList
            applicants={filtredResult.filter((item) => item.status === 4)}
          />
        );
      default:
        return null;
    }
  };

  const handleApplicantAction = (applicantId, status) => {
    const input = {
      id: applicantId,
      status: status,
    };
    if (applicantId) {
      actions
        .updateCollaborationMember(input)
        .then(() => {
          dispatch(actions.fetchCollaboration(collaborationId));
        })
        .catch((error) => {
          console.log(error);
        });

      checkMessageGroup(applicantId);
    }
  };

  const checkMessageGroup = (applicantId) => {
    dispatch(
      messagingActions.addUserToGroupConversations(
        collaborationId,
        applicantId,
      ),
    );
  };

  const noApplicants = filtredResult.length === 0;

  const NoApplicants = () => (
    <View style={styles.emptyResult}>
      <Text style={styles.emptyResultText}>
        No collaboration applicants yet.
      </Text>
    </View>
  );

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabIndicator}
      style={{backgroundColor: 'white', marginLeft: 36}}
      tabStyle={{width: 'auto'}}
      scrollEnabled={true}
      renderLabel={({route, focused, color}) => (
        <Text style={styles.tabLabel}>{route.title}</Text>
      )}
    />
  );

  if (actionsLoading) {
    return <FullScreenCircleIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <SearchInput
          placeholder="Search..."
          value={search}
          onChangeText={setSearch}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          returnKeyType="search"
        />
      </View>
      <View style={styles.content}>
        {noApplicants ? (
          <NoApplicants />
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
