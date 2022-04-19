import {StyleSheet} from 'react-native';
import {theme} from '../../Theme';

const styles = StyleSheet.create({
  title: {
    ...theme.typography.title4,
    marginBottom: theme.spacing.sm,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.selectionBorder,
  },
  itemText: {
    ...theme.typography.title6,
    color: theme.colors.selectionItem,
  },
  icon: {
    marginLeft: theme.spacing.sm,
  },
});

export default styles;
