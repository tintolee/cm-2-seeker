import React from 'react';
import Svg, {Path, Circle, G} from 'react-native-svg';

function LinkedIn(props) {
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
                fill="#0077B5"
                transform="translate(-232 -668) translate(30 627) translate(202 41)">
                <Circle cx="20" cy="20" r="20" />
              </G>
              <G fill="#FFF" fill-rule="nonzero">
                <Path
                  d="M19.995 20H20v-7.336c0-3.588-.773-6.352-4.967-6.352-2.017 0-3.37 1.106-3.923 2.155h-.058v-1.82H7.074v13.352h4.142v-6.611c0-1.741.33-3.425 2.486-3.425 2.124 0 2.155 1.987 2.155 3.536V20h4.138zM.33 6.647L4.477 6.647 4.477 20 .33 20zM2.402 0C1.076 0 0 1.076 0 2.402c0 1.325 1.076 2.424 2.402 2.424 1.325 0 2.401-1.098 2.401-2.424C4.803 1.076 3.727 0 2.402 0z"
                  transform="translate(-232 -668) translate(30 627) translate(202 41) translate(10 10)"
                />
              </G>
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
}

export default LinkedIn;
