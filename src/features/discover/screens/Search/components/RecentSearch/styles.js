import {StyleSheet} from 'react-native';
import {theme, width} from '../../../../../../components/Theme';

const styles = StyleSheet.create({
  title: {
    ...theme.typography.title4,
    marginBottom: theme.spacing.m,
    marginTop: theme.spacing.xl,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.selectionBorder,
  },
  name: {
    ...theme.typography.title6,
    color: theme.colors.selectionItem,
  },
  nameContainer: {
    flex: 1,
  },
});

export default styles;
