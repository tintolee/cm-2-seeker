import {StyleSheet} from 'react-native';
import {theme} from '../../Theme';

const styles = StyleSheet.create({
  title: {
    ...theme.typography.title4,
    marginBottom: theme.spacing.sm,
  },
  viewAll: {
    marginTop: theme.spacing.s,
  },
  viewAllText: {
    ...theme.typography.title6,
    lineHeight: 16,
    color: theme.colors.primary,
  },
});

export default styles;
