import React from 'react';
import Svg, {Path} from 'react-native-svg';

function LineFileText({width, height, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24">
      <Path
        fill={color}
        fillRule="evenodd"
        d="M15 16a1 1 0 110 2H9a1 1 0 010-2zm-3-4a1 1 0 010 2H9a1 1 0 010-2zm5.444 8H6.555C6.25 20 6 19.776 6 19.5v-15c0-.276.25-.5.555-.5H12v3.15C12 8.722 13.217 10 14.714 10H18v9.5c0 .276-.249.5-.556.5zM14 4.978L16.742 8h-2.028C14.32 8 14 7.619 14 7.15V4.978zm5.74 3.35l-5.444-6a1 1 0 00-.74-.328h-7C5.145 2 4 3.122 4 4.5v15C4 20.878 5.146 22 6.555 22h10.89C18.852 22 20 20.878 20 19.5V9a1 1 0 00-.26-.672z"></Path>
    </Svg>
  );
}

export default LineFileText;
