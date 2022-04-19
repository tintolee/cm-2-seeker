import {StyleSheet} from 'react-native';
import {theme} from '../../../Theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  avatarContainer: {
    height: 42,
    width: 42,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: theme.radius.l,
    backgroundColor: theme.colors.primary,
    borderRadius: 100
  },
  logo: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: theme.radius.l,
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    ...theme.typography.title6,
    fontWeight: '600',
  },
  buttonsContainer: {
    flexDirection: 'row',
    // flex: 1,
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
