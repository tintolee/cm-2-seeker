import React from 'react';
import Svg, {Path} from 'react-native-svg';

function ShapePlay({width, height, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 15 16">
      <Path
        fill={color}
        fillRule="nonzero"
        d="M14.002 6.393L3.202.247C2.058-.407.89.307.89 1.594v12.831c0 1.09.71 1.587 1.369 1.587.31 0 .627-.098.94-.29l10.849-6.64c.545-.334.851-.83.842-1.36-.01-.53-.332-1.015-.887-1.329zm-.682 1.504L2.472 14.535a.662.662 0 01-.17.078.763.763 0 01-.02-.188V1.595c0-.132.023-.199.023-.216a.556.556 0 01.211.078l10.798 6.147c.133.076.173.142.185.127-.007.019-.052.086-.18.166z"
        opacity="0.695"></Path>
    </Svg>
  );
}

export default ShapePlay;
