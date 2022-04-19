import {StyleSheet} from 'react-native';
import {theme} from '../../Theme';

const styles = StyleSheet.create({
  message:{
    ...theme.typography.title2,
    color: theme.colors.black,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default styles;
