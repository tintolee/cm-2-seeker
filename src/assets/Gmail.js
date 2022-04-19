import React from 'react';
import Svg, {Path, Circle, G} from 'react-native-svg';

function Gmail(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40">
      <G fill="none" fill-rule="evenodd">
        <G>
          <G>
            <G>
              <G
                fill="#DD4C38"
                transform="translate(-168 -668) translate(30 627) translate(138 41)">
                <Circle cx="20" cy="20" r="20" />
              </G>
              <G fill="#FFF" fill-rule="nonzero">
                <Path
                  d="M10.191 20.425c5.881 0 9.788-4.128 9.788-9.955 0-.667-.07-1.182-.166-1.696h-9.62v3.503h5.784c-.237 1.488-1.752 4.393-5.785 4.393-3.474 0-6.311-2.878-6.311-6.436 0-3.56 2.836-6.439 6.311-6.439 1.988 0 3.31.848 4.06 1.571l2.767-2.655C15.238 1.044 12.944.042 10.191.042 4.561.042 0 4.602 0 10.234c0 5.63 4.56 10.19 10.191 10.19z"
                  transform="translate(-168 -668) translate(30 627) translate(138 41) translate(10 10)"
                />
              </G>
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
}

export default Gmail;
