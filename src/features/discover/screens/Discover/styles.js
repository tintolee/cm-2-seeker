import {StyleSheet} from 'react-native';
import {theme} from '../../../../components/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  buttonGPlusStyle: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

export default styles;
