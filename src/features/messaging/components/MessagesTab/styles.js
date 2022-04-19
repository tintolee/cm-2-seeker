import {StyleSheet} from 'react-native';
import {theme} from '../../../../components/Theme';

const styles = StyleSheet.create({
  tabLabel: {
    ...theme.typography.title6,
    lineHeight: 16,
    color: theme.colors.primary,
  },
  tabIndicator: {
    backgroundColor: theme.colors.primary,
  },
  tabViewContainer: { 
    top: 25,
    
   // position:'absolute',
    height:400,
    marginBottom:70
},
});

export default styles;
