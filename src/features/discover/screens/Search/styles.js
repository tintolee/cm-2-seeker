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
  },
  tabLabel: {
    ...theme.typography.title6,
    lineHeight: 16,
    color: theme.colors.primary,
  },
  tabIndicator: {
    backgroundColor: theme.colors.primary,
  },
  loaderContainer: {flex: 1, alignItems: 'center', justifyContent: 'center'}
});

export default styles;
