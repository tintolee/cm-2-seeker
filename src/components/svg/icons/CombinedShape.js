import React from 'react';
import Svg, {Path} from 'react-native-svg';

function CombinedShape({width, height, color}) {
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
        d="M22 2L2 8.667l9.583 3.75M22 2l-6.667 20-3.75-9.583M22 2L11.583 12.417"></Path>
    </Svg>
  );
}

export default CombinedShape;
