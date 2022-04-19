import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image
} from 'react-native';
import moment from 'moment';
import {
  HeartFill,
  CommentFill,
  CombinedShape,
  BookmarkFill,
} from '../../../../../../components/svg/icons';

import styles from './styles';
import {theme} from '../../../../../../components/Theme';

const Footer = ({
  likesCount,
  firstLikerImage,
  likesDescription,
  onPressLike,
  isLiked,
  caption, 
  username, 
  postedAt}) => {
  const onLikePressed = () => {
    console.log('onLikePressed');
  };
  const onPressShare = () => {
    console.log('onPressShare');
  };

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
          <TouchableWithoutFeedback onPress={onLikePressed}>
            <CommentFill width={24} height={24} color="#000" />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.icon}>
          <TouchableOpacity onPress={onPressShare}>
            <CombinedShape width={24} height={24} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.icon}>
          <TouchableWithoutFeedback onPress={onLikePressed}>
            <BookmarkFill width={24} height={24} color="#000" />
          </TouchableWithoutFeedback>
        </View>
      </View>

      <View style={styles.likesContainer}>
      {firstLikerImage && (
      <Image source={firstLikerImage} style={styles.likerImage}/>
      )}
        <Text style={styles.likes}>{likesDescription}</Text>
      </View>

      <Text style={styles.caption}>
        <Text style={styles.username}>{username} </Text>
        {caption}
      </Text>
      <Text style={styles.postedAt}>
        {postedAt && moment(postedAt).startOf('hour').fromNow()}
      </Text>
    </View>
  );
};

export default Footer;
