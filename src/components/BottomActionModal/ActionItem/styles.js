import {StyleSheet} from 'react-native';
import {theme} from '../../Theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: theme.spacing.s,
    
  },
  oval: {
    height: 34,
    width: 34,
    backgroundColor: theme.colors.ovalIconBackground,
    borderRadius: 34,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    ...theme.typography.title6,
    marginLeft: theme.spacing.sm,
  },
});

export default styles;
