import {StyleSheet} from 'react-native';
import {theme} from '../../../../../../components/Theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background2,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.m,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemContainer: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 6,
    borderWidth: 1,
    marginRight: 7,
  },
  itemName: {
    ...theme.typography.title6,
    letterSpacing: 0,
    color: '#262626',
  },
});

export default styles;
