import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

import {EnterIcon, HeartFill} from '../../../svg/icons';
import {ImageS3} from '../../../index';
import VideoPlayer from '../../../VideoPlayer';
import {theme} from '../../../Theme';
import styles from './styles';

const Body = ({
  collaboration,
  type,
  photo,
  video,
  blog,
  opportunity,
  opportunityAttandee,
  milestone,
  likeAnimation,
  setlikeAnimation,
  likesData,
}) => {
  const navigation = useNavigation();

  const postType = type.toLowerCase();

  const onPressOpportunityDetail = (id) => {
    navigation.navigate('OpportunityDetail', {
      opportunityId: id,
      likesData: likesData,
      forceUpdate: new Date().toLocaleString(),
    });
  };

  const onPressCollaborationDetail = (id) => {
    navigation.navigate('CollaborationDetail', {
      collaborationId: id,
      forceUpdate: new Date().toLocaleString(),
    });
  };

  return (
    <View style={{flex: 1}}>
      {postType === 'photo' ? (
        <View style={styles.assetContainer}>
          <ImageS3
            imageObj={photo?.length === !0 ? photo[0] : photo}
            style={styles.image}
          />
        </View>
      ) : postType === 'video' ? (
        <View style={styles.assetContainer}>
          <VideoPlayer videoObj={video} style={styles.image} />
        </View>
      ) : postType === 'blog' ? (
        <>
          <View style={styles.blogContainer}>
            <Text style={styles.blogTitle}>{blog.blogTitle}</Text>
            <Text style={styles.blogDescription}>{blog.blogDescription}</Text>
          </View>
          <TouchableOpacity style={styles.blogReadContainer}>
            <Text style={styles.readText}>Continue reading</Text>
            <EnterIcon height={24} width={24} color="#000" />
          </TouchableOpacity>
        </>
      ) : postType === 'milestone' ? (
        <View style={styles.imageContentContainer}>
          {photo?.length == !0 || photo ? <View style={styles.layer} /> : <></>}
          <ImageS3
            imageObj={photo?.length == !0 ? photo[0] : photo}
            style={styles.image}
          />
          <View style={styles.absoluteContent}>
            <Text style={styles.blogTitle}>{milestone.title}</Text>
            <Text style={styles.blogDescription}>
              {moment(milestone.date).format('Do MMMM YYYY')}{' '}
            </Text>
          </View>
        </View>
      ) : postType === 'opportunity' ? (
        <>
          <View style={styles.assetContainer}>
            <ImageS3 imageObj={opportunity.cover} style={styles.image} />
            {opportunityAttandee?.status > 0 && (
              <View style={styles.absoluteContent}>
                <View style={styles.bottomContent}>
                  <View style={styles.attendContainer}>
                    <Text style={styles.attendText}>
                      {opportunityAttandee.title}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
          <TouchableOpacity
            style={styles.opportunityDetailContainer}
            onPress={() => onPressOpportunityDetail(opportunity.id)}>
            <View>
              <View style={styles.opportunityTitleContainer}>
                <Text style={styles.opportunityTitle}>{opportunity.title}</Text>
                <Text style={styles.opportunityDate}>
                  {moment(opportunity.date).format('Do MMM')}
                </Text>
              </View>
              <Text style={styles.opportunityLocation}>
                {opportunity.location}
              </Text>
            </View>
            <Text style={styles.opportunityHosted}>
              Hosted by{' '}
              <Text style={{fontWeight: 'bold'}}>
                {opportunity.opportunityProvider.name}
              </Text>
            </Text>
            <View style={{position: 'absolute', top: '50%', right: 20}}>
              <EnterIcon height={24} width={24} color="#fff" />
            </View>
          </TouchableOpacity>
        </>
      ) : postType === 'collaboration' ? (
        <>
          <View style={styles.assetContainer}>
            <ImageS3 imageObj={collaboration.cover} style={styles.image} />
          </View>
          <TouchableOpacity
            style={{
              ...styles.opportunityDetailContainer,
              backgroundColor: theme.colors.primary,
            }}
            onPress={() => onPressCollaborationDetail(collaboration.id)}>
            <View>
              <View style={styles.opportunityTitleContainer}>
                <Text style={styles.opportunityTitle}>
                  {collaboration.title}
                </Text>
              </View>
              <Text style={styles.opportunityLocation}>
                {collaboration.location}
              </Text>
            </View>
            <Text style={styles.opportunityHosted}>
              Created by{' '}
              <Text style={{fontWeight: 'bold'}}>
                {collaboration.owner?.firstName} {collaboration.owner?.lastName}
              </Text>
            </Text>
            <View style={{position: 'absolute', top: '50%', right: 20}}>
              <EnterIcon height={24} width={24} color="#fff" />
            </View>
          </TouchableOpacity>
        </>
      ) : null}
      {likeAnimation ? (
        <Animatable.View
          style={styles.heart}
          animation={'bounceIn'}
          onAnimationEnd={setlikeAnimation}>
          <HeartFill width={84} height={84} color="#fff" fill={'#fff'} />
        </Animatable.View>
      ) : (
        <></>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  layer: {},
});

export default Body;
