import React from 'react';
import Svg, {Path} from 'react-native-svg';

function LineCheckmark({width, height, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24">
      <Path
        fill={color}
        fillRule="evenodd"
        d="M9.863 18a1 1 0 01-.729-.315l-4.863-5.179a1 1 0 111.457-1.369l4.125 4.391 8.408-9.202a1 1 0 011.477 1.348l-9.137 10a.997.997 0 01-.73.326h-.008z"></Path>
    </Svg>
  );
}

export default LineCheckmark;
