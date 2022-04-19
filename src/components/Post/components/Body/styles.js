import {StyleSheet} from 'react-native';
import {theme, width, height} from '../../../Theme';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    // height: 400,
    aspectRatio: 4 / 3,
  },
  assetContainer: {
    // aspectRatio: 4 / 3,
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  imageContentContainer: {
    flex: 0,
    overflow: 'hidden',
    backgroundColor: theme.colors.primary,
  },
  absoluteContent: {
    flex: 1,
    position: 'absolute',
    padding: theme.spacing.sm,
    alignItems: 'flex-start',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  blogContainer: {
    aspectRatio: 4 / 3,
    flex: 1,
    backgroundColor: theme.colors.primary,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.l,
    paddingVertical: 35,
  },
  blogTitle: {
    ...theme.typography.title2,
    fontSize: 48,
    lineHeight: 48,
    fontWeight: 'bold',
    color: theme.colors.white,
    marginBottom: theme.spacing.m,
  },
  blogDescription: {
    ...theme.typography.title6,
    lineHeight: 24,
    color: theme.colors.white,
  },
  blogReadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.sm,
  },
  readText: {
    ...theme.typography.title7,
    letterSpacing: 0.57,
  },
  opportunityDetailContainer: {
    backgroundColor: theme.colors.black,
    paddingHorizontal: 14,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  opportunityTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  opportunityTitle: {
    color: theme.colors.white,
    ...theme.typography.title2,
    fontSize: 20,
    lineHeight: 32,
    fontWeight: 'bold',
  },
  opportunityDate: {
    color: theme.colors.white,
    ...theme.typography.regular,
    lineHeight: 20,
  },
  opportunityLocation: {
    color: theme.colors.white,
    ...theme.typography.regular,
    // lineHeight: 20,
  },
  opportunityHosted: {
    color: theme.colors.white,
    ...theme.typography.regular,
    lineHeight: 20,
    marginTop: theme.spacing.ml,
  },
  layer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(3,3,3,.2)',
    zIndex: 1,
  },
  heart: {
    aspectRatio: 4 / 3,
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  bottomContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  attendContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.s,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.ml,
  },
  attendText: {
    ...theme.typography.regular,
    color: theme.colors.white,
  },
});

export default styles;
