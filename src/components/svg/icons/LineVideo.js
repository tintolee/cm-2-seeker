import React from 'react';
import Svg, {Path} from 'react-native-svg';

function LineVideo({width, height, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24">
      <Path
        fill={color}
        fillRule="evenodd"
        d="M20 14.6L17.191 12 20 9.4v5.2zM15 16a1 1 0 01-1 1H5a1 1 0 01-1-1V8c0-.551.448-1 1-1h9c.552 0 1 .449 1 1v8zm6.012-8.854a1.717 1.717 0 00-1.851.306l-2.161 2V8c0-1.654-1.346-3-3-3H5C3.346 5 2 6.346 2 8v8c0 1.655 1.346 3 3 3h9c1.654 0 3-1.345 3-3v-1.451l2.161 1.999c.32.297.735.452 1.158.452.234 0 .469-.047.693-.145.609-.266.988-.835.988-1.484V8.63c0-.65-.379-1.218-.988-1.484z"></Path>
    </Svg>
  );
}

export default LineVideo;
