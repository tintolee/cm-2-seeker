import {StyleSheet} from 'react-native';
import {theme, width, height} from '../Theme';

const styles = StyleSheet.create({
  container: {
    width: width / 3 - 2,
    height: width / 3 - 2,
    margin: 1,
    backgroundColor: theme.colors.primary,
  },
  image: {
    width: (width / 3 - 2) -6,
    height: (width / 3 - 2)-6,
  },
  content: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.sm,
  },
  absoluteContent:{
    flex: 1,
    position: 'absolute',
    padding: theme.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  title: {
    ...theme.typography.formFieldTitle,
    color: theme.colors.white,
    fontWeight: 'bold',
    lineHeight: 14,
  },
  icon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  layer: {width: "100%", height: "100%", position: 'absolute', backgroundColor: 'rgba(3,3,3,.2)', zIndex: 1, alignItems: 'center', justifyContent: 'center'}
  
});

export default styles;
