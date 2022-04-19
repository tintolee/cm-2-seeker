import {StyleSheet} from 'react-native';
import {theme} from '../../Theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 44,
    padding: 10,
    alignItems: 'center',
  },
  opacityBg: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.m,
    height: 44,
    opacity: 0.15,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  input: {
    ...theme.typography.title6,
    color: theme.colors.primary,
    flex: 1,
    marginLeft: theme.spacing.s,
  },
});

export default styles;
