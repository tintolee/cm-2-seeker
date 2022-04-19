import {StyleSheet} from 'react-native';
import {theme} from '../../../../../../components/Theme';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',

    backgroundColor: theme.colors.white,
  },
  image: {
    backgroundColor: '#ffffff',
    padding: 5,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#f59532',
  },
  username: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#606060',
  },
});

export default styles;
