import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import * as actions from '../../_redux/actions';
import {LineMoreHorizontal} from '../../../../components/svg/icons';
import {theme} from '../../../../components/Theme';
import ImageS3 from '../../../../components/Image/ImageS3';
import {FullScreenCircleIndicator} from '../../../../components/Indicator';
import Interactions from './components/Interactions';
import ProviderContents from './components/ProviderContents';
import MoreActionsModal from './components/MoreActionsModal';
import styles from './styles';

import * as postReactionHandlers from '../../../../lib/postreactions/postreactionhandlers';

export default function ProviderProfile({navigation, route}) {
  const [moreActionsModalVisible, setMoreActionsModalVisible] = useState(false);

  const dispatch = useDispatch();
  const {providerDetail, providerFollower, actionsLoading, user} = useSelector(
    (state) => ({
      providerDetail: state.providersReducer.providerDetail,
      providerFollower: state.providersReducer.providerFollower,
      actionsLoading: state.providersReducer.actionsLoading,
      user: state.seekerReducer.seeker,
    }),
    shallowEqual,
  );
  
  const {providerId} = route.params;

  useEffect(() => {
    dispatch(actions.fetchProvider(providerId, user.id));
  }, [dispatch, providerId, user.id]);

  useEffect(() => {
    getAllData();
  }, [dispatch]);

  useEffect(() => {
    if (route.params?.forceUpdate) {
      // Force update Provider content if navigation has forceUpdate param.
      getAllData();
    }
  }, [route.params?.forceUpdate]);

  const getAllData = () => {
    return dispatch(actions.fetchProvider(providerId, user.id));
  };


  const lineMoreOnPress = () => {
    toggleMoreActionsModal();
  };

  const toggleMoreActionsModal = () => {
    setMoreActionsModalVisible(!moreActionsModalVisible);
  };

  const handleFollowOnPress = (isFollowing) => {
    const input = {
      opportunityProviderId: providerId,
      seekerId: user.id,
      status: isFollowing ? 0 : 1,
    };

    if (providerFollower) {
      input.id = providerFollower.id;

      dispatch(
        actions.updateProviderFollower(input, () => {
          dispatch(actions.fetchProvider(providerId, user.id));
        }),
      );
    } else {
      input.startedAt = new Date();

      dispatch(
        actions.createProviderFollower(input, () => {
          dispatch(actions.fetchProvider(providerId, user.id));
        }),
      );
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.moreIcon} onPress={lineMoreOnPress}>
          <LineMoreHorizontal
            width={24}
            height={24}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  if (actionsLoading) {
    return <FullScreenCircleIndicator />;
  }

  if (!providerDetail) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <ImageS3 imageObj={providerDetail.logo} style={styles.logo} />
          </View>
          <Text style={styles.title}>{providerDetail.name}</Text>
          <Text style={styles.caption}>{providerDetail.location}</Text>
          <Text style={styles.caption}>{providerDetail.tagline}</Text>
          <View style={styles.interactions}>
            <Interactions
              providerDetail={providerDetail}
              providerFollower={providerFollower}
              followOnPress={handleFollowOnPress}
            />
          </View>
        </View>
        <SafeAreaView edges={['bottom']}>
          <View style={styles.contents}>
            <ProviderContents 
            userId={user.id} 
            postReactionHandlers={postReactionHandlers}
            dispatch={dispatch}
            {...providerDetail} />
          </View>
        </SafeAreaView>
      </ScrollView>
      <MoreActionsModal
        visible={moreActionsModalVisible}
        toggleModal={toggleMoreActionsModal}
        onModalHide={toggleMoreActionsModal}
      />
    </View>
  );
}
