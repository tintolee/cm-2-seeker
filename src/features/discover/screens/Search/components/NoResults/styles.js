import {StyleSheet} from 'react-native';
import {theme, width} from '../../../../../../components/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.1,
  },
  title: {
    ...theme.typography.title4Semi,
    color: theme.colors.formFieldTitle,
    fontWeight: '600',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: theme.spacing.ssm,
  },
  message: {
    ...theme.typography.title2,
    color: theme.colors.black,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing.l,
  },
  hint: {
    ...theme.typography.title2,
    color: theme.colors.formFieldTitle,
    textAlign: 'center',
    marginBottom: 30,
  },
});

export default styles;
