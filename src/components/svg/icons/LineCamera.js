import React from 'react';
import Svg, {Path} from 'react-native-svg';

function LineCamera({width, height, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24">
      <Path
        fill={color}
        fillRule="evenodd"
        d="M12 15.5c-.827 0-1.5-.673-1.5-1.5s.673-1.5 1.5-1.5 1.5.673 1.5 1.5-.673 1.5-1.5 1.5m0-5c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5m8 7.5c0 .551-.448 1-1 1H5c-.552 0-1-.449-1-1v-8c0-.551.448-1 1-1h14c.552 0 1 .449 1 1v8zM10 5.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5V7h-4V5.5zM19 7h-3V5.5C16 4.122 14.879 3 13.5 3h-3A2.503 2.503 0 008 5.5V7H5c-1.654 0-3 1.346-3 3v8c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-8c0-1.654-1.346-3-3-3z"></Path>
    </Svg>
  );
}

export default LineCamera;
