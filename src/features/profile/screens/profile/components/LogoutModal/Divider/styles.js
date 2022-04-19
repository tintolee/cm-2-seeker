import {StyleSheet} from 'react-native';
import {theme} from '../../../../../../../components/Theme';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  line: {
    height: 1,
    backgroundColor: theme.colors.selectionBorder,
    marginLeft: 58,
    marginRight: -12,
  },
});

export default styles;
