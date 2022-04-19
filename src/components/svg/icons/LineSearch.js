import React from 'react';
import Svg, {Path} from 'react-native-svg';

function LineSearch({width, height, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24">
      <Path
        fill={color}
        fillRule="evenodd"
        d="M5 11c0-3.309 2.691-6 6-6s6 2.691 6 6-2.691 6-6 6-6-2.691-6-6m15.707 8.293l-3.395-3.396A7.952 7.952 0 0019 11c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8a7.952 7.952 0 004.897-1.688l3.396 3.395a.997.997 0 001.414 0 .999.999 0 000-1.414"></Path>
    </Svg>
  );
}

export default LineSearch;
