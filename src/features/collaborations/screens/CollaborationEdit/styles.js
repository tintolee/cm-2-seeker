import {StyleSheet} from 'react-native';
import {theme} from '../../../../components/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background2,
  },
  content: {
    padding: theme.spacing.l,
    paddingBottom: 0,
  },
  field: {
    marginBottom: 20,
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
