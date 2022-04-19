import {StyleSheet} from 'react-native';
import {theme} from '../../../../../../components/Theme';

const styles = StyleSheet.create({
  list: {
    paddingVertical: 10,
    paddingHorizontal: theme.spacing.m,
    backgroundColor: theme.colors.background2,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.m,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 18,
    marginBottom: 10,
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  removeButton: {
    marginRight: theme.spacing.sm,
  },
  removeButtonText: {
    ...theme.typography.title8,
    lineHeight: 16,
    color: theme.colors.primary,
  },
});

export default styles;
