import React from 'react';
import Svg, {Path} from 'react-native-svg';

function LineCopy({width, height, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24">
      <Path
        fill={color}
        fillRule="evenodd"
        d="M12 11c-.551 0-1 .449-1 1v6c0 .551.449 1 1 1h6c.552 0 1-.449 1-1v-6c0-.551-.448-1-1-1h-6zm.333-8A2.67 2.67 0 0115 5.667V9h3c1.654 0 3 1.346 3 3v6c0 1.654-1.346 3-3 3h-6c-1.654 0-3-1.346-3-3v-3H5.667A2.67 2.67 0 013 12.333V5.667A2.67 2.67 0 015.667 3h6.666zm0 2H5.667A.667.667 0 005 5.667v6.666c0 .368.299.667.667.667H9v-1c0-1.654 1.346-3 3-3h1V5.667A.667.667 0 0012.333 5z"></Path>
    </Svg>
  );
}

export default LineCopy;
