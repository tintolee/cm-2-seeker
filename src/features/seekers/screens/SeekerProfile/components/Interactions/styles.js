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
  interactionLeftButton: {
    marginRight: theme.spacing.sm,
  },
  number: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: theme.spacing.s,
  },
  text: {
    fontSize: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  removeButton: {
    marginRight: theme.spacing.s,
  },
  removeButtonText: {
    ...theme.typography.title8,
    lineHeight: 16,
    color: theme.colors.primary,
  },
});

export default styles;
