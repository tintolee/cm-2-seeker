import {StyleSheet} from 'react-native';
import {theme, width} from '../../Theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.m,
    paddingVertical: theme.spacing.ssm,
    paddingHorizontal:theme.spacing.ml,
    alignItems: 'center',
    justifyContent:'center',
    flexDirection:'row'
  },
  title: {
    ...theme.typography.title6,
    lineHeight: 16,
    fontWeight: '600',
    color: theme.colors.white,
  },
});

export default styles;
