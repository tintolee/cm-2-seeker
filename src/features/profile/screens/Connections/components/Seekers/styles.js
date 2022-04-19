import {StyleSheet} from 'react-native';
import {theme} from '../../../../../../components/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.m,
    backgroundColor: theme.colors.background2,
  },
  list: {
    paddingVertical: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.m,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 18,
    marginBottom: 10,
  },
});

export default styles;
