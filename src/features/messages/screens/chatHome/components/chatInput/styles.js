import {StyleSheet} from 'react-native';
import {theme} from '../../../../../../components/Theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

    alignItems: 'flex-end',
  },
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 10,
    // width: '100%',
    flex: 1,
    // alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    paddingBottom: 5,
    paddingTop: 14,
    paddingHorizontal: 20,
    // paddingVertical: 15,
    // paddingVertical: 2,
    // width: 303,
    height: 44,
    // alignItems: 'center',
    // justifyContent: 'center',
    // textAlign: 'center',
    // marginHorizontal: 10,
    backgroundColor: theme.colors.background2,
    // backgroundColor: 'pink',
    borderRadius: 100,
  },
  icon: {
    marginHorizontal: 5,
    height: 28,
    width: 28,
    // bottom: 10,
  },
  buttonContainer: {
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
