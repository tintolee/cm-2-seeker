import {StyleSheet} from 'react-native';
import {theme} from '../../../../components/Theme';
const styles = StyleSheet.create({
    image: {
      width: 65,
      height: 65,
      marginBottom: 5,
    },
    userContainer: {
      alignItems: 'center',
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
      ...theme.typography.title8,
      color: theme.colors.selectionItem,
      textAlign: 'center',
      // fontFamily: "SFProDisplay-Semibold"
    },
  });

  export default styles;