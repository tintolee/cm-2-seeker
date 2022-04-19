import {StyleSheet} from 'react-native';
import {theme} from '../../../Theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.selectionBorder,
  },
  left: {
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: theme.spacing.m,
  },
  logoContainer: {
    height: 42,
    width: 42,
    borderRadius: theme.radius.l,
    backgroundColor: theme.colors.primary,
  },
  logo: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: theme.radius.l,
    
  },
  nameContainer: {
    flex: 1,
  },
  buttonContainer: {
    // width: 100,
  },
  displayName: {
    ...theme.typography.title6,
    fontWeight: '600',
  },
  name: {
    ...theme.typography.caption,
    lineHeight: 16,
    color: theme.colors.noRouteMap,
  },
});

export default styles;
