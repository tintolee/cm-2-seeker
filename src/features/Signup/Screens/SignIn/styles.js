import {StyleSheet} from 'react-native';
import {theme} from '../../../../components/Theme';
import {ThemeConsumer} from 'react-native-elements';

const styles = StyleSheet.create({
  backgroundContainer: {
    justifyContent: 'center',
    backgroundColor:'#f7f7f7',
    alignItems: 'center',
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  

  logoImage: {
    height: 120,
    width: 110,
    resizeMode:'contain',
    marginBottom: '7%',
  },

  signInButton: {
    margin: '10%',
  },

  forgotPassword: {
    textAlign:'right',
    marginLeft: '40%',
    top: 10,
    fontSize: 15,
    color: theme.colors.inactiveTintColor,
  },

  dividerView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '-2%',
    top:20
    
  },

  dividerLeft: {
    width: '21%',
    height: '10%',
    backgroundColor: theme.colors.black,
    marginLeft: '2%',
  },

  dividerRight: {
    width: '21%',
    height: '10%',
    backgroundColor: theme.colors.black,
    marginLeft: '2%',
  },
  dividerContent: {
    marginTop: '-2%',
    marginLeft: '3%',
    color: theme.colors.black,
  },
  socials: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '70%',
    marginTop: '10%',
    alignItems: 'center',
  },

  signUp: {
    marginRight:'2%',
    color: theme.colors.black,
  },
});

export default styles;
