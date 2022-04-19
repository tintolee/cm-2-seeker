import {StyleSheet} from 'react-native';
import {theme} from '../../../components/Theme';

const styles = StyleSheet.create({
  backgroundContainer: {
    backgroundColor: theme.colors.background2,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    fontStyle: 'normal',
    paddingHorizontal: 80,
    textAlign: 'center',
    color: theme.colors.black,
  },

  subtext: {
    color: theme.colors.inactiveTintColor,
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 70,
  },

  bio: {
    color: theme.colors.inactiveTintColor,
    alignContent:'flex-start',
    bottom:'80%',
    left:'5%',
  },

  bodyText:{
    color: theme.colors.inactiveTintColor,
    textAlign: 'left',
    fontStyle: 'italic',
    right:20
  }
});

export default styles;
