import {StyleSheet} from 'react-native';
import {theme} from '../../../../../../components/Theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.m,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: 18,
    paddingRight: 10,
    marginBottom: 10,
  },
  icon: {
    height: 34,
    width: 34,
    borderRadius: theme.radius.l,
    backgroundColor: '#fde9d8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: theme.spacing.m,
  },
  message: {
    ...theme.typography.title6,
    flex: 1,
  },
  date: {
    ...theme.typography.regular,
    fontSize: 10,
    lineHeight: 16,
    marginLeft: theme.spacing.sm,
  },
});

export default styles;
