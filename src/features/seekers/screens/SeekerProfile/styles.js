import {StyleSheet} from 'react-native';
import {theme} from '../../../../components/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingHorizontal: theme.spacing.xl,
    alignItems: 'center',
    marginTop: theme.spacing.s,
  },
  moreIcon: {
    color: theme.colors.primary,
    marginRight: theme.spacing.m,
  },
  logoContainer: {
    height: 105,
    width: 105,
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  logo: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: theme.radius.xl,
  },
  title: {
    ...theme.typography.title1,
    fontSize: 30,
    lineHeight: 32,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  caption: {
    ...theme.typography.title6,
    lineHeight: 21,
    color: theme.colors.formFieldTitle,
    textAlign: 'center',
    marginBottom: theme.spacing.s,
  },
  interactions: {
    marginTop: theme.spacing.sm,
  },
  contents: {
    backgroundColor: theme.colors.background2,
    flex: 1,
  },
});

export default styles;
