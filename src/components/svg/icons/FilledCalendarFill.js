import React from 'react';
import Svg, {Path} from 'react-native-svg';

function FilledCalendarFill({width, height, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 18 18">
      <Path
        fill={color}
        fillRule="evenodd"
        d="M14.25 8.25H3.75v-3c0-.413.337-.75.75-.75h.75v.75c0 .412.338.75.75.75s.75-.338.75-.75V4.5h4.5v.75c0 .412.338.75.75.75s.75-.338.75-.75V4.5h.75c.413 0 .75.337.75.75v3zM12 12.75H9c-.412 0-.75-.338-.75-.75s.338-.75.75-.75h3c.412 0 .75.338.75.75s-.338.75-.75.75zm-6 0c-.412 0-.75-.338-.75-.75s.338-.75.75-.75.75.338.75.75-.338.75-.75.75zM13.5 3h-.75v-.75c0-.413-.338-.75-.75-.75s-.75.337-.75.75V3h-4.5v-.75c0-.413-.338-.75-.75-.75s-.75.337-.75.75V3H4.5C3.26 3 2.25 4.01 2.25 5.25v9c0 1.24 1.01 2.25 2.25 2.25h9c1.24 0 2.25-1.01 2.25-2.25v-9C15.75 4.01 14.74 3 13.5 3z"></Path>
    </Svg>
  );
}

export default FilledCalendarFill;
