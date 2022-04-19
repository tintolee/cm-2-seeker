import { StyleSheet } from 'react-native';
import { theme } from '../../../../components/Theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent:'center'
  },
  avatarContainer: {
    
    height: 65,
    width: 65,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 100,
   
  },
  userInfoContainer: {
   // flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    alignContent:'center',
    width: 65,
    marginTop:5
  },
  image: {
    width: 65,
    height: 65,
    marginBottom: 5,
  },
  logo: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 100,
  },
  userContainer: {
    alignItems: 'center',
    justifyContent:'center',
    marginHorizontal: 3,
    width: 75,
   
  },
  status: {
    width: 12,
    height: 12,
    borderWidth: 2,
    borderColor: theme.colors.background,
    borderRadius: 100,
    position: 'absolute',
    bottom: 3,
    right: 3,
  },
  text: {
    ...theme.typography.title7,
    color: theme.colors.selectionItem,
    fontWeight: '600',
    textAlign: 'center',
    width:80,
    overflow:'hidden'

    // fontFamily: "SFProDisplay-Semibold"
  }
});

export default styles;
