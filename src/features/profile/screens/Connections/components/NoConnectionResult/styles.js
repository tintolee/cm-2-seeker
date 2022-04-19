import {StyleSheet} from 'react-native';
import {theme} from '../../../../../../components/Theme';

const styles = StyleSheet.create({
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
