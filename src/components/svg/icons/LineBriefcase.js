import React from 'react';
import Svg, {Path} from 'react-native-svg';

function LineBriefcase({width, height, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24">
      <Path
        fill={color}
        fillRule="evenodd"
        d="M10 5.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5V7h-4V5.5zM15 9v10H9V9h6zm4 0c.551 0 1 .449 1 1v8c0 .551-.449 1-1 1h-2V9h2zM7 9v10H5c-.551 0-1-.449-1-1v-8c0-.551.449-1 1-1h2zm12-2h-3V5.5C16 4.122 14.878 3 13.5 3h-3A2.503 2.503 0 008 5.5V7H5c-1.654 0-3 1.346-3 3v8c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-8c0-1.654-1.346-3-3-3z"></Path>
    </Svg>
  );
}

export default LineBriefcase;
