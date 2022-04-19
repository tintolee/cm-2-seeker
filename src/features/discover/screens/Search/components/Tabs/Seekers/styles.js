import {StyleSheet} from 'react-native';
import {theme} from '../../../../../../../components/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  title: {
    ...theme.typography.title4,
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.xl,
  },
});

export default styles;
