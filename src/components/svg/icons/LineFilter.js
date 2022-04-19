import React from 'react';
import Svg, {Path} from 'react-native-svg';

function LineFilter({width, height, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24">
      <Path
        fill={color}
        fillRule="evenodd"
        d="M15.895 16c.522 0 .95.427.95.949v.102a.953.953 0 01-.95.949H8.948A.95.95 0 018 17.051v-.102A.95.95 0 018.948 16zm2.194-5c.522 0 .949.427.949.949v.102a.952.952 0 01-.95.949H5.949A.951.951 0 015 12.051v-.102A.95.95 0 015.948 11zm1.962-5c.522 0 .949.427.949.949v.102a.952.952 0 01-.949.949H3.948A.95.95 0 013 7.051v-.102A.95.95 0 013.948 6z"></Path>
    </Svg>
  );
}

export default LineFilter;
