import React from 'react';
import Svg, {Circle} from 'react-native-svg';

function FilledCircle({width, height, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24">
      <Circle cx="12" cy="12" r="10" fill={color} fillRule="evenodd"></Circle>
    </Svg>
  );
}

export default FilledCircle;
