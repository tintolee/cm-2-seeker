import {StyleSheet} from 'react-native';
import {theme} from '../../../../../../components/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background2,
    marginTop: theme.spacing.l,
  },
  noRouteMaps: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xxl,
  },
  noRouteMapsText: {
    ...theme.typography.title6,
    textAlign: 'center',
    color: theme.colors.noRouteMap,
    marginBottom: theme.spacing.s,
  },
});

export default styles;
