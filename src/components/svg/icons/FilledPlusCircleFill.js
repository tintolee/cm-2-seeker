import React from 'react';
import Svg, {Path} from 'react-native-svg';

function FilledPlusCircleFill({width, height, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 30 30">
      <Path
        fill={color}
        fillRule="evenodd"
        d="M18.75 16.25h-2.5v2.5c0 .688-.563 1.25-1.25 1.25-.688 0-1.25-.563-1.25-1.25v-2.5h-2.5c-.688 0-1.25-.563-1.25-1.25 0-.688.563-1.25 1.25-1.25h2.5v-2.5c0-.688.563-1.25 1.25-1.25.688 0 1.25.563 1.25 1.25v2.5h2.5c.688 0 1.25.563 1.25 1.25 0 .688-.563 1.25-1.25 1.25M15 2.5C8.107 2.5 2.5 8.107 2.5 15c0 6.892 5.607 12.5 12.5 12.5 6.892 0 12.5-5.608 12.5-12.5 0-6.893-5.608-12.5-12.5-12.5"></Path>
    </Svg>
  );
}

export default FilledPlusCircleFill;
