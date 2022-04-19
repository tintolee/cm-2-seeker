import React from 'react';
import Svg, {Path} from 'react-native-svg';

function HeartFill({width, height, color, fill = "transparent"}) {
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
        fill= {fill}
        d="M11.445 20.76l-7.869-8.194C1.36 10.258 1.5 6.474 3.88 4.35c2.361-2.107 5.941-1.698 7.807.893l.314.435.314-.435c1.866-2.591 5.446-3 7.807-.893 2.38 2.125 2.52 5.91.303 8.217l-7.87 8.195a.763.763 0 01-1.109 0z"></Path>
    </Svg>
  );
}

export default HeartFill;
