import {StyleSheet} from 'react-native';
import {theme} from '../../Theme';

const styles = StyleSheet.create({
  text: {
    ...theme.typography.title6,
    color: theme.colors.formVisible,
    textAlign: 'center',
  },
});

export default styles;
