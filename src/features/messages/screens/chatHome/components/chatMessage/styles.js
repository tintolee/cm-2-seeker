import {StyleSheet} from 'react-native';
import {theme} from '../../../../../../components/Theme';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  messageBox: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  name: {},
  message: {
    color: theme.colors.grey,
  },
  time: {
    alignSelf: 'flex-end',
    color: theme.colors.grey,
  },
});

export default styles;
