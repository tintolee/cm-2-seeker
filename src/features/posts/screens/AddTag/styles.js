import {StyleSheet} from 'react-native';
import {theme} from '../../../../components/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.m,
  },
  accounts:{
    marginBottom:theme.spacing.xl
  },
  opportunities:{
    marginBottom:theme.spacing.xl
  }
});

export default styles;
