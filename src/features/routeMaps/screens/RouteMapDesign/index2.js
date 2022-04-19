import React, { useRef, useEffect, useState } from "react";
// import ImageSource from "../../../../components/Images/RouteMap/index";
// import ArrowRight from "./arrow-right";
// import ArrowLeft from "./arrow-left";
// import ArrowDown from "./arrow-down";
import moment from "moment";
import Svg,{Pattern,Path, Circle, G, Use,Line,Defs} from 'react-native-svg';
import {View, Text, ActivityIndicator} from 'react-native';

export default function index({ tab,posts, postFeedOnPress,toggleAddPostModal }) {
  
  const postsLength = posts.length

  const calculateViewbox = (length) => {
    if (length === 0) {
      return 40;
    } else if (length === 1) {
      return 100;
    } else {
      const dynamicLength = length - 1;
      if (dynamicLength % 3 === 0) {
        return 100 + (dynamicLength / 3) * 160;
      } else if (dynamicLength % 3 === 2) {
        return 100 + ((Math.floor(dynamicLength / 3) + 1) * 160 - 60);
      } else {
        return 100 + ((Math.floor(dynamicLength / 3) + 1) * 160 - 110);
      }
    }
  }
  
  const calculateTransform = (x) => {
    if (x < 5) {
      return 0;
    } else {
      const multiplier = Math.floor((x - 2) / 3);
      return multiplier * 160;
    }
  }

  const staticPath = useRef();
  const pathRefs = useRef({});

  const renderPaths = (length)=>{
    console.log(length)
    let paths = [];

    for (let i = 1; i <= length; i++) {
      if (i === 1) {
        paths.push(
          <Path
            ref={(ref) => (pathRefs.current[i] = ref)}
            className="cls-0"
            d="M50,20H170a30,30,0,0,1,30,30h0a30,30,0,0,1-30,30H157"
            stroke="#fc9a49"
            strokeWidth="3"
          />
        );
      } else if ((i - 1) % 3 === 0) {
        paths.push(
          <Path
            ref={(ref) => (pathRefs.current[i] = ref)}
            className="cls-3"
            d="M108,180h62a30,30,0,0,1,30,30h0a30,30,0,0,1-30,30H157"
            stroke="#fc9a49"
            strokeWidth="3"
            transform={`translate(0 ${calculateTransform(i, length)})`}
          />
        );
      } else if ((i - 1) % 3 === 2) {
        paths.push(
          <Path
            ref={(ref) => (pathRefs.current[i] = ref)}
            className="cls-2"
            d="M60,130v20a30,30,0,0,0,30,30h18"
            stroke="#fc9a49"
            strokeWidth="3"
            transform={`translate(0 ${calculateTransform(i)})`}
          />
        );
      } else {
        paths.push(
          <Path
            ref={(ref) => (pathRefs.current[i] = ref)}
            className="cls-1"
            d="M157,80H90a30,30,0,0,0-30,30v20"
            stroke="#fc9a49"
            strokeWidth="3"
            transform={`translate(0 ${calculateTransform(i)})`}
          />
        );
      }
    }

    return paths
  }

  const renderSteps = (length, pathRefs)=>{

    let sortedPosts = posts?.slice()?.sort(function(a, b) {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
    let list = { steps: [], images: [], uses: [], dates: [] };

    const addStep = (point,i)=>{

      if (sortedPosts?.[i]?.type === "PHOTO") {
        list.steps.push(
          <G x={point?.x} y={point?.y}>
            <Circle
              className="image-circle"
              stroke= {"orange"}
              strokeWidth="2"
              r={15}
              fill={`url(#image${i})`}
              transform={`translate(0 ${calculateTransform(i)})`}
            />
          </G>
        );
      } else if (sortedPosts?.[i]?.type === "VIDEO") {
        list.steps.push(
          <G x={point?.x} y={point?.y}>
            <Circle
              className="image-circle video-circle"
              r={15}
              stroke= {"orange"}
              strokeWidth="2"
              transform={`translate(0 ${calculateTransform(i)})`}
            />
          </G>
        );
      } else if (sortedPosts?.[i]?.blog) {
        list.steps.push(
          <G className="blog-group" x={point?.x} y={point?.y}>
            <Circle
              className="blog-circle"
              r={15}
              stroke= {"orange"}
              strokeWidth="2"
              transform={`translate(0 ${calculateTransform(i)})`}
            />
            <Text
              className="blog-text"
              x={0}
              y={0}
              transform={`translate(0 ${calculateTransform(i)})`}
              dominant-baseline="middle"
              text-anchor="middle"
            >
              {sortedPosts?.[i]?.blog?.blogTitle[0]}
            </Text>
          </G>
        );
      } else if (
        sortedPosts?.[i]?.type === "MILESTONE" &&
        !sortedPosts?.[i]?.photo
      ) {
        list.steps.push(
          <G className="blog-group" x={point?.x} y={point?.y}>
            <Circle
              className="blog-circle milestone"
              r={18}
              stroke= {"orange"}
              strokeWidth="2"
              transform={`translate(0 ${calculateTransform(i)})`}
            />
            <Text
              className="blog-text"
              x={point?.x}
              y={point?.y + 1}
              transform={`translate(0 ${calculateTransform(i)})`}
              dominant-baseline="middle"
              text-anchor="middle"
            >
              {sortedPosts?.[i]?.caption?.[0]}
            </Text>
          </G>
        );
      } else if (
        sortedPosts?.[i]?.type === "MILESTONE" &&
        sortedPosts?.[i]?.photo
      ) {
        list.steps.push(
          <G className="blog-group" x={point?.x} y={point?.y}>
            <Circle
              className="blog-image milestone"
              r={18}
              stroke= {"orange"}
              strokeWidth="2"
              transform={`translate(0 ${calculateTransform(i)})`}
              fill={`url(#image${i})`}
            />
            <Text
              className="blog-text"
              x={point?.x}
              y={point?.y + 1}
              transform={`translate(0 ${calculateTransform(i)})`}
              dominant-baseline="middle"
              text-anchor="middle"
            >
              {sortedPosts?.[i]?.caption?.[0]}
            </Text>
          </G>
        );
      } else if (i === length) {
        if (i === 0 || i === 3) {
          // list.images.push(<ArrowRight />);
        } else if (i === 1) {
          // list.images.push(<ArrowLeft />);
        } else if (i === 2) {
          // list.images.push(<ArrowDown />);
        } else if (i % 3 === 0) {
          // list.images.push(<ArrowRight />);
        } else if (i % 3 === 1) {
          // list.images.push(<ArrowLeft />);
        } else if (i % 3 === 2) {
          // list.images.push(<ArrowDown />);
        }
        list.uses.push(
          <Use
            x={point?.x - 8}
            y={point?.y - 8}
            transform={`translate(0 ${calculateTransform(i)})`}
            xlinkHref="#arrow"
          />
        );
      }


    }


    const addImage = (i) => {
      list?.images.push(
        <Pattern
          id={`image${i}`}
          x="0%"
          y="0%"
          height="1"
          width="1"
          patternContentUnits="objectBoundingBox"
        >
          {/* <ImageSource photo={sortedPosts?.[i]} /> */}
        </Pattern>
      );
    };

    const addDate = (point, i)=>{
      
      const pushDate = (x, y) =>{

        list.dates.push(
          <G
            x={`${point?.x + x}`}
            y={`${point?.y + y}`}
          >
            <Text
              className="date text-muted"
              x={0}
              y={0}
              transform={`translate(0 ${calculateTransform(i)})`}
              dominant-baseline="middle"
              text-anchor="middle"
            >
              {moment(sortedPosts?.[i]?.createdAt).format("DD MMM")}
            </Text>

          </G>
        );
      }

      if (i === 0 || i === 1 || i === 3 || i % 3 === 0 || i % 3 === 1) {
        pushDate(0, 25);
      } else if (i === 2 || i % 3 === 2) {
        pushDate(-35, 0);
      } 
    }

    const staticRoute = staticPath?.current;
    const staticRouteLength = staticRoute?.getTotalLength();
    const firstPoint = staticRoute?.getPointAtLength(staticRouteLength);

    addStep(firstPoint,0)
    addImage(0)
    addDate(firstPoint,0)

    for (let i = 0; i < length; i++) {
      const route = pathRefs?.current[i];
      const routeLength = route?.getTotalLength();
      const point = route?.getPointAtLength(routeLength);
      addStep(point,i)
      if(i !== length){
        addDate(point,i)
      }
      if (sortedPosts?.[i]?.photo) {
        addImage(i)
      }
    }

    return list;

  }

  const [steps, setSteps] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      setSteps(renderSteps(postsLength, pathRefs));
    }, 2000);
  }, []);

  if(steps.length == 0){
    return <ActivityIndicator color = {'red'} />
  }

  return (
    <View style = {{flex: 1, }}>
      <Svg
        id="routemap-svg"
        style={{ width: "100%", height: calculateViewbox(postsLength)*1.5, }}
        // xmlns="http://www.w3.org/2000/svg"
        // viewBox={`0 0 241 ${calculateViewbox(postsLength)}`}
      >
        <G scale = {1.5}>
        {renderPaths(postsLength)}
        <Line 
          ref={staticPath} 
          y1="20" 
          x2="50" 
          y2="20" 
          stroke="#fc9a49"
          strokeWidth="3" 
        />
       <Defs>
          {/* {steps.images?.map((step) => {
            return step;
          })} */}
        </Defs>
        {steps.dates?.map((step) => {
          return step;
        })}
        {steps.steps?.map((step) => {
          return step;
        })}
         {steps.uses?.map((step) => {
          return step;
        })}
        </G>
      </Svg>
    </View>
  );
}