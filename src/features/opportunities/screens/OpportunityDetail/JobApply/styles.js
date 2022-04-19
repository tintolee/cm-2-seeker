import {StyleSheet} from 'react-native';
import {theme} from '../../../../../components/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background2,
  },
  navigator: {
    padding: theme.spacing.m,
  },
  content: {
    paddingHorizontal: 30,
    paddingRight: 80,
    marginTop: theme.spacing.m,
    marginBottom: 27,
  },
  hostedBy: {
    ...theme.typography.regular,
    lineHeight: 20,
    marginBottom: theme.spacing.s,
  },
  title: {
    ...theme.typography.title1,
    fontSize: 30,
    lineHeight: 32,
    fontWeight: 'bold',
    marginBottom: theme.spacing.m,
  },
  caption: {
    ...theme.typography.title6,
    lineHeight: 21,
    color: theme.colors.formFieldTitle,
  },
  inputContainer: {
    flex: 1,
    paddingHorizontal: theme.spacing.m,
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
