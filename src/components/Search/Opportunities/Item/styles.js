import {StyleSheet} from 'react-native';
import {theme, width} from '../../../Theme';

const styles = StyleSheet.create({
  container: {
    flex: 0,
    overflow: 'hidden',
    borderRadius: theme.radius.m,
    marginBottom: theme.spacing.m,
    marginTop: 19,
  },
  content: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    flexDirection: 'column-reverse',
  },
  title: {
    ...theme.typography.title6,
    fontWeight: '600',
    lineHeight: 14,
    color: theme.colors.white,
    width: '70%',
  },
  caption: {
    ...theme.typography.regular,
    fontWeight: '300',
    lineHeight: 16,
    color: theme.colors.white,
  },
  logoContainer: {
    position: 'absolute',
    left: theme.spacing.m,
    // top: -19,
    height: 38,
    width: 38,
    borderRadius: theme.radius.l,
    backgroundColor: theme.colors.primary,
    zIndex: 1,
  },
  logo: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: theme.radius.l,
  },
  image: {
    height: (width - theme.spacing.m * 2) * 0.2,
    backgroundColor: theme.colors.primary,
  },
});

export default styles;
