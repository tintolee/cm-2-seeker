import {StyleSheet} from 'react-native';
import {theme, width, height} from '../../../../../../components/Theme';

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  content: {
    backgroundColor: theme.colors.background,
    marginHorizontal: 16,
    marginVertical: 20,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.m,
  },
  safeArea: {
    backgroundColor: theme.colors.background2,
  },
  header: {
    backgroundColor: theme.colors.background2,
    shadowColor: '#000000',
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  panelHandle: {
    width: 32,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#d8d8d8',
    marginBottom: 20,
  },
});

export default styles;
