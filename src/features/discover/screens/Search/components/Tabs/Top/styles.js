import {StyleSheet} from 'react-native';
import {theme} from '../../../../../../../components/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    paddingTop: theme.spacing.xl,
  },
  accounts: {
    marginBottom: theme.spacing.xl,
  },
  opportunities: {
    marginBottom: theme.spacing.xl,
  },
  collaborations: {
    marginBottom: theme.spacing.xl,
  },
});

export default styles;
