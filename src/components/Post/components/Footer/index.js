import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import moment from 'moment';
import ImageS3 from '../../../Image/ImageS3';
import {
  HeartFill,
  CommentFill,
  CombinedShape,
  BookmarkFill,
  NavBarRoute,
} from '../../../svg/icons';
import styles from './styles';
import {theme} from '../../../Theme';

const Footer = ({
  likesCount,
  firstLikerImage,
  likesDescription,
  caption,
  username,
  postedAt,
  type,
  onPressShare,
  post,
  onPressLike,
  isLiked,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.iconsContainer}>
        <View style={styles.icon}>
          <TouchableOpacity onPress={onPressLike}>
            <HeartFill
              width={24}
              height={24}
              color={!isLiked ? '#000' : theme.colors.formFieldError}
              fill={isLiked ? theme.colors.formFieldError : 'transparent'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.icon}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <CommentFill width={24} height={24} color="#000" />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.icon}>
          <TouchableOpacity onPress={onPressShare}>
            <CombinedShape width={24} height={24} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.icon}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <BookmarkFill width={24} height={24} color="#000" />
          </TouchableWithoutFeedback>
        </View>

        {type && type.toLowerCase() === 'seeker' && post?.routeMap?.id && (
          <View style={styles.icon}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SeekerProfile', {
                  screen: 'SeekerRouteMapDetail',
                  params: {
                    routeMapId: post.routeMap.id,
                    isRouteMap: true,
                  },
                });
              }}>
              <NavBarRoute width={24} height={24} color="#000" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.likesContainer}>
        {firstLikerImage && (
          <ImageS3 imageObj={firstLikerImage} style={styles.likerImage} />
        )}
        <Text style={styles.likes}>{likesDescription}</Text>
      </View>

      <Text style={styles.caption}>
        <Text style={styles.username}>{username} </Text>
        {caption}
      </Text>
      {type !== 'COLLABORATION' && (
        <Text style={styles.postedAt}>
          {moment(postedAt).startOf('hour').fromNow()}
        </Text>
      )}
    </View>
  );
};

export default Footer;
