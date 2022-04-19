import React from 'react';
import Svg, {
  Rect,
  Defs,
  Stop,
  Filter,
  G,
  LinearGradient,
  FeOffset,
  FeGaussianBlur,
  FeColorMatrix,
  FeMerge,
  FeMergeNode,
} from 'react-native-svg';

function GradientPlus({width, height, color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="116"
      height="110"
      viewBox="0 0 116 110">
      <Defs>
        <LinearGradient
          id="wnvwnjovsb"
          x1="100%"
          x2="0%"
          y1="24.231%"
          y2="89.127%">
          <Stop offset="0%" stopColor="#F79433"></Stop>
          <Stop offset="100%" stopColor="#E26424"></Stop>
        </LinearGradient>
        <Filter
          id="myvznlvkra"
          width="265.4%"
          height="287%"
          x="-82.7%"
          y="-93.5%"
          filterUnits="objectBoundingBox">
          <FeOffset
            dy="2"
            in="SourceAlpha"
            result="shadowOffsetOuter1"></FeOffset>
          <FeGaussianBlur
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
            stdDeviation="10"></FeGaussianBlur>
          <FeColorMatrix
            in="shadowBlurOuter1"
            result="shadowMatrixOuter1"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"></FeColorMatrix>
          <FeMerge>
            <FeMergeNode in="shadowMatrixOuter1"></FeMergeNode>
            <FeMergeNode in="SourceGraphic"></FeMergeNode>
          </FeMerge>
        </Filter>
      </Defs>
      <G
        fill="none"
        fillRule="evenodd"
        filter="url(#myvznlvkra)"
        transform="translate(32 32)">
        <Rect width="52" height="46" fill="url(#wnvwnjovsb)" rx="14.583"></Rect>
        <Rect width="20" height="2" x="16" y="22" fill="#FFF" rx="1"></Rect>
        <Rect
          width="20"
          height="2"
          x="16"
          y="22"
          fill="#FFF"
          rx="1"
          transform="rotate(90 26 23)"></Rect>
      </G>
    </Svg>
  );
}

export default GradientPlus;
