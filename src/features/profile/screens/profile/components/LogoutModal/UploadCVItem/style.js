import {StyleSheet} from 'react-native';
import {theme} from '../../../../../../../components/Theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f59532',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: theme.spacing.m,
    paddingHorizontal: theme.spacing.xs,
    borderRadius: 8,
    height: theme.spacing.xxl,
  },
  oval: {
    height: 34,
    width: 34,
    backgroundColor:'#f59532',
    borderRadius: 34,
    padding: 5,
    marginHorizontal: theme.spacing.m,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    ...theme.typography.title6,

    color: '#fff',
  },
});

export default styles;
