import {StyleSheet} from 'react-native';
import {theme} from '../../../Theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
  },
  left: {
    flexDirection: 'row',
  },
  profilePic: {
    marginRight: theme.spacing.s,
    height: 30,
    width: 30,
    borderRadius: theme.radius.l,
  },
  logo: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: theme.radius.l,
  },
  name: {
    ...theme.typography.regular,
    // fontFamily: "SFProDisplay-Bold",
    color: theme.colors.black,
    letterSpacing: 0.4,
    alignSelf: 'center',
  },
});

export default styles;
