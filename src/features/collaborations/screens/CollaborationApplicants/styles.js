import {StyleSheet} from 'react-native';
import {theme} from '../../../../components/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
  },
  searchBar: {
    paddingHorizontal: 36,
    paddingVertical: theme.spacing.s,
  },
  tabLabel: {
    ...theme.typography.title6,
    lineHeight: 16,
    color: theme.colors.primary,
  },
  tabIndicator: {
    backgroundColor: theme.colors.primary,
  },
  emptyResult: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xxl,
  },
  emptyResultText: {
    ...theme.typography.title6,
    textAlign: 'center',
    color: theme.colors.noRouteMap,
    marginBottom: theme.spacing.s,
  },
});

export default styles;
