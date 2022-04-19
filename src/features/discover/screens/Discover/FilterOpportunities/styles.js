import {StyleSheet} from 'react-native';
import {theme} from '../../../../../components/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  navigator: {
    padding: theme.spacing.m,
    paddingRight: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  header: {
    ...theme.typography.title4Semi,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  clear: {
    ...theme.typography.title6,
    lineHeight: 16,
    color: theme.colors.primary,
  },
  selection: {
    flex: 1,
    paddingHorizontal: theme.spacing.m,
    marginVertical: theme.spacing.m,
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
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  select: {
    ...theme.typography.formFieldText,
    color: theme.colors.ovalIconBackground,
  },
  footer: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.sm,
    shadowColor: 'rgba(179, 179, 179, 0.26)',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowRadius: 10,
    shadowOpacity: 1,
  },
});

export default styles;
