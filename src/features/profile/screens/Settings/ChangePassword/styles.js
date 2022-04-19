import {StyleSheet} from 'react-native';
import {theme} from '../../../../../components/Theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: '30%',
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  inputContainer: {
    marginBottom: theme.spacing.xl,
    alignItems: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl * 2,
  },
  title: {
    marginBottom: '5%',
    height: 38,
    fontSize: 30,
    fontWeight: 'bold',
    fontStyle: 'normal',
    color: theme.colors.black,
  },
  subHeading: {
    color: theme.colors.inactiveTintColor,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default styles;
