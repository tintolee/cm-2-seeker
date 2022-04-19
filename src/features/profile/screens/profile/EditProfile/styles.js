import {StyleSheet} from 'react-native';
import {theme} from '../../../../../components/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background2,
  },
  content: {
    padding: theme.spacing.l,
    paddingBottom: 0,
  },
  field: {
    marginBottom: 20,
  },
  footer: {
    height: theme.spacing.xxl,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.xs,
    shadowColor: 'rgba(179, 179, 179, 0.26)',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowRadius: 10,
    shadowOpacity: 1,
  },

  visibilityContainer: {
    borderRadius: 8,
    backgroundColor: '#fff',
    height: 150,
    padding: theme.spacing.sm,
    paddingVertical: theme.spacing.ssm,
  },
  heading: {
    ...theme.typography.formFieldTitle,
    color: theme.colors.formFieldTitle,
    bottom: 5,
    padding: 10,
  },

  text: {
    ...theme.typography.title6,
    padding: theme.spacing.sm,
  },
});

export default styles;
