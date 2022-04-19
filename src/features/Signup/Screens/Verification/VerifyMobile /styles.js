import {StyleSheet} from 'react-native';
import {theme} from '../../../../../components/Theme';

const styles = StyleSheet.create({
  backgroundContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  verificationTitle: {
    textAlign: 'center',
    marginBottom: '4%',
    width: 316,
    height: 32,
    fontSize: 30,
    fontWeight: 'bold',
    fontStyle: 'normal',
    color: theme.colors.black,
    bottom: 120,
  },

  subHeading: {
    color: theme.colors.inactiveTintColor,
    textAlign: 'center',
    marginBottom: '2%',
    bottom: 120,
  },

  passwordInput: {
    marginBottom: 200,
    
  },

  resendCode: {
    textAlign: 'right',
    marginLeft: '50%',
    bottom: 190,
    fontSize: 15,
    color: theme.colors.inactiveTintColor,
  },
});

export default styles;