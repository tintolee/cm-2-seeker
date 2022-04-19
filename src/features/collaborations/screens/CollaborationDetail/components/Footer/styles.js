import {StyleSheet} from 'react-native';
import {theme, width} from '../../../../../../components/Theme';

const styles = StyleSheet.create({
  container: {
    marginTop:theme.spacing.m
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
    flexDirection: 'row',
    marginBottom: theme.spacing.sm,
  },
  likes: {
    ...theme.typography.caption,
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 5
  },
  likerImage: {
    width: 25,
    height: 25,
    borderRadius: 10
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

export default styles;
