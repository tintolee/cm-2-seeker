import {StyleSheet} from 'react-native';
import {theme} from '../../../../../../components/Theme';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingVertical: theme.spacing.s,
  },
  interactions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  interaction: {
    alignItems: 'center',
    marginHorizontal: theme.spacing.m,
  },
  number: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: theme.spacing.s,
  },
  text: {
    fontSize: 10,
  },
});

export default styles;
