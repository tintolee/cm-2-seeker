import React from 'react';
import Svg, {Path} from 'react-native-svg';

function NavBarNotifications({width, height, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 26 26">
      <Path
        fill={color}
        fillRule="evenodd"
        d="M16.065 20.583a3.25 3.25 0 01-6.13 0H8.209a2.708 2.708 0 01-2.475-3.808l.766-1.723v-3.135c0-2.83 1.81-5.238 4.334-6.13v-.37a2.167 2.167 0 114.333 0v.37a6.501 6.501 0 014.333 6.13v3.135l.766 1.723a2.708 2.708 0 01-2.475 3.808h-1.726zm-1.187 0h-3.755a2.169 2.169 0 003.755 0zm-.794-15.076v-.09a1.084 1.084 0 10-2.167 0v.09c.352-.06.714-.09 1.083-.09.37 0 .731.03 1.084.09zM13 6.5a5.416 5.416 0 00-5.416 5.417v3.25l-.047.22-.813 1.828A1.626 1.626 0 008.209 19.5h9.582a1.626 1.626 0 001.485-2.285l-.812-1.828-.047-.22v-3.25A5.417 5.417 0 0013 6.5z"></Path>
    </Svg>
  );
}

export default NavBarNotifications;
