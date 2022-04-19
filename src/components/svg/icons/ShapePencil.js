import React from 'react';
import Svg, {Path} from 'react-native-svg';

function ShapePencil({width, height, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 14 14">
      <Path
        fill={color}
        fillRule="nonzero"
        d="M.465 13.228L.88 10.99l1.822 1.822-2.236.415zm3.144-.758l-2.386-2.387 8.711-8.71 2.386 2.385-8.71 8.712zm9.873-9.874l-.536.536L10.56.746l.536-.536a.72.72 0 011.017 0l1.369 1.37a.72.72 0 010 1.016z"
        opacity="0.695"></Path>
    </Svg>
  );
}

export default ShapePencil;
