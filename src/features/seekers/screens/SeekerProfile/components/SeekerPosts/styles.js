import {StyleSheet} from 'react-native';
import {theme} from '../../../../../../components/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  noResult: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xxl,
  },
  noResultIcon: {
    marginBottom: theme.spacing.m,
  },
  noResultText: {
    ...theme.typography.title6,
    textAlign: 'center',
    color: theme.colors.noRouteMap,
    marginBottom: theme.spacing.s,
  },
});

export default styles;
