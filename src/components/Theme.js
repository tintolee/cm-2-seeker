import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export {width, height};

export const palette = {
  white: 'white',
  black: 'black',
  green: '#2CB9B0',
  orange: '#f59532',
  orangebg: '#fff1e0',
  yellow: '#FFC641',
  pink: '#FF87A2',
  violet: '#442CB9',
  customViolet: '#160029',
  customViolet2: '#120934',
  lightblue: '#BFEAF5',
  transparent: 'transparent',
  lightGray: '#c2c2c2',
  // lightGray: '#d8d8d8',
  lighterGray: '#f4f4f4',
  red: '#ff2d55',
};

export const theme = {
  colors: {
    primary: palette.orange,
    primaryLight: '#E7F9F7',
    secondary: '#0C0D34',
    danger: '#FF0058',
    info: '#808080',
    text: 'rgba(12, 13, 52, 0.7)',
    black: palette.black,
    white: palette.white,
    background: palette.white,
    background2: palette.lighterGray,
    headerBackground: palette.white,
    inactiveTintColor: palette.lightGray,
    noRouteMap: '#8f9bb3',
    formFieldTitle: '#c1c1c1',
    formFieldPlaceholder: '#c1c1c1',
    formFieldText: palette.black,
    formVisible: '#ff9000',
    formFieldError: palette.red,
    iconNotChecked: '#EDF1F7',
    selectionItem: '#222b45',
    green: '#29a87e',
    selectionBorder: '#EDF1F7',
    inactiveIcon: '#ffd5a4',
    grayIcon: '#cdcdd2',
    ovalIconBackground: '#f7ad64',
    fieldIcon: '#2e2e2e',
    buttonBackground2: palette.lighterGray,
    buttonDisabled: '#cdcdd2',
    buttonUnfollow: palette.lighterGray,
    buttonUnfollowText: '#c5cee0',
  },
  spacing: {
    o: 0,
    xs: 4,
    s: 6,
    ssm: 8,
    sm: 12,
    m: 16,
    ml: 20,
    l: 24,
    xl: 40,
    xxl: 54,
  },
  radius: {
    o: 0,
    s: 4,
    m: 8,
    ml: 12,
    l: 25,
    xl: 75,
  },
  typography: {
    regular: {
      fontSize: 12,
      //   fontFamily: "SFProDisplay"
    },
    titleRouteMap: {
      fontSize: 30,
      lineHeight: 32,
      fontWeight: 'bold',
      //   fontFamily: "SFProDisplay"
    },
    headerTitle: {
      fontSize: 17,
      lineHeight: 16,
      fontWeight: '600',
    },
    title1: {
      //   fontFamily: "SFProDisplay"
    },
    title2: {
      fontSize: 22,
      lineHeight: 24,
      //   fontFamily: "SFProDisplay"
    },
    title3: {
      fontSize: 18,
      lineHeight: 21,
      fontWeight: 'bold',
      //   fontFamily: "SFProDisplay"
    },
    title4: {
      fontSize: 17,
      lineHeight: 21,
      fontWeight: 'bold',
      //   fontFamily: "SFProDisplay"
    },
    title4Semi: {
      fontSize: 17,
      lineHeight: 16,
      //   fontFamily: "SFProDisplay-Semibold"
    },
    title5: {
      //   fontFamily: "SFProDisplay"
    },
    title6: {
      fontSize: 15,
      lineHeight: 20,
      //   fontFamily: "SFProDisplay"
    },
    title7: {
      fontSize: 14,
      //   fontFamily: "SFProDisplay"
    },
    title8: {
      fontSize: 13,
      //   fontFamily: "SFProDisplay"
    },
    formFieldTitle: {
      fontSize: 14,
      //   fontFamily: "Roboto"
    },
    formFieldText: {
      fontSize: 14,
      //   fontFamily: "Roboto"
    },
    caption: {
      fontSize: 13,
      //   fontFamily: "SFProDisplay"
    },
  },
};
