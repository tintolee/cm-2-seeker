import {StyleSheet} from 'react-native';
import {theme} from '../../Theme';

const styles = StyleSheet.create({
  title: {
    ...theme.typography.title4Semi,
    color: theme.colors.formFieldTitle,
    fontWeight: '600',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export default styles;
