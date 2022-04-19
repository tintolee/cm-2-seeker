import {StyleSheet} from 'react-native';
import {theme} from '../../../../components/Theme';


const styles = StyleSheet.create({
  backgroundContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  
  terms: {
    width: '80%',
    padding: 8,
    fontSize: 15,
    textAlign: 'justify',
    color: theme.colors.inactiveTintColor,
    top:2,
  },

  dividerView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '-2%',
    top:10
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
    marginTop: '7%',
    alignItems: 'center',
  },

  signUp: {
    marginTop:'10%',
    top:10,
    alignItems:'center', 
    color:theme.colors.black
}

});

export default styles;
