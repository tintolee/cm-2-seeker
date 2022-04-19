import {StyleSheet} from 'react-native';
import {theme, width} from '../../Theme';

const styles = StyleSheet.create({
  title: {
    ...theme.typography.formFieldTitle,
    color: theme.colors.formFieldTitle,
    marginBottom: 9,
  },
  inputContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: theme.radius.s,
    backgroundColor: theme.colors.white,
    padding: theme.spacing.m,
    shadowColor: 'rgba(0, 0, 0, 0.04)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: theme.radius.l,
    shadowOpacity: 1,
  },
  text: {
    ...theme.typography.formFieldText,
    color: theme.colors.formFieldText,
    flex: 1,
  },
});

export default styles;
