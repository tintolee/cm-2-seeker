import {StyleSheet} from 'react-native';
import {theme, width} from '../../../components/Theme';

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: theme.colors.background,
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backgroundContainer: {
    backgroundColor: '#ededed',
    height: '100%',
  },

  profileName: {
    textAlign: 'center',
    width: '100%',
    height: 22,
    fontSize: 22,

    fontWeight: 'bold',
    fontStyle: 'normal',
    color: theme.colors.black,
  },
  title: {
    ...theme.typography.formFieldTitle,
    color: theme.colors.formFieldTitle,
    marginBottom: 9,
  },

  field: {
    marginBottom: 20,
    marginHorizontal: 30,
    top: 20,
  },

  bodyText: {
    color: theme.colors.inactiveTintColor,
    textAlign: 'left',
    fontStyle: 'normal',
    left: 30,
    marginTop: '1%',
  },
  image: {
    width: 170,
    borderRadius: 200,
    borderColor: '#d9d9d9',
    borderWidth: 2,
    height: 170,
  },

  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
