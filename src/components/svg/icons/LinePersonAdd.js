import React from 'react';
import Svg, {
  Path,
  Defs,
  Filter,
  FeOffset,
  FeGaussianBlur,
  FeColorMatrix,
  FeMerge,
  FeMergeNode,
  G,
} from 'react-native-svg';

function LinePersonAdd({width, height, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24">
      {/* <Defs>
        <Filter
          id="bjgwbuh3oa"
          width="132.4%"
          height="310%"
          x="-16.2%"
          y="-105%"
          filterUnits="objectBoundingBox">
          <FeOffset
            dy="2"
            in="SourceAlpha"
            result="shadowOffsetOuter1"></FeOffset>
          <FeGaussianBlur
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
            stdDeviation="12.5"></FeGaussianBlur>
          <FeColorMatrix
            in="shadowBlurOuter1"
            result="shadowMatrixOuter1"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0"></FeColorMatrix>
          <FeMerge>
            <FeMergeNode in="shadowMatrixOuter1"></FeMergeNode>
            <FeMergeNode in="SourceGraphic"></FeMergeNode>
          </FeMerge>
        </Filter>
      </Defs> */}
      <G
        fill={color}
        fillRule="evenodd"
        filter="url(#bjgwbuh3oa)"
        transform="translate(-8 -12)">
        <Path d="M18 25c-3.859 0-7 3.14-7 7a1 1 0 102 0c0-2.757 2.243-5 5-5s5 2.243 5 5a1 1 0 102 0c0-3.86-3.141-7-7-7m-2-6c0 1.103.897 2 2 2s2-.897 2-2-.897-2-2-2-2 .897-2 2m-2 0c0-2.206 1.794-4 4-4s4 1.794 4 4-1.794 4-4 4-4-1.794-4-4m16 0c0 .55-.45 1-1 1h-1v1c0 .55-.45 1-1 1s-1-.45-1-1v-1h-1c-.55 0-1-.45-1-1s.45-1 1-1h1v-1c0-.55.45-1 1-1s1 .45 1 1v1h1c.55 0 1 .45 1 1"></Path>
      </G>
    </Svg>
  );
}

export default LinePersonAdd;
