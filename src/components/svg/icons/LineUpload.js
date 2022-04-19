import React from 'react';
import Svg, {Path} from 'react-native-svg';

function LineUpload({width, height, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 25 24">
      <Path
        fill={color}
        fillRule="evenodd"
        d="M11 11.999L8.6 13.8a.998.998 0 01-1.4-.2 1 1 0 01.2-1.4l4-3a1 1 0 011.175-.018l4 2.814a1 1 0 11-1.15 1.636l-2.428-1.71L13 12v8a1 1 0 11-2 0v-8.001zM19 4c.55 0 1 .45 1 1v2c0 .55-.45 1-1 1s-1-.45-1-1V6H6v1c0 .55-.45 1-1 1s-1-.45-1-1V5c0-.55.45-1 1-1h14z"></Path>
    </Svg>
  );
}

export default LineUpload;
