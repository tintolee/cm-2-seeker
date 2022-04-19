import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import moment from 'moment';
import {
  HeartFill,
  CommentFill,
  CombinedShape,
  BookmarkFill,
  NavBarRoute,
} from '../../../../../../components/svg/icons';
import {theme} from '../../../../../../components/Theme';

const Footer = ({
  likesCount,
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
      <Text style={styles.caption}>
        <Text style={styles.username}>{username} </Text>
        {caption}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.white,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.sm,
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing.m,
  },
  likesContainer: {
    marginBottom: theme.spacing.sm,
  },
  likes: {
    ...theme.typography.caption,
    fontWeight: 'bold',
  },
  username: {
    ...theme.typography.caption,
    fontWeight: 'bold',
    letterSpacing: 0.2,
    color: '#262626',
  },
  caption: {
    ...theme.typography.caption,
    letterSpacing: 0.2,
    marginBottom: theme.spacing.s,
  },
  postedAt: {
    ...theme.typography.regular,
    color: '#8c8c8c',
  },
});

export default Footer;
