import React from 'react';
import Svg, {Path} from 'react-native-svg';

function LineEdit({width, height, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24">
      <Path
        fill={color}
        fillRule="evenodd"
        d="M16.019 10.679l-2.695-2.695 1.948-1.95 2.694 2.695-1.947 1.95zm-6.94 6.946l-2.976.27.264-2.955 5.617-5.617 2.696 2.696-5.6 5.606zM19.405 7.338l-.001-.001-2.738-2.738c-.741-.74-2.014-.774-2.716-.07l-8.996 8.997a1.973 1.973 0 00-.57 1.214l-.38 4.17a1 1 0 001.087 1.086l4.17-.38c.459-.041.89-.242 1.215-.567l8.997-8.997c.728-.73.697-1.948-.068-2.714z"></Path>
    </Svg>
  );
}

export default LineEdit;
