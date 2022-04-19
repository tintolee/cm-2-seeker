import {StyleSheet} from 'react-native';
import {theme} from '../Theme';

const styles = StyleSheet.create({
  view: {
    marginHorizontal: theme.spacing.xl,
  },
  content: {
    backgroundColor: theme.colors.background2,
    paddingHorizontal: theme.spacing.l,
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.xl,
    borderRadius: 10,
  },
  title: {
    marginTop: theme.spacing.m,
    marginBottom: theme.spacing.ssm,
  },
  message: {
    marginBottom: theme.spacing.ssm,
    paddingHorizontal: theme.spacing.sm,
  },
  hint: {
    marginBottom: theme.spacing.l,
  },
  opportunitiesButton: {
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.xxl,
  },
});

export default styles;
