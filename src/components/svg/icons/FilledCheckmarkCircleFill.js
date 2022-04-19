import React from 'react';
import Svg, {Path} from 'react-native-svg';

function FilledCheckmarkCircleFill({width, height, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24">
      <Path
        fill={color}
        fillRule="evenodd"
        d="M16.295 9.605l-4.568 6a1 1 0 01-.789.395h-.007c-.307 0-.597-.142-.787-.383l-2.432-3.108a1 1 0 011.575-1.232l1.633 2.087 3.784-4.97a1.001 1.001 0 011.592 1.211M12 2.001C6.477 2 2 6.477 2 12c0 5.522 4.477 10 10 10s10-4.479 10-10c0-5.523-4.477-10-10-10"></Path>
    </Svg>
  );
}

export default FilledCheckmarkCircleFill;
