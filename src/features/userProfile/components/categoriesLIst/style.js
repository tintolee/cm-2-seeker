import {StyleSheet} from 'react-native';
import {theme,width} from '../../../../components/Theme';

const styles = StyleSheet.create({
  backgroundContainer: {
    backgroundColor: theme.colors.background2,
  },
  container: {
    height:630,
    backgroundColor: theme.colors.backgroundColor2,
   
  },
  
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    fontStyle: 'normal',
    paddingHorizontal: 80,
    textAlign: 'center',
    marginTop:'7%',
    color: theme.colors.black,
  },

  subtext: {
    color: theme.colors.inactiveTintColor,
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 70,
  },

  typeBox: {
    width: 188,
    height:55,
    marginHorizontal:20,
    borderRadius: theme.radius.m,
    marginVertical:8,
    justifyContent:'space-around',

  },

  svg: {
    position: 'absolute',
    top: 420,
  },
  svg1: {
    position: 'absolute',
    top:29,
    transform: [{rotate: '180deg'}],
  },

  type: {
    height: (width - theme.spacing.xl * 2) / 3.5,
    paddingLeft:60,
    justifyContent: 'center',
  },
  typeText: {
    ...theme.typography.title6,
    color:'black',
    fontWeight:'bold'
  },
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#f7f7f7',
    padding: 18,
    borderRadius: 7,
    width: 188,
    height: 55,
    marginVertical: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    fontSize: 14,
  },
  icon: {
    marginLeft: theme.spacing.sm,
  },

});

export default styles;