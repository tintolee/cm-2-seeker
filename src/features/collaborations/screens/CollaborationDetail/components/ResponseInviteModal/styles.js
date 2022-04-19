import {StyleSheet} from 'react-native';
import {theme} from '../../../../../../components/Theme';

const styles = StyleSheet.create({
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
  modalButton: {
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.xxl,
  },
});

export default styles;
