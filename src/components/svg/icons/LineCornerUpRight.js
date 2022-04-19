import React from 'react';
import Svg, {Path} from 'react-native-svg';

function LineCornerUpRight({width, height, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24">
      <Path
        fill={color}
        fillRule="evenodd"
        d="M19.781 10.376l-4-5a1 1 0 10-1.562 1.248l2.701 3.377H8c-1.655 0-3 1.345-3 3v5a1.001 1.001 0 002 0v-5a1 1 0 011-1h8.92l-2.7 3.375a.999.999 0 101.561 1.248l4-5a.998.998 0 000-1.248"></Path>
    </Svg>
  );
}

export default LineCornerUpRight;
