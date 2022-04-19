import {StyleSheet} from 'react-native';
import {theme} from '../../../../../../components/Theme';

const styles = StyleSheet.create({
  tabLabel: {
    ...theme.typography.title6,
    lineHeight: 16,
    color: theme.colors.primary,
  },
  tabIndicator: {
    backgroundColor: theme.colors.primary,
  },
});

export default styles;
