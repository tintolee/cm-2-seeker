import {StyleSheet} from 'react-native';
import {theme} from '../../../../../../components/Theme';

const styles = StyleSheet.create({
  title: {
    marginTop: theme.spacing.m,
    marginBottom: theme.spacing.ssm,
  },
  message: {
    marginBottom: theme.spacing.l,
    paddingHorizontal: theme.spacing.m,
  },
  hint: {
    marginBottom: theme.spacing.xl,
  },
  button: {
    marginBottom: theme.spacing.sm,
  },
});

export default styles;
