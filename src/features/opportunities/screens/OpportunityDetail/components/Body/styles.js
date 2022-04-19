import {StyleSheet} from 'react-native';
import {theme, width} from '../../../../../../components/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.m,
  },
  hostedBy: {
    ...theme.typography.regular,
    lineHeight: 20,
    marginBottom: theme.spacing.s,
  },
  title: {
    ...theme.typography.title1,
    fontSize: 30,
    lineHeight: 32,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
  },
  location: {
    ...theme.typography.regular,
    lineHeight: 20,
    marginLeft: 5,
  },
  attendeesContainer: {
    marginTop: 7,
    padding: 4,
    marginBottom: theme.spacing.sm,
  },
  whosAttending: {
    ...theme.typography.title8,
    color: '#262626',
  },
  avatarContainer: {
    marginTop: 4,
    flexDirection: 'row',
  },
  attendeeAvatar: {
    height: 36,
    width: 36,
    borderRadius: theme.radius.l,
    backgroundColor: theme.colors.primary,
    marginRight: 6,
  },
  logo: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: theme.radius.l,
  },
  description: {
    ...theme.typography.regular,
    lineHeight: 20,
  },
  deadline: {
    ...theme.typography.regular,
    lineHeight: 20,
    fontWeight: 'bold',
  },
});

export default styles;
