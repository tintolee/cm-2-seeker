import {StyleSheet} from 'react-native';
import {theme, width} from '../../../../../../components/Theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: theme.spacing.s,
    marginTop: theme.spacing.s,
    marginBottom: 5,
    shadowColor: 'rgba(226, 226, 226, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    backgroundColor: theme.colors.background,
  },
  box: {
    alignItems: 'center',
    marginHorizontal: theme.spacing.m,
  },
  number: {
    ...theme.typography.title3,
  },
  text: {
    fontSize: 10,
    letterSpacing: 0,
    marginTop: 2,
  },
});

export default styles;
