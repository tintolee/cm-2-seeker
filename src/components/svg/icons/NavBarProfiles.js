import React from 'react';
import Svg, {Path} from 'react-native-svg';

function NavBarProfiles({width, height, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 26 26"
    >
      <Path
        fill={color}
        fillRule="evenodd"
        d="M16.334 14.019l3.745 1.702a2.707 2.707 0 011.587 2.465v.772a2.707 2.707 0 01-2.708 2.708H7.041a2.708 2.708 0 01-2.708-2.708v-.772c0-1.062.62-2.026 1.588-2.465l3.744-1.702a5.418 5.418 0 116.669 0zm-5.543.678l-4.422 2.01c-.58.264-.953.842-.953 1.48v.771c0 .897.728 1.625 1.625 1.625h11.917c.897 0 1.625-.728 1.625-1.625v-.772c0-.637-.372-1.215-.953-1.479l-4.422-2.01a5.389 5.389 0 01-2.208.47 5.393 5.393 0 01-2.209-.47zM13 14.083a4.333 4.333 0 100-8.666 4.333 4.333 0 000 8.666z"
      ></Path>
    </Svg>
  );
}

export default NavBarProfiles;
