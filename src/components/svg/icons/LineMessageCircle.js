import React from 'react';
import Svg, {Path} from 'react-native-svg';

function LineMessageCircle({width, height, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24">
      <Path
        fill={color}
        fillRule="evenodd"
        d="M12 10a1 1 0 110 2 1 1 0 010-2zm4 0a1 1 0 110 2 1 1 0 010-2zm-8 0a1 1 0 110 2 1 1 0 010-2zm11.9 2.293c-.507 3.254-3.13 5.953-6.38 6.562a8 8 0 01-4.616-.487 3.215 3.215 0 00-1.253-.262c-.19 0-.378.018-.563.055l-2.812.562.563-2.817c.118-.585.046-1.21-.207-1.81a8.01 8.01 0 01-.487-4.617C4.754 6.23 7.452 3.607 10.707 3.1c2.59-.403 5.123.413 6.95 2.241 1.83 1.83 2.647 4.363 2.243 6.952m-.827-8.366c-2.285-2.284-5.445-3.303-8.674-2.804-4.077.636-7.457 3.92-8.22 7.987a10.015 10.015 0 00.61 5.765c.098.231.128.446.09.64l-.858 4.287a.997.997 0 00.274.903.996.996 0 00.903.274l4.283-.857a1.15 1.15 0 01.643.088 10.02 10.02 0 005.765.611c4.068-.763 7.352-4.143 7.988-8.22.502-3.227-.52-6.389-2.804-8.674"></Path>
    </Svg>
  );
}

export default LineMessageCircle;
