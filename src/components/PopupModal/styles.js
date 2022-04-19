import {StyleSheet} from 'react-native';
import {theme} from '../Theme';

const styles = StyleSheet.create({
  view: {
    marginHorizontal: theme.spacing.xl,
  },
  content: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.l,
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.xl,
    borderRadius: 10,
  },
});

export default styles;
