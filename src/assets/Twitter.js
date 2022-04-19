import React from 'react';
import Svg, {Path, Circle, G} from 'react-native-svg';

function Twitter(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 40 40"
      {...props}>
      <G fill="none" fillRule="evenodd">
        <Circle cx="20" cy="20" r="20" fill="#29A9E1"></Circle>
        <Path
          fill="#FFF"
          d="M11 26.298A10.714 10.714 0 0016.805 28c7.03 0 11.002-5.938 10.763-11.265a7.675 7.675 0 001.89-1.96c-.68.3-1.41.505-2.175.596a3.794 3.794 0 001.665-2.095 7.597 7.597 0 01-2.405.92A3.777 3.777 0 0023.779 13c-2.444 0-4.24 2.28-3.689 4.65a10.75 10.75 0 01-7.805-3.957 3.79 3.79 0 001.172 5.055 3.775 3.775 0 01-1.716-.473c-.04 1.755 1.217 3.395 3.038 3.761a3.8 3.8 0 01-1.71.065 3.79 3.79 0 003.537 2.63A7.606 7.606 0 0111 26.298"></Path>
      </G>
    </Svg>
  );
}

export default Twitter;
