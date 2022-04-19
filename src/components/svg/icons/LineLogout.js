import React from 'react';
import Svg, {Path} from 'react-native-svg';

function LineLogout({width, height, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20">
      <Path
        fill={color}
        fillRule="evenodd"
        d="M5.833 3.333c.459 0 .834.375.834.834A.836.836 0 015.833 5H5v10h.833c.459 0 .834.375.834.833a.836.836 0 01-.834.834H4.167a.836.836 0 01-.834-.834V4.167c0-.459.375-.834.834-.834zm8.01 2.652a.832.832 0 011.16.202l2.345 3.334a.83.83 0 01-.015.979l-2.5 3.333a.834.834 0 01-1.167.167.833.833 0 01-.166-1.166l1.5-2H8.334a.833.833 0 010-1.668H15c.025 0 .047.013.072.015L13.64 7.146a.834.834 0 01.202-1.161z"></Path>
    </Svg>
  );
}

export default LineLogout;
