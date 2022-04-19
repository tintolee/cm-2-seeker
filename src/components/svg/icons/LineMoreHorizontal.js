import React from 'react';
import Svg, {Path} from 'react-native-svg';

function LineMoreHorizontal({width, height, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 25 24">
      <Path
        fill={color}
        fillRule="evenodd"
        d="M12 10a2 2 0 11-.001 4.001A2 2 0 0112 10zm7 0a2 2 0 11-.001 4.001A2 2 0 0119 10zM5 10a2 2 0 11-.001 4.001A2 2 0 015 10z"></Path>
    </Svg>
  );
}

export default LineMoreHorizontal;
