import React from 'react';
import Svg, {Path} from 'react-native-svg';

function FilledPinFill({width, height, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20">
      <Path
        fill={color}
        fillRule="evenodd"
        d="M10 6.667a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5m0 4.166a2.92 2.92 0 01-2.917-2.916A2.92 2.92 0 0110 5a2.92 2.92 0 012.917 2.917A2.92 2.92 0 0110 10.833m0-9.166c-3.676 0-6.667 2.961-6.667 6.602 0 4.562 5.874 9.65 6.124 9.864a.833.833 0 001.086 0c.25-.215 6.124-5.302 6.124-9.864 0-3.64-2.991-6.602-6.667-6.602"></Path>
    </Svg>
  );
}

export default FilledPinFill;
