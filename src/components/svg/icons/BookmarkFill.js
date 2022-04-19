import React from 'react';
import Svg, {Path} from 'react-native-svg';

function BookmarkFill({width, height, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24">
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 22V3a1 1 0 011-1h12a1 1 0 011 1v19l-7-6.111L5 22z"></Path>
    </Svg>
  );
}

export default BookmarkFill;
