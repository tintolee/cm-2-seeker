import React from 'react';
import Svg, {Path, G} from 'react-native-svg';

function EnterIcon({width, height, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 28 28">
      <G fill="none" fillRule="evenodd">
        <Path d="M28 28H0V0h28z"></Path>
        <Path
          fill={color}
          stroke={color}
          d="M17.415 13.802l-6.4-6.69a.292.292 0 10-.42.4l6.203 6.491-6.2 6.489a.29.29 0 00.026.393.29.29 0 00.394.007l6.4-6.69a.291.291 0 00-.003-.4z"></Path>
      </G>
    </Svg>
  );
}

export default EnterIcon;
