import {StyleSheet} from 'react-native';
import {theme} from '../../../../../../../components/Theme';

const styles = StyleSheet.create({
  item: {
    flex: 0,
    overflow: 'hidden',
    borderRadius: theme.radius.m,
    marginHorizontal: theme.spacing.m,
    marginTop: theme.spacing.ml,
    backgroundColor: theme.colors.primary,
  },
  image: {
    // height: (width - theme.spacing.m * 2) / 2,
    height: 150,
  },
  layer: {
    width: "100%", height: "100%", position: 'absolute', backgroundColor: 'rgba(3,3,3,.2)', zIndex: 1
  },
  content: {
    flex: 1,
    position: 'absolute',
    padding: theme.spacing.sm,
    justifyContent: 'space-between',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  categoryText: {
    ...theme.typography.title6,
    fontWeight: '500',
    color: theme.colors.white,
  },
  destinationText: {
    ...theme.typography.title4,
    color: theme.colors.white,
  },
  focusAreaText: {
    ...theme.typography.title6,
    color: theme.colors.white,
    marginTop: theme.spacing.s,
  },
  bottomContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  completeCircle: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.xl,
    borderColor: theme.colors.white,
    borderWidth: 5,
    height: 44,
    width: 44,
  },
});

export default styles;
