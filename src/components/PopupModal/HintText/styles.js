import {StyleSheet} from 'react-native';
import {theme} from '../../Theme';

const styles = StyleSheet.create({
  hint: {
    ...theme.typography.title6,
    color: theme.colors.formFieldTitle,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default styles;
