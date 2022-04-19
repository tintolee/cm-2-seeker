import React from 'react';
import Svg, {Path, Circle, G} from 'react-native-svg';

function Facebook(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40">
      <G fill="none" fill-rule="evenodd">
        <G>
          <G>
            <G transform="translate(-105 -668) translate(30 627) translate(75 41)">
              <Circle cx="20" cy="20" r="20" fill="#3E5C9A" />
              <Path
                fill="#FFF"
                d="M17.095 30h4.027V19.915h2.81l.3-3.377h-3.11v-1.923c0-.796.16-1.11.93-1.11h2.18V10h-2.789c-2.997 0-4.348 1.32-4.348 3.846v2.692H15v3.42h2.095V30z"
              />
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
}

export default Facebook;
