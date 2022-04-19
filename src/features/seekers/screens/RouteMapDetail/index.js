import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import * as actions from '../../_redux/actions';
import {FullScreenCircleIndicator} from '../../../../components/Indicator';
import RouteMapDetailHeader from '../../../routeMaps/screens/RouteMapDetail/components/RouteMapDetailHeader';
import RouteMapDetailStats from '../../../routeMaps/screens/RouteMapDetail/components/RouteMapDetailStats';
import RouteMapPosts from '../../../routeMaps/screens/RouteMapDetail/components/RouteMapPosts';
import styles from './styles';

export default function RouteMapDetail({route}) {
  const navigation = useNavigation();

  const {routeMapId, isRouteMap = false} = route.params;

  const dispatch = useDispatch();
  const {actionsLoading, seekerDetail, routeMapDetail} = useSelector(
    (state) => ({
      actionsLoading: state.seekersReducer.actionsLoading,
      seekerDetail: state.seekersReducer.seekerDetail,
      routeMapDetail: state.seekersReducer.routeMapDetail,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(actions.fetchRouteMap(routeMapId));
  }, [dispatch]);

  const handlePostFeedOnPress = (postId, firstName, lastName) => {
    navigation.navigate('SeekerPostFeed', {
      postId: postId,
      routeMapId: routeMapId,
      title: `${firstName} ${lastName}`,
    });
  };

  return (
    <View style={styles.container}>
      {actionsLoading ? (
        <FullScreenCircleIndicator />
      ) : (
        <>
          {routeMapDetail ? (
            <>
              <RouteMapDetailHeader routeMap={routeMapDetail} />
              <RouteMapDetailStats routeMap={routeMapDetail} />
              <RouteMapPosts
                posts={routeMapDetail?.posts.items}
                seeker={seekerDetail}
                isRouteMap = {isRouteMap}
                postFeedOnPress={handlePostFeedOnPress}
              />
            </>
          ) : null}
        </>
      )}
    </View>
  );
}
