import {StyleSheet} from 'react-native';
import {theme} from '../../../../components/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.m,
    backgroundColor: theme.colors.background2,
  },
  searchBar: {
    paddingHorizontal: 36,
    paddingVertical: theme.spacing.s,
    paddingBottom: 32,
  },
  list: {
    paddingVertical: 10,
  },
  seekercontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.m,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 18,
    marginBottom: 10,
  },
  avatar: {
    height: 42,
    width: 42,
    borderRadius: theme.radius.l,
    backgroundColor: theme.colors.primary,
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  name: {
    ...theme.typography.title6,
    fontWeight: '600',
  },
  footer: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.sm,
    shadowColor: 'rgba(179, 179, 179, 0.26)',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowRadius: 10,
    shadowOpacity: 1,
  },
});

export default styles;
