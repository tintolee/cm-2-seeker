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
  navigator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  attendContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.s,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.ml,
  },
  attendText: {
    ...theme.typography.regular,
    color: theme.colors.white,
  },
  capacityContainer: {
    backgroundColor: theme.colors.white,
    position: 'absolute',
    right: 0,
    bottom: 0,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  capacityText: {
    ...theme.typography.regular,
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 0.41,
  },
  elevation:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }
});

export default styles;
