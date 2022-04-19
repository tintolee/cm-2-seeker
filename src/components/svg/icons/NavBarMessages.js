import React from 'react';
import Svg, {Path} from 'react-native-svg';

function NavBarMessages({width, height, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 26 26">
      <Path
        fill={color}
        fillRule="evenodd"
        d="M6.273 16.294a.541.541 0 01.425.055 7.042 7.042 0 10-2.463-2.463.541.541 0 01.055.425l-.793 2.776 2.776-.793zm11.796-8.362a8.13 8.13 0 014.745 11.719l.999 3.492a.542.542 0 01-.67.67l-3.492-.998a8.129 8.129 0 01-11.719-4.746 8.097 8.097 0 01-1.582-.67l-3.493.997a.542.542 0 01-.67-.67l.999-3.492a8.125 8.125 0 1114.883-6.302zm.272 1.243a8.125 8.125 0 01-9.166 9.166 7.046 7.046 0 0010.127 3.425.54.54 0 01.426-.056l2.775.793-.793-2.775a.549.549 0 01.056-.426A7.045 7.045 0 0018.34 9.175z"></Path>
    </Svg>
  );
}

export default NavBarMessages;
