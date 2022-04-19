import {StyleSheet} from 'react-native';
import {theme} from '../../../../../components/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  selection: {
    flex: 1,
    padding: theme.spacing.m,
  },
  field: {
    textAlign: 'center',
    alignItems: 'center',
  },
  lookingForText: {
    ...theme.typography.title6,
    color: theme.colors.noRouteMap,
    textAlign: 'center',
  },
  createOwnText: {
    ...theme.typography.title6,
    color: theme.colors.formVisible,
    textDecorationLine: 'underline',
    textAlign: 'center',
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
