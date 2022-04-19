import {StyleSheet} from 'react-native';
import {theme, width} from '../../../../../../components/Theme';

const styles = StyleSheet.create({
  header: {
    overflow: 'hidden',
    flex: 0,
    backgroundColor:theme.colors.primary
  },
  layer: {
    width: "100%", height: "100%", position: 'absolute', backgroundColor: 'rgba(3,3,3,.2)', zIndex: 1
  },
  image: {
    height: width * 0.6,
    width: width,
  },
  safeArea: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    padding: theme.spacing.m,
    justifyContent: 'space-between',
  },
  destinationHeader: {
    ...theme.typography.title6,
    color: theme.colors.white,
  },
  destinationText: {
    ...theme.typography.titleRouteMap,
    color: theme.colors.white,
  },
  focusAreaText: {
    ...theme.typography.regular,
    lineHeight: 20,
    color: theme.colors.white,
  },
  navigator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
