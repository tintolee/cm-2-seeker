import {StyleSheet} from 'react-native';
import {theme, width} from '../../Theme';

const styles = StyleSheet.create({
  caption: {
    ...theme.typography.regular,
    color: theme.colors.formFieldTitle,
  },
  inputContainer: {
    height: (width - theme.spacing.m) * 0.6,
    flexDirection: 'column',
    alignContent: 'space-between',
    borderRadius: theme.radius.m,
    backgroundColor: theme.colors.white,
    padding: theme.spacing.m,
  },
  input: {
    ...theme.typography.title6,
    color: theme.colors.selectionItem,
    letterSpacing: 0,
    marginTop: 10,
    flex: 1,
  },
  top: {
    flex: 1,
  },
  bottom: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  error: {
    ...theme.typography.regular,
    lineHeight: 16,
    color: theme.colors.formFieldError,
    marginTop: theme.spacing.s,
  },
});

export default styles;
