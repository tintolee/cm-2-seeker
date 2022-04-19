import React from 'react';
import Svg, {Path} from 'react-native-svg';

function LineAlertCircle({width, height, color}) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
      <Path
        fill={color}
        fillRule="evenodd"
        d="M12 15a1 1 0 110 2 1 1 0 010-2zm0-8a1 1 0 011 1v5a1 1 0 01-2 0V8a1 1 0 011-1zm0 13c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m0-18C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2"></Path>
    </Svg>
  );
}

export default LineAlertCircle;
