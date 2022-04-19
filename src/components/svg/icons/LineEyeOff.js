import React from 'react';
import Svg, {Path} from 'react-native-svg';

function LineEyeOff({width, height, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 42 42">
      <Path
        fill={color}
        fillRule="evenodd"
        d="M38.268 21.87c-.726 1.266-2.434 3.923-5.097 6.352l-2.47-2.47c1.855-1.664 3.198-3.494 3.996-4.744-1.631-2.483-6.572-8.944-14.081-8.753-1.05.026-2.035.19-2.973.439l-2.765-2.765c1.7-.672 3.575-1.12 5.649-1.173 10.456-.327 16.625 9.428 17.741 11.374a1.756 1.756 0 010 1.74zm-13.912 7.437l2.765 2.765a16.364 16.364 0 01-6.078 1.177c-10.26 0-16.21-9.458-17.31-11.378a1.748 1.748 0 01-.001-1.741c.725-1.266 2.433-3.922 5.096-6.353l2.47 2.471c-1.856 1.664-3.196 3.495-3.996 4.744 1.631 2.484 6.549 8.929 14.082 8.754 1.05-.026 2.036-.19 2.972-.44zm-3.357-5.683A2.627 2.627 0 0118.374 21c0-.043.02-.084.021-.13l2.736 2.736c-.046.002-.086.02-.132.02zM8.237 5.762a1.751 1.751 0 00-2.475 0 1.751 1.751 0 000 2.475l9.854 9.854a6.045 6.045 0 00-.742 2.908A6.133 6.133 0 0021 27.124a6.065 6.065 0 002.91-.74l9.853 9.853c.343.343.79.512 1.237.512a1.748 1.748 0 001.237-2.987l-28-28z"></Path>
    </Svg>
  );
}

export default LineEyeOff;
