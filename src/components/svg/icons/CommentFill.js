import React from 'react';
import Svg, {Path} from 'react-native-svg';

function CommentFill({width, height, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24">
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 3H5a2 2 0 00-2 2v10a2 2 0 002 2h3l3.646 3.646a.5.5 0 00.708 0L16 17h3a2 2 0 002-2V5a2 2 0 00-2-2z"></Path>
    </Svg>
  );
}

export default CommentFill;
