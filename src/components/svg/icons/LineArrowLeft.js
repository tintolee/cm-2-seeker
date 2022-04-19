import React from 'react';
import Svg, {Path} from 'react-native-svg';

function LineArrowLeft({width, height, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24">
      <Path
        fill={color}
        fillRule="evenodd"
        d="M19 11H7.135l3.633-4.36a1 1 0 10-1.536-1.28l-5 6c-.039.047-.059.102-.088.154-.024.042-.053.078-.071.124a.985.985 0 00-.072.358L4 12l.001.004c0 .122.027.243.072.358.018.046.047.082.071.124.029.052.049.107.088.154l5 6a.999.999 0 101.536-1.28L7.135 13H19a1 1 0 000-2"></Path>
    </Svg>
  );
}

export default LineArrowLeft;
